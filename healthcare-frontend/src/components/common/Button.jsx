import React from 'react'

export default function Button({children, className='', ...props}){
  return (
    <button {...props} className={`px-5 py-2 rounded-lg shadow-md text-white bg-gradient-to-r from-primary to-accent hover:scale-[1.01] transition-transform ${className}`}>
      {children}
    </button>
  )
}
