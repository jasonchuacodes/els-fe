import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

function Home() {
  return (
    <div>
      <Navbar />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Home