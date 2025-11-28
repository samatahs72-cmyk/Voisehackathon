import React from 'react'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

export default function HeroSection(){
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Intelligent care, accelerated.
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> AI-powered healthcare</span>
        </h1>
        <p className="text-gray-600 max-w-xl">From symptom triage to hospital routing — accurate, fast, and human-centered. Built for clinicians and patients who expect exceptional experiences.</p>
        <div className="flex items-center gap-4">
          <Link to="/symptom-checker" className="inline-block">
            <Button>Try Symptom Checker</Button>
          </Link>
          <a href="/emergency" className="text-sm text-red-600 font-semibold">Emergency? Get help now →</a>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-white/70 card-shadow">
            <div className="text-sm text-gray-500">Accuracy</div>
            <div className="font-semibold text-lg"> 92%</div>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-white/70 card-shadow">
            <div className="text-sm text-gray-500">Response Time</div>
            <div className="font-semibold text-lg">{"< 400ms"}</div>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-white/70 card-shadow">
            <div className="text-sm text-gray-500">Coverage</div>
            <div className="font-semibold text-lg">Global</div>
          </div>
        </div>
      </div>
        <div className="absolute -bottom-6 left-6 w-56 p-4 rounded-2xl bg-white/80 card-shadow">
          <div className="text-xs text-gray-500">Nearest Hospital</div>
          <div className="font-semibold">St. Mercy General</div>
          <div className="text-sm text-gray-600">2.3 km · 7 min</div>
        </div>
      <div className="relative">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-accent/6 p-6 flex items-center justify-center h-80">
          <svg width="320" height="240" viewBox="0 0 320 240" className="opacity-80">
            <rect width="320" height="240" rx="20" fill="#eef2ff" />
            <circle cx="80" cy="80" r="36" fill="#7c3aed" opacity="0.9" />
            <rect x="140" y="40" width="140" height="120" rx="16" fill="#0556ff" opacity="0.9" />
          </svg>
        </div>
        
      </div>
    </section>
  )
}
