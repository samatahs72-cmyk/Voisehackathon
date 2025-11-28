import React from 'react'

const docs = [
  {name:'Dr. Maya Singh', spec:'General Physician', avail:'Now'},
  {name:'Dr. John Doe', spec:'Cardiologist', avail:'10:30 AM'},
]

export default function DoctorList(){
  return (
    <div className="grid gap-4">
      {docs.map(d=> (
        <div key={d.name} className="p-4 rounded-lg bg-white/80 card-shadow flex items-center justify-between">
          <div>
            <div className="font-semibold">{d.name}</div>
            <div className="text-sm text-gray-500">{d.spec} · {d.avail}</div>
          </div>
          <button className="px-3 py-2 rounded-md bg-accent text-white">Book</button>
        </div>
      ))}
    </div>
  )
}
