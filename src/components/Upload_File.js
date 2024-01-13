'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function Upload_File() {
    const router=useRouter()

    const uploadImage =  image => {
        console.log(image)
        const reader = new FileReader()
        reader.onload =async evt => {
            console.log(evt.target.result)
            const res=await fetch('/api/upload',{
                method:'POST',
                body:JSON.stringify({name:image.name,image:evt.target.result}),
                headers:{
                    'Type-Content':'application/json'
                }
            })
            if(!res.ok) throw new Error('something went wrong')
            
        }
        reader.readAsDataURL(image)
        router.push('/uploadfile')
    }
    return (
        <>
            <form className='border border-slate-400 m-auto border-solid w-3/5 p-5 mt-3'>
                <h1 className='font-bold mb-3 mt-3 m-auto w-max'>For upload image to here</h1>
                <label htmlFor="image" className=' font-bold  bg-slate-800  rounded-xl m-auto block p-4 w-max hover:bg-slate-300 pl-8 pr-8 text-white hover:text-black'>Upload Image</label>
                <input
                    onChange={(e) => uploadImage(e.target.files[0])}
                    type="file" accept='image/*' id='image' name='image'
                    className='hidden' />
            </form>
        </>

    )
}

export default Upload_File