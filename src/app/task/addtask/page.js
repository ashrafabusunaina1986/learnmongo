'use client'
import React, { useState } from 'react'
import classes from './page.module.css'
import { useRouter } from 'next/navigation'

function AddTask() {
    const [taskaa, setTaska] = useState({
        title:'',
        description:''
    })
    const [press, setPress] = useState(false)
    const router = useRouter()

    const add_Task = async (e) => {
        setPress(true)
        e.preventDefault()
        if (taskaa.title!=='' && taskaa.description!=='') {
            const res = await fetch(`/api/task`, {
                method: 'POST',
                headers: {
                    'Type-Content': 'application/json'
                },
                body: JSON.stringify(taskaa)
            })
            if (!res.ok) throw new Error('Something went wrong')
            router.push('/task')
        }
    }

    return (
        <form className={classes.form} onSubmit={add_Task}>
            {
                taskaa.title!=='' && taskaa.description!=='' ? '' :press? <span className={classes.error}>enter all spaces</span>:''
            }
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' id='title'
                    onChange={e => setTaska({ ...taskaa, title: e.target.value })}
                    value={taskaa.title}
                />
                <label htmlFor="description">Description</label>
                <input type="text" name='description' id='description'
                    onChange={e => setTaska({ ...taskaa, description: e.target.value })}
                    value={taskaa.description}
                />
            </div>

            <div>
                <button>Add Task</button>
            </div>
        </form>
    )
}

export default AddTask