import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SymptomCheckerPage from '../pages/SymptomCheckerPage'
import HospitalRecommendationPage from '../pages/HospitalRecommendationPage'
import DoctorAvailabilityPage from '../pages/DoctorAvailabilityPage'
import EmergencyPage from '../pages/EmergencyPage'
import PatientDashboardPage from '../pages/PatientDashboardPage'
import HospitalDashboardPage from '../pages/HospitalDashboardPage'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/symptom-checker" element={<SymptomCheckerPage/>} />
      <Route path="/hospital-recommendations" element={<HospitalRecommendationPage/>} />
      <Route path="/doctors" element={<DoctorAvailabilityPage/>} />
      <Route path="/emergency" element={<EmergencyPage/>} />
      <Route path="/dashboard/patient" element={<PatientDashboardPage/>} />
      <Route path="/dashboard/hospital" element={<HospitalDashboardPage/>} />
    </Routes>
  )
}
