import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
