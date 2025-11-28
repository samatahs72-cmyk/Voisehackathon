import React from 'react'

export default function PatientDashboard(){
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-white/80 card-shadow">Welcome back — quick actions and recent visits.</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-white/80 card-shadow">Appointments</div>
        <div className="p-4 rounded-lg bg-white/80 card-shadow">Prescriptions</div>
      </div>
    </div>
  )
}
