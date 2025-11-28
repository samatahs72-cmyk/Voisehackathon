# Healthcare Backend (Overpass hospitals)

This small Express server provides a single endpoint to query nearby hospitals using OpenStreetMap/Overpass API.

APIs
- GET /api/hospitals?lat=<lat>&lon=<lon>&radius=<meters>
  Returns JSON: { count, hospitals: [ {id, name, lat, lon, distance_m, tags} ] }

Run
```powershell
cd healthcare-backend
npm install
npm run dev   # needs nodemon
```

Notes
- Overpass API is public but rate-limited. For production, use your own Overpass instance or cache results.
