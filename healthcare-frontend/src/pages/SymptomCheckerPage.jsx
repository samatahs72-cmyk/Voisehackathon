import React, { useState, useEffect } from 'react';
import useLocation from '../hooks/useLocation';
// Use relative path; Vite dev server proxies /api -> backend

/* SymptomCheckerPage.jsx
   Single-file React + Tailwind component with dummy logic and UI.
   - Paste to src/pages/SymptomCheckerPage.jsx
   - Requires Tailwind CSS available in the app (or open the static preview).
*/

/* Small inline SVG icons so this component runs without extra icon packages */
const Icon = {
  Check: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4.293 10.879a1 1 0 011.414-1.414L8.414 12.172l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  Warning: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M8.257 3.099c.765-1.36 2.68-1.36 3.444 0l6.518 11.586c.75 1.334-.213 2.98-1.722 2.98H3.461c-1.51 0-2.472-1.646-1.722-2.98L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-9a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z" />
    </svg>
  ),
  Hospital: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 13.5V21h7v-6h4v6h7v-7.5L12 6 3 13.5zM13 10h-2V8h2v2z" />
    </svg>
  ),
  Doctor: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12a3 3 0 100-6 3 3 0 000 6zM3 20a7 7 0 0118 0H3z" />
    </svg>
  ),
  Ambulance: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 13h1v4h1a2 2 0 104 0h6a2 2 0 104 0h1v-6l-3-4H12V3H7v6H3v4zm5-1V5h4v7H8z" />
    </svg>
  ),
  Clock: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 2a8 8 0 110 16 8 8 0 010-16zm.75 4.25a.75.75 0 10-1.5 0V10c0 .207.083.395.219.531l2.5 2.5a.75.75 0 101.06-1.06L10.75 9V6.25z" />
    </svg>
  )
};

/* Helper: generate dummy prediction from symptoms text */
function generatePrediction({ age, gender, symptoms, frequency }) {
  // naive mapping for dummy logic
  const text = (symptoms || '').toLowerCase();
  let condition = 'General Viral Infection';
  let severityScore = 1; // 0-3 mapping to Low, Moderate, High, Critical

  if (text.includes('chest') || text.includes('heart') || text.includes('palpit')) {
    condition = 'Possible Cardiac Issue';
    severityScore = 2;
  } else if (text.includes('breath') || text.includes('shortness') || text.includes('difficulty')) {
    condition = 'Respiratory Distress';
    severityScore = 3;
  } else if (text.includes('fever') && text.includes('rash')) {
    condition = 'Systemic Infection';
    severityScore = 2;
  } else if (text.includes('headache') && text.includes('blur')) {
    condition = 'Neurological Concern';
    severityScore = 2;
  } else if (text.includes('fever')) {
    condition = 'Acute Fever (Likely Viral)';
    severityScore = frequency === 'Daily' ? 1 : 0;
  } else {
    // base on age to increase severity
    severityScore = age && age > 65 ? 1 : 0;
  }

  // tweak severity if frequency high
  if (frequency === 'Daily') severityScore = Math.max(severityScore, 2);
  if (frequency === 'Frequently' && severityScore < 2) severityScore = severityScore + 1;

  // clamp
  severityScore = Math.min(3, Math.max(0, severityScore));

  const severityLabel = ['Low', 'Moderate', 'High', 'Critical'][severityScore];

  const emergency = severityLabel === 'Critical' ? 'Immediate ambulance recommended' : (severityLabel === 'High' ? 'Visit hospital soon' : 'Manage at home with self-care');

  const homeRemedies = {
    Low: ['Rest', 'Hydration', 'OTC pain relief as needed', 'Monitor symptoms'],
    Moderate: ['Rest', 'Stay hydrated', 'Book a teleconsult', 'Avoid strenuous activity'],
    High: ['Seek hospital care', 'Avoid driving if symptomatic', 'Call ahead to hospital'],
    Critical: ['Call emergency services immediately', 'If bleeding/unconscious, start first aid and call ambulance']
  }[severityLabel];

  return {
    condition,
    severity: severityLabel,
    emergency,
    homeRemedies
  };
}

