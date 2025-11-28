import React, { useEffect, useState } from 'react'
import useLocation from '../../hooks/useLocation'

// HospitalList fetches real hospitals from backend /api/hospitals using user's location
export default function HospitalList({ radiusKm = 10, onSelect } ){
  const { lat, lng, loading, error, request } = useLocation()
  const [hospitals, setHospitals] = useState([])
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  useEffect(()=>{
    async function load(){
      if(!lat || !lng) {
        setHospitals([])
        return
      }
      setFetching(true)
      setFetchError(null)
      try{
        const radius = Math.round(radiusKm * 1000)
        const res = await fetch(`/api/hospitals?lat=${lat}&lon=${lng}&radius=${radius}`)
        if(!res.ok) throw new Error('Failed to fetch')
        const body = await res.json()
        const mapped = (body.hospitals || []).map(h=>({
          id: h.id,
          name: h.name,
          lat: h.lat,
          lon: h.lon,
          distance_m: h.distance_m
        }))
        setHospitals(mapped)
      }catch(err){
        setFetchError(err.message || 'Error')
        setHospitals([])
      }finally{
        setFetching(false)
      }
    }
    load()
  }, [lat, lng, radiusKm])

  if (loading) return <div className="text-sm text-gray-500">Waiting for location...</div>
  if (error) return (
    <div className="text-sm text-red-600">Location error: {error} <button onClick={request} className="ml-2 px-2 py-1 rounded bg-white border">Retry</button></div>
  )
  if (fetching) return <div className="text-sm text-gray-500">Loading nearby hospitals...</div>
  if (fetchError) return <div className="text-sm text-red-600">Error: {fetchError}</div>
  if (hospitals.length === 0) return <div className="text-sm text-gray-500">No hospitals found within {radiusKm} km.</div>

  return (
    <div className="grid gap-4">
      {hospitals.map(h => (
        <div key={h.id} className="p-4 rounded-lg bg-white/80 card-shadow flex items-center justify-between">
          <div>
            <div className="font-semibold">{h.name}</div>
            <div className="text-sm text-gray-500">{(h.distance_m/1000).toFixed(1)} km</div>
          </div>
          <div className="flex items-center gap-2">
            {onSelect ? (
              <button onClick={()=>onSelect(h)} className="px-3 py-2 rounded-md bg-sky-600 text-white">View</button>
            ) : (
              <button onClick={()=>alert(`Selected hospital: ${h.name}`)} className="px-3 py-2 rounded-md bg-sky-600 text-white">View</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
