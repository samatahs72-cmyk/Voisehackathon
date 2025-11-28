import React from 'react'

export default function HowItWorks(){
  return (
    <section>
      <h3 className="text-xl font-bold mb-4">How it works</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/80 card-shadow">
          <div className="font-semibold">1. Tell us your symptoms</div>
          <div className="text-sm text-gray-600">Smart forms and natural language intake.</div>
        </div>
        <div className="p-4 rounded-xl bg-white/80 card-shadow">
          <div className="font-semibold">2. Get instant guidance</div>
          <div className="text-sm text-gray-600">Triage, urgency, and recommended facilities.</div>
        </div>
        <div className="p-4 rounded-xl bg-white/80 card-shadow">
          <div className="font-semibold">3. Connect or dispatch</div>
          <div className="text-sm text-gray-600">Book teleconsults or dispatch emergency services.</div>
        </div>
      </div>
    </section>
  )
}
