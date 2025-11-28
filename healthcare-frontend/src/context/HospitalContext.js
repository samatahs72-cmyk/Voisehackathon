import React, {createContext, useState} from 'react'

export const HospitalContext = createContext(null)

export function HospitalProvider({children}){
  const [hospitals, setHospitals] = useState([])
  return <HospitalContext.Provider value={{hospitals, setHospitals}}>{children}</HospitalContext.Provider>
}