/* NOTE: Hospitals will be fetched from backend /api/hospitals using OpenStreetMap Overpass. */

function doctorsForCondition(condition) {
  // map condition -> specializations
  const lower = condition.toLowerCase();
  if (lower.includes('cardiac') || lower.includes('heart')) {
    return [
      { name: 'Dr. Maya Singh', spec: 'Cardiologist' },
      { name: 'Dr. Arun Patel', spec: 'Interventional Cardiologist' },
      { name: 'Dr. Lisa Chen', spec: 'Cardiac Surgeon' }
    ];
  }
  if (lower.includes('respir') || lower.includes('breath')) {
    return [
      { name: 'Dr. Omar Rahman', spec: 'Pulmonologist' },
      { name: 'Dr. Nina Gomez', spec: 'Respiratory Physician' }
    ];
  }
  if (lower.includes('neurolog') || lower.includes('headache')) {
    return [
      { name: 'Dr. Sara Lee', spec: 'Neurologist' },
      { name: 'Dr. Juan Martinez', spec: 'Neurophysician' }
    ];
  }
  // default general
  return [
    { name: 'Dr. John Doe', spec: 'General Physician' },
    { name: 'Dr. Priya Rao', spec: 'Internal Medicine' },
    { name: 'Dr. Neil Foster', spec: 'Emergency Medicine' }
  ];
}

/* Small presentational subcomponents */
function Badge({ children, color = 'bg-blue-100 text-blue-800' }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>{children}</span>;
}

