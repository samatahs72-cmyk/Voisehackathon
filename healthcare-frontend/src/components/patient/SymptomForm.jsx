import React, {useState} from 'react'
import Button from '../common/Button'

export default function SymptomForm(){
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState(null)

  function handleSubmit(e){
    e.preventDefault()
    // placeholder: in real app call API
    setResult({probability: Math.round(Math.random()*100), label:'Likely viral infection'})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/70 p-6 rounded-2xl card-shadow">
      <label className="block text-sm font-medium">Describe your symptoms</label>
      <textarea value={symptoms} onChange={(e)=>setSymptoms(e.target.value)} rows={4} className="w-full p-3 rounded-md border" placeholder="e.g., fever, sore throat, cough..."></textarea>
      <div className="flex items-center gap-4">
        <Button type="submit">Analyze</Button>
        <button type="button" className="text-sm text-gray-600" onClick={()=>{setSymptoms('')}}>Clear</button>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/8">
          <div className="text-sm text-gray-500">Prediction</div>
          <div className="font-semibold text-lg">{result.label}</div>
          <div className="text-sm text-gray-600">Confidence: {result.probability}%</div>
        </div>
      )}
    </form>
  )
}
