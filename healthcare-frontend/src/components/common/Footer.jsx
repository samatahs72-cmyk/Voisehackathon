import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 border-t">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} HealthCare. All rights reserved.</div>
        <div className="text-sm text-gray-600">Built with care · Privacy first</div>
      </div>
    </footer>
  )
}
