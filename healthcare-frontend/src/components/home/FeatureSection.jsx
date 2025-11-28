import React from 'react'
import Card from '../common/Card'

const features = [
  {title:'Symptom Triage', desc:'AI-driven symptom analysis with clear next steps'},
  {title:'Hospital Matching', desc:'Personalized recommendations balancing distance and expertise'},
  {title:'Ambulance Routing', desc:'Fastest routes for emergency transfers'},
  {title:'Teleconsult', desc:'Instant video with verified clinicians'}
]

export default function FeatureSection(){
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Core Features</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f)=> (
          <Card key={f.title} className="bg-gradient-to-br from-white to-white/60">
            <div className="text-lg font-semibold">{f.title}</div>
            <div className="text-sm text-gray-600 mt-2">{f.desc}</div>
          </Card>
        ))}
      </div>
    </section>
  )
}
