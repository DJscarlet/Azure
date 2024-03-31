import React from 'react'
import './menu.css'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../../contexts/global'

function Menu() {
  const {handleMenu}=useGlobalContext();
  return (
    <div className='menu_content'>
      <button className='close'>
        <div className='close_icon'><i class='bx bx-chevron-left'></i></div>
        <div className='close_name' onClick={handleMenu}>Close Menu</div>
      </button>
      <div className='menu_elements'>
        <div className='menu_elements_componet'>
          <NavLink to='/'>
            <div className='icon'><i className='bx bxl-discord'></i></div>
            <h1 onClick={handleMenu}>Discord</h1>
          </NavLink>
        </div>
        <div className='menu_elements_componet'>
          <NavLink to='/home'>
            <div className='icon'><i className='bx bxl-telegram'></i></div>
            <h1 onClick={handleMenu}>Telegram</h1>
          </NavLink>
        </div>
        <div className='menu_elements_componet'>
          <NavLink to='/home'>
            <div className='icon'><i className='bx bxl-facebook-square'></i></div>
            <h1 onClick={handleMenu}>Facebook</h1>
          </NavLink>
        </div>
        <div className='menu_elements_componet'>
          <NavLink to='/home'>
            <h1 onClick={handleMenu}>Home</h1>
          </NavLink>
        </div>
        <div className='menu_elements_componet'>
          <NavLink to='/popular'>
            <h1 onClick={handleMenu}>Popular</h1>
          </NavLink>
        </div>
        <div className='menu_elements_componet'>
          <h1 onClick={() => {alert('Logged out')}}>Logout</h1>
        </div>
      </div>
    </div>
  )
}

export default Menu