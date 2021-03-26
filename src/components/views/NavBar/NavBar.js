import React from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'
import { FiMenu } from 'react-icons/fi'
import './Sections/Navbar.css'
import Logo from '../../../assets/images/HappyTubeLogo.png'

function NavBar() {
  return (
    <nav
      className='menu'
      style={{ position: 'fixed', zIndex: 1, width: '100%' }}
    >
      <FiMenu className='humburgermenu' />
      <div className='menu__logo'>
        <a href='/'>
          <img
            src={Logo}
            alt='Logo'
            style={{ width: '100%', marginTop: '-5px' }}
          />
        </a>
      </div>
      <div className='menu__container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
