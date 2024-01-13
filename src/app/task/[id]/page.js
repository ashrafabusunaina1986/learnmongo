'use client'
import React, { useEffect, useState } from 'react'
import classes from './page.module.css'
import { useParams, useRouter } from 'next/navigation'


function TaskEdit() {
  const [task, setTask] = useState({ _title: '', _description: '' })
  const [press, setPress] = useState(false)
  const router = useRouter()
  const { id } = useParams()

  const edit_task = async e => {
    setPress(true)
    e.preventDefault()
    if (task._title !== '' && task._description !== '') {
      const res = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: {
          'Type-Content': 'application/json'
        },
        body: JSON.stringify(task)
      })
      if (!res.ok) throw new Error('Something went wrong')
      router.push('/task')
    }
  }
  const getTask = async () => {
    const res = await fetch(`/api/task/${id}`)
    if (!res.ok) throw new Error("Something went wrong")
    return await res.json()
  }
  useEffect(() => {
    getTask().then(r => {
      console.log(r)
      setTask({
        _title:r.title,
        _description:r.description
      })
    }).catch(e => {
      console.log(e)
    })
  }, [])
  return (
    <form className={classes.form} onSubmit={edit_task}>
      {
        task._title !== '' && task._description !== '' ? '' : press ? <span className={classes.error}>enter all spaces</span> : ''
      }
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' id='title'
          onChange={e => setTask({ ...task, _title: e.target.value })}
          value={task._title}
        />
        <label htmlFor="description">Description</label>
        <input type="text" name='description' id='description'
          onChange={e => setTask({ ...task, _description: e.target.value })}
          value={task._description}
        />
      </div>

      <div>
        <button>Edit Task</button>
      </div>
    </form>
  )
}

export default TaskEdit