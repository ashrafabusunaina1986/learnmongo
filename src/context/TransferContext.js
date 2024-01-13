'use client'
import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const Transfer_Context = createContext()

function TransferContext({ children }) {
    const [url, setUrl] = useState('#'),[emailc,setEmailc]=useState('')
    return (
        <Transfer_Context.Provider value={{ url, setUrl,emailc,setEmailc }}>
            {children}
        </Transfer_Context.Provider>
    )
}

export default TransferContext