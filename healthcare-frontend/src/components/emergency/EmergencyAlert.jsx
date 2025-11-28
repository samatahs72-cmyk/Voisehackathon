import React from 'react'

export default function EmergencyAlert(){
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-red-100 to-red-50 border-l-4 border-red-400">
      <div className="text-sm text-red-700 font-semibold">Emergency Assistance</div>
      <div className="mt-2 text-gray-700">If you're experiencing a life-threatening emergency, call emergency services immediately. Use our ambulance routing for urgent transfers.</div>
      <div className="mt-4">
        <a href="/emergency" className="px-4 py-2 rounded-lg bg-red-600 text-white">Dispatch Ambulance</a>
      </div>
    </div>
  )
}
