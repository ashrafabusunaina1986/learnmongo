import React from 'react'
import classes from './header.module.css'
import Link from 'next/link'

function Header({title,send,href}) {
  return (
    <header className={classes.header}>
        <p>{title}</p>
        <Link href={href}>{send}</Link>
    </header>
  )
}

export default Header