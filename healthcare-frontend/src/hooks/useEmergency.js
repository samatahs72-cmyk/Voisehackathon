import {useState} from 'react'

export default function useEmergency(){
  const [active, setActive] = useState(false)
  function trigger(){ setActive(true); /* integrate dispatch */ }
  return {active, trigger}
}