/* Main component */
export default function SymptomCheckerPage() {
  // form state
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('Male');
  const [symptoms, setSymptoms] = useState('');
  const [frequency, setFrequency] = useState('Sometimes');

  // outcome
  const [prediction, setPrediction] = useState(null);
  const [analysedAt, setAnalysedAt] = useState(null);

  // hospitals
  const [distanceKm, setDistanceKm] = useState(5);
  const [availableHospitals, setAvailableHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedHospitalDoctors, setSelectedHospitalDoctors] = useState([]);
  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const { lat, lng, loading: locLoading, error: locError, request: requestLocation } = useLocation();
  const [hospitalsLoading, setHospitalsLoading] = useState(false);
  const [hospitalsError, setHospitalsError] = useState(null);

  // doctor selection
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorNotifyMessage, setDoctorNotifyMessage] = useState(null);

  // family vehicle toggle
  const [familyVehicleAvailable, setFamilyVehicleAvailable] = useState(true);

  // ambulance called state
  const [ambulanceCalled, setAmbulanceCalled] = useState(false);

  // handle analyse
  function handleAnalyse(e) {
    e && e.preventDefault();
    const pred = generatePrediction({ age, gender, symptoms, frequency });
    setPrediction(pred);
    setAnalysedAt(new Date());
    // fetch nearby hospitals (if location available)
    if (lat && lng) {
      fetchHospitals(lat, lng, distanceKm).catch(() => {});
    } else {
      setAvailableHospitals([]);
    }
    // clear selections
    setSelectedHospital(null);
    setSelectedHospitalDoctors([]);
    setSelectedDoctor(null);
    setDoctorNotifyMessage(null);
    setHospitalModalOpen(false);
    setAmbulanceCalled(false);
  }

  // when distance changes, update hospitals
  function handleDistanceChange(km) {
    setDistanceKm(km);
    // if we have a prediction and location, refetch hospitals for new radius
    if (prediction && lat && lng) {
      fetchHospitals(lat, lng, km).catch(() => {});
    } else {
      setAvailableHospitals([]);
    }
    setSelectedHospital(null);
    setSelectedHospitalDoctors([]);
    setSelectedDoctor(null);
    setDoctorNotifyMessage(null);
  }

  async function fetchHospitals(lat, lon, km) {
    try {
      setHospitalsLoading(true);
      setHospitalsError(null);
      const radius = Math.round(km * 1000);
      const res = await fetch(`/api/hospitals?lat=${lat}&lon=${lon}&radius=${radius}`);
      if (!res.ok) throw new Error('Failed to fetch hospitals');
      const body = await res.json();
      const mapped = (body.hospitals || []).map(h => ({
        id: h.id,
        name: h.name,
        lat: h.lat,
        lon: h.lon,
        distance_m: h.distance_m,
        distance: (h.distance_m / 1000).toFixed(1)
      }));
      setAvailableHospitals(mapped);
      setHospitalsLoading(false);
      return mapped;
    } catch (err) {
      setHospitalsLoading(false);
      setHospitalsError(err.message || 'Error fetching hospitals');
      setAvailableHospitals([]);
      throw err;
    }
  }

  // open hospital (expand)
  function openHospital(hospital) {
    setSelectedHospital(hospital);
    const docs = doctorsForCondition(prediction?.condition || '');
    // enrich doctor info with dummy queue/availability/appointments
    const enriched = docs.map((d, i) => {
      const queue = Math.floor(2 + Math.random() * 20); // 2..21
      const appointments = Math.floor(Math.random() * 12);
      const available = Math.random() > 0.4; // 60% chance available
      const estTimeMin = queue * 5 + Math.floor(Math.random() * 10);
      return {
        ...d,
        id: `${hospital.id}-doc-${i}`,
        queue,
        appointments,
        available,
        estTimeMin
      };
    });
    setSelectedHospitalDoctors(enriched);
    setHospitalModalOpen(true);
    setSelectedDoctor(null);
    setDoctorNotifyMessage(null);
  }

  // choose a doctor
  function chooseDoctor(doctor) {
    setSelectedDoctor(doctor);
    // simulate notification messages
    setDoctorNotifyMessage({
      status: 'notified',
      messages: [
        'Hospital has been notified about patient arrival.',
        'Doctor will review and send confirmation.'
      ],
      doctorResponse: null // will be set after "processing"
    });

    // simulate doctor response after short timeout (dummy)
    setTimeout(() => {
      let response = '✔ “You can come now”';
      if (prediction?.severity === 'Critical') {
        response = '✔ “Please take an ambulance – emergency case”';
      } else if (doctor.queue > 15) {
        response = '✔ “We are preparing emergency admission”';
      }
      setDoctorNotifyMessage((prev) => ({ ...prev, doctorResponse: response }));
    }, 900);
  }

  // next best hospital (select next hospital in available list)
  function showNextBestHospital() {
    if (!availableHospitals || availableHospitals.length === 0) return;
    const currentIndex = availableHospitals.findIndex(h => selectedHospital && h.id === selectedHospital.id);
    const next = availableHospitals[(currentIndex + 1) % availableHospitals.length];
    openHospital(next);
  }

  function handleCallAmbulance() {
    setAmbulanceCalled(true);
    setTimeout(() => {
      alert('Ambulance requested . Dispatch center notified.');
    }, 150);
  }

  /* UI helpers */
  const severityColor = (sev) => {
    if (sev === 'Low') return 'bg-green-50 text-green-800';
    if (sev === 'Moderate') return 'bg-yellow-50 text-yellow-800';
    if (sev === 'High') return 'bg-red-50 text-red-800';
    if (sev === 'Critical') return 'bg-red-100 text-red-900';
    return 'bg-slate-50 text-slate-800';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">Symptom Checker</h1>

      {/* Grid: form + result */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Card */}
        <form onSubmit={handleAnalyse} className="rounded-2xl p-6 bg-white shadow-lg border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-semibold">Patient Intake</div>
              <div className="text-sm text-slate-500">Enter symptoms to get a quick assessment</div>
            </div>
            <div className="text-sm text-slate-400">Premium medical UI</div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col">
                <span className="text-sm text-slate-600 mb-1">Age</span>
                <input type="number" min="0" value={age} onChange={(e) => setAge(Number(e.target.value))}
                  className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </label>
              <label className="flex flex-col">
                <span className="text-sm text-slate-600 mb-1">Gender</span>
                <select value={gender} onChange={(e) => setGender(e.target.value)}
                  className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm text-slate-600 mb-1">Describe your symptoms</span>
              <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={5}
                placeholder="e.g., fever, chest pain, shortness of breath..." className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-100" />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-slate-600 mb-1">Frequency of recurrence</span>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-200">
                <option>Rarely</option>
                <option>Sometimes</option>
                <option>Frequently</option>
                <option>Daily</option>
              </select>
            </label>

            <div className="flex items-center gap-3 justify-between">
              <button type="submit" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold shadow hover:scale-[1.01] transition">
                Analyse
              </button>

              <div className="text-sm text-slate-500">
                <div>Family vehicle available?</div>
                <label className="inline-flex items-center mt-1 cursor-pointer">
                  <input type="checkbox" checked={familyVehicleAvailable} onChange={() => setFamilyVehicleAvailable(v => !v)} className="mr-2" />
                  <span className="text-sm">{familyVehicleAvailable ? 'Yes' : 'No'}</span>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Result & Hospital Search Column */}
        <div className="space-y-6">
          {/* Prediction Card (shows after analyse) */}
          <div className="rounded-2xl p-6 bg-white shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg font-semibold">Prediction</div>
                <div className="text-sm text-slate-500">Instant AI-like assessment (dummy)</div>
              </div>
              <div className="text-sm text-slate-400">{analysedAt ? `Analysed: ${analysedAt.toLocaleTimeString()}` : 'Awaiting input'}</div>
            </div>

            {!prediction ? (
              <div className="text-sm text-slate-500">Complete the form and click <strong>Analyse</strong> to see results.</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${severityColor(prediction.severity)} w-full`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500">Condition predicted</div>
                        <div className="text-lg font-semibold">{prediction.condition}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Severity</div>
                        <div className="font-bold">{prediction.severity}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-slate-600 flex items-center gap-2">
                      <Icon.Clock className="w-4 h-4 text-slate-400" />
                      <span>{prediction.emergency}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border">
                    <div className="text-sm text-slate-600 mb-2">Suggested Home Remedies</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      {prediction.homeRemedies.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border">
                    <div className="text-sm text-slate-600 mb-2">Quick Actions</div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => alert('Teleconsult booked (dummy)')} className="px-3 py-2 rounded-md bg-white border text-sm">Book Teleconsult</button>
                      <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-3 py-2 rounded-md bg-white border text-sm">Find Nearby Hospitals</button>
                      { (prediction.severity === 'High' || prediction.severity === 'Critical' || !familyVehicleAvailable) && (
                        <div className="mt-2 p-3 rounded-md bg-red-50 text-red-800">
                          <div className="flex items-center gap-2 font-medium"><Icon.Warning className="w-5 h-5" /> Urgent attention recommended</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hospital Search (visible after prediction) */}
          {prediction && (
            <div className="rounded-2xl p-6 bg-white shadow-lg border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold">Search Hospitals Nearby</div>
                  <div className="text-sm text-slate-500">Within 30 km</div>
                </div>
                <div className="text-sm text-slate-400">Choose distance</div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 5, 10, 20, 30].map(km => (
                  <button key={km} onClick={() => handleDistanceChange(km)}
                    className={`px-3 py-1 rounded-md border ${distanceKm === km ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}>
                    {km} km
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {availableHospitals.length === 0 ? (
                  <div className="text-sm text-slate-500">No hospitals found in this range. Try expanding radius.</div>
                ) : (
                  availableHospitals.map(h => (
                    <div key={h.id} className="p-3 rounded-lg flex items-center justify-between border hover:shadow-sm">
                      <div>
                        <div className="font-semibold">{h.name}</div>
                        <div className="text-sm text-slate-500">{h.distance} km</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openHospital(h)} className="px-3 py-1 rounded-md bg-sky-600 text-white text-sm">View Doctors</button>
                        <button onClick={() => alert('Routing started (dummy)')} className="px-2 py-1 rounded-md bg-white border text-sm">Route</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hospital Modal / Expanded Card */}
      {hospitalModalOpen && selectedHospital && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setHospitalModalOpen(false)} />
          <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 z-50 overflow-y-auto max-h-[85vh]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xl font-semibold">{selectedHospital.name}</div>
                <div className="text-sm text-slate-500">Distance: {selectedHospital.distance} km</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setHospitalModalOpen(false)} className="text-sm px-3 py-1 rounded-md border">Close</button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-600 mb-2">Recommended doctors for <span className="font-medium">{prediction.condition}</span></div>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedHospitalDoctors.map(doc => (
                    <div key={doc.id} className="p-3 rounded-lg border flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{doc.name}</div>
                          <div className="text-sm text-slate-500">{doc.spec}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm ${doc.available ? 'text-green-700' : 'text-red-600'}`}>{doc.available ? 'Available' : 'Not available'}</div>
                          <div className="text-xs text-slate-400">{doc.appointments} appointments</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Icon.Clock className="w-4 h-4 text-slate-400" />
                          <span>Queue: {doc.queue}</span>
                        </div>
                        <div className="text-sm">Est clear: {doc.estTimeMin} min</div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">
                          {doc.queue < 10 ? (
                            <Badge color="bg-green-50 text-green-800">You can wait</Badge>
                          ) : doc.queue > 15 ? (
                            <Badge color="bg-red-50 text-red-800">Consider other hospital</Badge>
                          ) : (
                            <Badge color="bg-yellow-50 text-yellow-800">Moderate wait</Badge>
                          )}
                        </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => chooseDoctor(doc)} className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">Select</button>
                            <button onClick={() => alert('Details (dummy)')} className="px-2 py-1 rounded-md border text-sm">Details</button>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crowded card if selected doctor queues indicate hospital crowd */}
              {selectedHospitalDoctors.some(d => d.queue > 15) && (
                <div className="p-4 rounded-lg bg-red-50 border-l-4 border-red-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-red-800">This hospital is currently crowded.</div>
                      <div className="text-sm text-red-700">You may choose the next best recommended hospital.</div>
                    </div>
                    <div>
                      <button onClick={() => showNextBestHospital()} className="px-3 py-2 rounded-md bg-white border text-sm">Show Next Best Hospital</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor notification / messages */}
              {selectedDoctor && doctorNotifyMessage && (
                <div className="p-3 rounded-lg bg-slate-50 border">
                  <div className="text-sm text-slate-600 mb-1">Notification</div>
                  <div className="text-sm text-slate-700 space-y-1">
                    {doctorNotifyMessage.messages.map((m, i) => <div key={i}>• {m}</div>)}
                    {doctorNotifyMessage.doctorResponse && (
                      <div className="mt-2 p-3 rounded-md bg-white border">
                        <div className="text-sm font-medium">Doctor Message</div>
                        <div className="text-sm mt-1">{doctorNotifyMessage.doctorResponse}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ambulance option */}
              {(prediction.severity === 'High' || prediction.severity === 'Critical' || !familyVehicleAvailable) && (
                <div className="p-4 rounded-lg bg-emerald-50 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-white"><Icon.Ambulance className="w-6 h-6 text-emerald-700" /></div>
                      <div>
                        <div className="font-semibold">Ambulance Available</div>
                        <div className="text-sm text-slate-600">Quick transport options for urgent cases</div>
                      </div>
                    </div>
                    <div>
                      <button onClick={handleCallAmbulance} className="px-4 py-2 rounded-md bg-emerald-600 text-white">Call Ambulance</button>
                    </div>
                  </div>
                  {ambulanceCalled && <div className="mt-2 text-sm text-emerald-700">Ambulance requested (dummy)</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-6 text-xs text-slate-400">
        Note: This is a demo UI only. No real medical advice. For emergencies call local emergency services.
      </div>
    </div>
  );
}
