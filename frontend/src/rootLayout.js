import React from 'react'
import Header from './components/header/header'
import Menu from './components/menu/menu'
import { useGlobalContext } from './contexts/global'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  const {isMenu}=useGlobalContext()
  return (
    <div>
        {
          isMenu?<Menu />:null
        }
        <Header />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default RootLayout