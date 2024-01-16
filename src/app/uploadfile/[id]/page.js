'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Details() {
  const params=useParams()
  
  return (
    <div className=' text-center m-auto mt-20 bg-gray-200 p-4'>
        <h1 className=' w-max p-3 ps-4 pr-4 bg-slate-600 text-slate-100 rounded-md m-auto mb-2'>{params.id}</h1>
        <Link href='..'  rel='path'>Back</Link>
    </div>
  )
}

export default Details