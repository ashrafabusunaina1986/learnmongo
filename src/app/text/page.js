'use client'
import React, { useEffect, useRef, useState } from 'react'
import classes from './page.module.css'
import { MdDelete } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import Link from 'next/link'


export default function Home_Text() {
    const emailDef = useRef()
    const passDef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])
    const [isloading, setIsLoading] = useState(false)

    const submit_Handler = (e) => {
        e.preventDefault()
        setEmail(emailDef.current.value)
        setPassword(passDef.current.value)
    }
    const getData = async () => {
        setIsLoading(true)
        const response = await fetch('/api')
        if (!response.ok) {
            throw new Error("something went wrong")
        }

        return await response.json()
    }
    const deleteemail = async (id) => {
        const confirm = window.confirm('are you sure')
        if (confirm) {
            const response = await fetch(`/api?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Type-Content': 'application/json'
                }
            })

            if (!response.ok) {
                return
            }

            getData().then(r => {
                setIsLoading(false)
                //console.log(r)
                setUsers(r)
            }).catch(error => console.log(error))
        }
    }
    const editEmail = id => {

    }

    useEffect(() => {

        getData().then(r => {
            setIsLoading(false)
            //console.log(r)
            setUsers(r)
        }).catch(error => console.log(error))

        const post = async () => {
            const response = await fetch(`/api`, {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Type-Content': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            return await response.json()
        }
        if (email !== '' || password !== '')
            post().then(r => {
                //console.log(r.demo)
                setUsers(r.demo)
            }).catch(e => { console.log(e) })

    }, [email, password])

    return (
        <div className=' text-center'>
            <form className={classes.form} onSubmit={submit_Handler}>
                <div>
                    <input className={classes.input}
                        ref={emailDef}
                        type="email" placeholder='Email' name='email' />
                </div>
                <div>
                    <input className={classes.input}
                        ref={passDef}
                        type="password" placeholder='Password' name='password' />
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
            <section >
                {
                    !isloading ? users && users.length > 0 && <div className={classes.cart} >
                        <div>number  of users:{users.length}</div>
                        <div>
                            {users.map((user) => {
                                return <div key={user._id} className={classes.cart1} >

                                    <div>Email:{user.email}</div>
                                    <Link href={'/text/' + user._id} className={classes.icon}
                                        onClick={() => editEmail(user._id)} ><CiEdit /></Link>
                                    <div className={classes.icon}
                                        onClick={() => deleteemail(user._id)}><MdDelete /></div>
                                </div>
                            })}
                        </div>

                    </div> : <div className={classes.cart}>LOADING...</div>

                }
                {!isloading && users && <div className={classes.cart}>The emails is {users.length}</div>}
            </section>
        </div>
    )
}
