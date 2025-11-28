import React from 'react'

export default function Card({children, className=''}){
  return (
    <div className={`rounded-2xl p-6 bg-white/70 ${className} card-shadow`}>{children}</div>
  )
}
