import React, { useEffect } from 'react'
import classes from './tasks_list.module.css'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from 'next/navigation';



function Tasks_List({ tasks, isLoading, setTasks, setIsLoading }) {
    const router = useRouter()

    const getTasks = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/task`)
        if (!res.ok) throw new Error("Something went wrong")
        return await res.json()
    }

    const taskDelete = async id => {
        const confirm = window.confirm("Are you sure")
        if (confirm) {
            const res = await fetch(`/api/task?id=${id}`, {
                method: "DELETE"
            })
            if (!res.ok) throw new Error('Something went wrong')
            getTasks()
                .then(r => {
                    console.log(r)
                    setTasks(r)
                    setIsLoading(false)
                }).catch(e => console.log(e))
        }
    }

    const taskUpdate = async id => {
        router.push(`/task/${id}`)
    }

    return (
        <div className={classes.list}>
            {
                !isLoading ? tasks.map(task => {
                    return <div className={classes.task} key={task._id}>
                        <div>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                        </div>
                        <div className={classes.icons}>
                            <div className={classes.icon}
                                onClick={() => taskDelete(task._id)}
                            ><MdDelete /></div>
                            <div className={classes.icon}
                                onClick={() => taskUpdate(task._id)}
                            ><CiEdit /></div>
                        </div>
                    </div>
                }) : <div className={classes.load} >Loading...</div>
            }
        </div>
    )
}

export default Tasks_List