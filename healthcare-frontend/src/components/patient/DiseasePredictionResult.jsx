import React from 'react'

export default function DiseasePredictionResult({prediction}){
  if(!prediction) return null
  return (
    <div className="p-4 rounded-lg bg-white/80 card-shadow">
      <div className="text-sm text-gray-500">Result</div>
      <div className="font-semibold text-lg">{prediction.label}</div>
      <div className="text-sm text-gray-600">Confidence: {prediction.probability}%</div>
    </div>
  )
}
