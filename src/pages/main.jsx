import React from 'react'
import { Outlet } from 'react-router'

export default function Main() {
  return (
    <div>
      Main...
      <Outlet />
    </div>
  )
}
