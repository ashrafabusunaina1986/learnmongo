'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Transfer_Context } from '@/context/TransferContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { setUrl, emailc, setEmailc } = useContext(Transfer_Context)
  const [d, setd] = useState('')

  const urlHandler = (u) => {
    setUrl(u)
    setEmailc(emailc)
    router.push(u)
  }
  const getUserDetails = async () => {
    const res = await fetch(`/api/users/me`)
    const details = await res.json()
    return details
  }
  const logout = async () => {
    try {
      const response = await fetch(`/api/users/logout`)
      if (!response.ok) return console.log('Something went wrong')
      setd('')
      toast.success('logout successfully')
      router.push('/auth/login')
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserDetails().then(r => {
      if (r) {
        if(r.error) return console.log(r)
        console.log(r)
        setd(r.data.email)
      }
    }).catch(e => {
      console.log(e)
    })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className='flex p-2 w-full justify-between bg-slate-200 border border-solid border-slate-600'>
        <Image width={300} height={250} alt='Next'
          src={'next.svg'} className=' opacity-40' />
        {d === '' ? <div className='flex gap-5 mr-8'>


          <Link href='/auth/register'

            className=' h-max  p-2 block border border-solid border-slate-950 text-slate-950 font-bold hover:bg-slate-900 hover:text-slate-200 ' >Sign up</Link>
          <Link href='/auth/login'

            className=' h-max  p-2 block border border-solid border-slate-950 text-slate-950 font-bold hover:bg-slate-900 hover:text-slate-200 '>Login</Link>
        </div> :
          <h1>Email:{d} <button
            className='border border-solid border-slate-900 hover:bg-slate-900 hover:text-white p-2 ps-4 pr-4 rounded-2xl'
            onClick={logout}>Logout</button></h1>
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

        <a onClick={() => urlHandler('/uploadfile')}

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
