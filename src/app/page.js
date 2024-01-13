'use client'
import Image from 'next/image'
import Link from 'next/link'
import {Transfer_Context} from '@/context/TransferContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router=useRouter()
  const {setUrl,emailc,setEmailc}=useContext(Transfer_Context)

  const urlHandler=(u)=>{
    setUrl(u)
    setEmailc(emailc)
    router.push(u)
  }
  useEffect(()=>{
    //console.log(emailc)
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className='flex p-2 w-full justify-between bg-slate-200 border border-solid border-slate-600'>
        <Image width={300} height={250} alt='Next'
        src={'next.svg'} className=' opacity-40' />
        {emailc===''?<div className='flex gap-5 mr-8'>
          
            
              <Link href='/auth/register'
          onClick={(e)=>urlHandler('/')}
          className=' h-max  p-2 block border border-solid border-slate-950 text-slate-950 font-bold hover:bg-slate-900 hover:text-slate-200 ' >Sign up</Link>
          <Link href='/auth/login'
          onClick={(e)=>urlHandler('/')}
          className=' h-max  p-2 block border border-solid border-slate-950 text-slate-950 font-bold hover:bg-slate-900 hover:text-slate-200 '>Login</Link>
        </div>:
            <h1>Email:{emailc}</h1>
  }
      </header>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/text"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
         
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            TEXT{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>

        <a 
          href="/task"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            TASK{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>

        </a>

        <a onClick={()=>urlHandler('/uploadfile')}
          
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 cursor-pointer hover:dark:bg-neutral-800/30"
       
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            UPLOAD FILE{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>

        </a>
      </div>
    </main>
  )
}
