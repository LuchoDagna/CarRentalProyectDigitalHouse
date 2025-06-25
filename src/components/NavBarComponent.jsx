import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/logo.png"

export const NavBarComponent = () => {

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const {isAuthenticated, isAdmin,logout} = useAuth()
  

  const toggleAdminMenu = ()=>{
      setShowAdminMenu(!showAdminMenu)
  }

  return (
    <div className='navBar'>
        <img src={logo} alt="logo"/>
        <ul className='navBarOptions'>
          {isAuthenticated ? (
            <>
          
          {isAdmin && (
            
            <li style={{position: 'relative'}}>
              <button onClick={toggleAdminMenu}>Administrar</button>
              {showAdminMenu && (
                <ul className='adminMenu'>
                  <li onClick={toggleAdminMenu}><Link to='/admin/cars'>Autos</Link></li>
                  <li onClick={toggleAdminMenu}><Link to='/admin/users'>Usuarios</Link></li>
                  <li onClick={toggleAdminMenu}><Link to='/admin/appointments'>Reservas</Link></li>
                </ul>
              )}
            </li>
          )}
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/my-appointments'>Mis reservas</Link></li>
          <li><button onClick={logout}>Logout</button></li>
          </>
          ): (
            <>
            <li><Link to='/'>Inicio</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Registrarse</Link></li>
            </>

          )}
        </ul>
    </div>
  )
}
export default NavBarComponent