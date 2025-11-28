import React from 'react'
import EmergencyAlert from '../components/emergency/EmergencyAlert'
import AmbulanceRouting from '../components/emergency/AmbulanceRouting'

export default function EmergencyPage(){
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Emergency</h2>
      <EmergencyAlert />
      <AmbulanceRouting />
    </div>
  )
}
