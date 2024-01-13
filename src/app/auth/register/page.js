'use client'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {Transfer_Context} from '@/context/TransferContext'


function Register() {
    const {url,setEmailc,emailc}=useContext(Transfer_Context)
    const fnRef = useRef()
    const lnRef = useRef()
    const userRef=useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const [user, setUser] = useState(''),
    [brackets,setBrackets]=useState('')
    const router = useRouter()

    const registerHandler = async e => {
        e.preventDefault()
        console.log(url)
        const fd = new FormData(e.currentTarget)
        const firstname=fd.get('firstname'),
                    lastname=fd.get('lastname'),
                    email=fd.get('email'),
                    password=fd.get('password'),
                    username=fd.get('username')
        if (firstname!=='' && lastname!=='' &&  email!=='' && password!=='' && username!=='') {
            setBrackets('')
            const res = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    firstname,lastname,username,email,password
                }),
                headers: {
                    'Type-Content': 'application/json'
                }
            })
            if (!res.ok) console.log( res)
            //console.log(await res.json())
            const em=(await res.json())
            if(em.error==='user already'){
                setUser(em.error)
            }else{
                setEmailc(email)
                setUser('')
                router.push('/')
            }
        }else{
            setBrackets('enter the brackets')
        }

    }
    useEffect(()=>{
        //console.log(emailc)
    })
    return (
        <form onSubmit={registerHandler} className='bg-slate-200 border border-slate-400 border-solid w-2/5 m-auto mt-5 p-5 flex flex-col items-center'>
            {user && <h1 className=' shadow-md p-2 bg-red-300 shadow-red-500 pt-1 pb-1 rounded-md'>{user}</h1> }
            {brackets && <h1 className=' shadow-md p-2 bg-red-300 shadow-red-500 pt-1 pb-1 rounded-md'>{brackets}</h1>}
            <div className=' flex flex-col font-bold text-sm m-3'>
                <label htmlFor="firstname">First Name</label>
                <input ref={fnRef} type="text" id='firstname' name='firstname' className='p-1 rounded-sm' />
            </div>
            <div className=' flex flex-col font-bold text-sm m-3'>
                <label htmlFor="lastname" className='font-bold '>Last Name</label>
                <input ref={lnRef} type="text" id='lastname' name='lastname' className='p-1 rounded-sm' />
            </div>
            <div className=' flex flex-col font-bold text-sm m-3'>
                <label htmlFor="username">User name</label>
                <input ref={userRef} type="text" id='username' name='username' className='p-1 rounded-sm' />
            </div>
            <div className='flex flex-col font-bold text-sm m-3'>
                <label htmlFor="email">Email</label>
                <input ref={emailRef} type="email" id='email' name='email' className='p-1 rounded-sm' />
            </div>
            <div className=' flex flex-col font-bold text-sm m-3'>
                <label htmlFor="password">Password</label>
                <input ref={passRef} type="password" id='password' name='password' className='p-1 rounded-sm' />
            </div>
            <div className='m-5'>
                <button className='font-bold hover:bg-slate-100 hover:text-slate-950 border border-solid border-slate-950 text-white bg-slate-950 rounded-sm p-3 pr-7 ps-7'>Register</button>
            </div>
        </form>
    )
}

export default Register