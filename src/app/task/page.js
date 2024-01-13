'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Tasks_List from '@/components/Tasks_List'
import classes from './page.module.css'

function Tasks() {
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const getTasks = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/task`)
        if (!res.ok) throw new Error("Something went wrong")
        return await res.json()
    }
    
    useEffect(() => {
        getTasks()
            .then(r => {
                console.log(r)
                setTasks(r)
                setIsLoading(false)
            }).catch(e => console.log(e))
        
    }, [])
    return (
        <div className={classes.task}>
            <Header send='Add Task' title='Tasks' href={`/task/addtask`} />
            <Tasks_List tasks={tasks} isLoading={isLoading} setTasks={setTasks} setIsLoading={setIsLoading} />
        </div>
    )
}

export default Tasks