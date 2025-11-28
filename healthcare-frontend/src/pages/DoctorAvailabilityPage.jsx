import React from 'react'
import DoctorList from '../components/patient/DoctorList'

export default function DoctorAvailabilityPage(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
      <DoctorList />
    </div>
  )
}
