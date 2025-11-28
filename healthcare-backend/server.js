const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Simple haversine distance
function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
}

// GET /api/hospitals?lat=..&lon=..&radius=meters
app.get('/api/hospitals', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  const radius = parseInt(req.query.radius || '5000', 10); // meters default 5km

  if (!(lat && lon)) {
    return res.status(400).json({ error: 'lat and lon required' });
  }

  // Overpass QL: nodes/ways/relations with amenity=hospital
  const query = `[out:json][timeout:25];(node["amenity"="hospital"](around:${radius},${lat},${lon});way["amenity"="hospital"](around:${radius},${lat},${lon});relation["amenity"="hospital"](around:${radius},${lat},${lon}););out center;`;

  try {
    const resp = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: query
    });
    if (!resp.ok) {
      return res.status(502).json({ error: 'Overpass API error' });
    }
    const data = await resp.json();
    const elements = (data && data.elements) || [];

    const hospitals = elements.map(el => {
      const name = (el.tags && (el.tags.name || el.tags['official_name'])) || 'Unknown Hospital';
      let hlat = el.lat, hlon = el.lon;
      if (!hlat && el.center) { hlat = el.center.lat; hlon = el.center.lon; }
      const dist = (hlat && hlon) ? Math.round(distanceMeters(lat, lon, hlat, hlon)) : null;
      return {
        id: el.id,
        name,
        lat: hlat,
        lon: hlon,
        distance_m: dist,
        tags: el.tags || {}
      };
    }).filter(h => h.lat && h.lon);

    // sort by distance and limit
    hospitals.sort((a,b) => a.distance_m - b.distance_m);
    const limited = hospitals.slice(0, 50);
    return res.json({ count: limited.length, hospitals: limited });
  } catch (err) {
    console.error('Overpass error', err);
    return res.status(500).json({ error: 'server error', detail: String(err) });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`healthcare-backend listening on ${PORT}`));
