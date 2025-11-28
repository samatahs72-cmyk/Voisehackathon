import {useState, useEffect, useCallback} from 'react'

export default function useLocation(){
  const [loc, setLoc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const request = useCallback(() => {
    setLoading(true)
    setError(null)
    if (!navigator.geolocation) {
      setError('Geolocation not supported by browser')
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLoc({ lat: p.coords.latitude, lng: p.coords.longitude })
        setLoading(false)
      },
      (err) => {
        setError(err.message || 'Permission denied')
        setLoading(false)
      },
      { timeout: 15000 }
    )
  }, [])

  useEffect(() => {
    request()
  }, [request])

  return { lat: loc?.lat, lng: loc?.lng, loading, error, request }
}
