import {useState, useEffect} from 'react'

export default function useFetch(url){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let cancelled = false
    setLoading(true)
    fetch(url).then(r=>r.json()).then(d=>{ if(!cancelled){ setData(d); setLoading(false)} }).catch(e=>{ if(!cancelled){setError(e); setLoading(false)} })
    return ()=>{cancelled = true}
  },[url])

  return {data, loading, error}
}
