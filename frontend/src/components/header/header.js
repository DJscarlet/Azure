import React, { useState } from 'react'
import './header.css'
import {Link, NavLink,useHistory} from 'react-router-dom'
import { useGlobalContext } from '../../contexts/global'

function Header(props) {
  const {handleSubmit,handleChange,search,handleMenu}=useGlobalContext();
  return (
    <div className='header'>
      <div className='Search_bar'>
          <div className='menu'>
          <button onClick={handleMenu}><i className='bx bx-menu'></i></button>
          </div>
          <form>
            <div className='search center'>
                <button onClick={handleSubmit} className='center'><Link to={`/search`}><i className='bx bx-search-alt-2'></i></Link></button>
                <input type="search" placeholder="search anime" value={props.search} onChange={handleChange}/>
            </div>
          </form>
          <div className='multi-media'>
              <a className='mm-component'>
                  <div className='icon'><i className='bx bxl-facebook-square'></i></div>
                  <div className='mm-name'>facebook</div>
              </a>
              <a className='mm-component'>
                  <div className='icon'><i className='bx bxl-discord'></i></div>
                  <div className='mm-name'>discord</div>
              </a>
              <a className='mm-component'>
                  <div className='icon'><i className='bx bxl-telegram'></i></div>
                  <div className='mm-name'>telegram</div>
              </a>
          </div>
          <div className='user_details'>
            <NavLink className='user_details' to="/">
              <p>Dj.Scarlet</p>
              <img src='https://wallpx.com/thumb/2020/12/shinobu-kocho-butterfly-demon-slayer-kimetsu-no-yaiba-water-clouds-ripples-728.jpg' alt='user' className='user_profile'></img>
            </NavLink>
          </div>
      </div>
    </div>
  )
}

export default Header