'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdDelete, MdLogout } from 'react-icons/md'
import { Transfer_Context } from '../../context/TransferContext'
import { usePathname, useRouter } from 'next/navigation'
import Login from '../auth/login/page'
import toast from 'react-hot-toast'


function UploadFile(request, response) {

    const pathname = usePathname()
    const router = useRouter(), { url, emailc } = useContext(Transfer_Context)
    const [data, setData] = useState([])
    const [d, setd] = useState('nothing')
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        const res = await fetch('/api/upload')
        if (!res.ok) throw new Error("something went wrong")
        return await res.json()
    }

    const del = async id => {
        const res = await fetch(`/api/upload?id=${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) throw new Error('something went wrong')
        getData().then(r => {
            setData(r)
            setIsLoading(false)
        }).catch(e => console.log(e))
    }
    const logout = async () => {
        try {
            const response = await fetch(`/api/users/logout`)
            if (!response.ok) return console.log('Something went wrong')

            toast.success('logout successfully')
            router.push('/auth/login')
        } catch (error) {
            console.log(error.message);
        }
    }
    const getUserDetails = async () => {
        const res = await fetch(`/api/users/me`)
        const details=await res.json()
        console.log(details)
        setd(details.data._id)
    }
    useEffect(() => {
        console.log(emailc, url, pathname)
        if (emailc !== '') {

        }
        console.log(response)
        getData().then(r => {
            setData(r)
            setIsLoading(false)
        }).catch(e => console.log(e))
    }, [])

    return (
        <div className='container w-11/12 m-auto bg-slate-100'>
            <header className='container flex justify-between bg-slate-700 text-slate-200 p-5 mb-2'>
                <h1 className=' text-lg font-bold'>Upload file</h1>
                <Link href='/uploadfile/upload' className=' border border-solid border-slate-500 hover:text-slate-900 hover:bg-slate-300 p-2 rounded-xl' >upload</Link>
                <h2>{d === 'nothing' ? "Nothing" : <Link href={'/uploadfile/' + d}>
                    Get Details
                </Link>}</h2>
                <button onClick={logout}><MdLogout /></button>
                <button onClick={getUserDetails}>Get details</button>
            </header>
            <section>
                {
                    isLoading ? <div className='m-auto w-max rounded-xl p-5 mt-11 border border-solid bg-slate-600 text-white font-bold'>Loading...</div> : data.map(item => {
                        return <div key={item._id} className='flex justify-between items-center border border-solid border-gray-500 bg-slate-300 m-auto mt-2 p-5 mb-2'>
                            <div className=' flex gap-16 items-center'>
                                <Image width={500} height={500} alt={item.name} className=' w-80 h-48'
                                    src={item.image} />
                                <h1>{item.name}</h1>
                            </div>

                            <div onClick={() => del(item._id)}><MdDelete /></div>
                        </div>
                    })
                }
            </section>
        </div>

    )
}

export default UploadFile