'use client'
import React, { useState } from 'react'
import { createContext } from 'react'

export const Email_=createContext()

function EmailContext({children}) {
    const [emailc,setEmailc]=useState('')
  return (
    <Email_.Provider value={{emailc,setEmailc}}>

    </Email_.Provider>
  )
}

export default EmailContext