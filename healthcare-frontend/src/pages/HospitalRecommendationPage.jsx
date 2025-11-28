import React from 'react'
import HospitalList from '../components/patient/HospitalList'

export default function HospitalRecommendationPage(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended Hospitals</h2>
      <HospitalList />
    </div>
  )
}
