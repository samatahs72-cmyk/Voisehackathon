import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="backdrop-blur-sm bg-gradient-to-r from-white/60 via-white/40 to-white/60 sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">HC</div>
          <div>
            <div className="text-lg font-semibold">HealthCare</div>
            <div className="text-xs text-gray-500 -mt-1">AI · Telehealth · Emergency</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/symptom-checker" className="hover:text-primary">Symptom Checker</Link>
          <Link to="/hospital-recommendations" className="hover:text-primary">Hospitals</Link>
          <Link to="/doctors" className="hover:text-primary">Doctors</Link>
          <Link to="/emergency" className="text-red-600 font-semibold">Emergency</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/patient" className="hidden md:inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium">Get Started</Link>
          <button className="md:hidden p-2 rounded-lg bg-white card-shadow">☰</button>
        </div>
      </div>
    </header>
  )
}
