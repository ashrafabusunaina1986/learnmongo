'use client'
import React, { useEffect, useState } from 'react'
import classes from './page.module.css'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Home_Text from '../page'


function UpdateUser() {
    const router=useRouter()
    const {id}=useParams()
    const [user,setUser]=useState({})
    const getEmail=async()=>{
        const response=await fetch(`/api/${id}`)
        if(!response.ok) throw new Error("something went wrong")
        return await response.json()
    }
    useEffect(()=>{
        getEmail().then(r=>{
            setUser(r)
        }).catch(e=>console.log(e))

    },[])
    const updateEmail=async(e)=>{
        e.preventDefault()
        const response=await fetch(`/api/${id}`,{
            method:'PUT',
            body:JSON.stringify({e:user.email,p:user.password}),
            headers:{
                'Type-Content':'application/json'
            }
        })
        if(!response.ok) throw new Error("something went wrong")
        else{
            router.push('/text')
         }
    }

  return (
    <form className={classes.form} onSubmit={updateEmail}>
        <div>
            email: <input type="email" value={user?user.email:''}
            onChange={(e)=>setUser({...user,email:e.target.value})}/>
        </div>
        <div>
            password:<input type="password" value={user?user.password:''}
            onChange={(e)=>setUser({...user,password:e.target.value})}/>
        </div>
        <div>
            <button >update</button>
        </div>
    </form>
  )
}

export default UpdateUser