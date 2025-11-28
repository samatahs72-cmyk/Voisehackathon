import React from 'react'
import HeroSection from '../components/home/HeroSection'
import FeatureSection from '../components/home/FeatureSection'
import HowItWorks from '../components/home/HowItWorks'

export default function HomePage(){
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
    </div>
  )
}
