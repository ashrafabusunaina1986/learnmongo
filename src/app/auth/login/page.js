'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Transfer_Context } from '../../../context/TransferContext'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'



function Login() {
  const pathname = usePathname()
  const [user, setUser] = useState(''), [brackets, setBrackets] = useState('')
  const { url, setEmailc } = useContext(Transfer_Context)
  const emailRef = useRef(), passRef = useRef(), router = useRouter()

  const loginHandler = async e => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = fd.get('email'), password = fd.get('password')
    if (email !== '' && !password !== '') {
      setBrackets('')
      const res = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Type-Content': 'application/json'
        }
      })
      if (!res.ok) return
      const userE = await res.json()
      const message = userE.error
      console.log(message)
      if (message === 'user not found') {
        setUser(message)
      } else {
        console.log(userE.message)
        setUser('')
        if (pathname === '/auth/login') { router.push('/') }
        else if (pathname === '/uploadfile') {
          router.push(pathname)
        }
        
      }
    } else {
      setBrackets('enter all brackets')
    }
  }
  return (
    <div className='m-auto p-4 w-1/2'>
      <form onSubmit={loginHandler} className=' w-full bg-slate-600 m-auto mt-3 p-4'>

        {user && <h1 className=' shadow-md p-2 bg-red-300 shadow-red-500 pt-1 pb-1 rounded-md w-max'>{user}</h1>}
        {brackets && <h1 className=' shadow-md p-2 bg-red-300 shadow-red-500 pt-1 pb-1 rounded-md w-max'>{brackets}</h1>}
        <div className='flex mt-3 flex-col w-4/5' >
          <label htmlFor="email" className='font-bold text-white'>Email</label>
          <input type="email" id='email' ref={emailRef} name='email' className='p-1 ps-2 -r-2 rounded-r-xl' />
        </div>
        <div className='flex  flex-col w-4/5 mt-3'>
          <label className='font-bold text-white' htmlFor="password">Password</label>
          <input type="password" id='password' ref={passRef} name='password' className='p-1 ps-2 -r-2 rounded-r-xl' />
        </div >
        <div className='w-max mt-3'>
          <button className='flex font-bold w-full bg-slate-950 boder border-solid border-slate-600 text-white p-3 ps-5 pr-5 rounded-lg hover:bg-slate-300 hover:text-slate-900'>Login</button>
        </div>
      </form>
      for upload file must be <Link href='/auth/register'
        className=' text-red-300 underline'
      >signup</Link>
    </div>
  )
}

export default Login