import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/logo.png"
import menu from "../assets/menu.png"
import cruz from "../assets/cruzBlanca.png"

export const NavBarComponent = () => {

  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const {isAuthenticated, isAdmin,logout} = useAuth()
  const [isOnMobile, setIsOnMobile] = useState(false);
  const [seeMenu, setSeeMenu] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 900;
      setIsOnMobile(isMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
  
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSeeMenu= ()=>{
    setSeeMenu(!seeMenu)
  }

  const toggleAdminMenu = ()=>{
      setShowAdminMenu(!showAdminMenu)
  }

  return (
    <div className='navBar'>
        <img 
          onClick={() => navigate('/')}
          src={logo} alt="logo"/>
        <ul className='navBarOptions'>
          {isAuthenticated ? (
            <>
          
          
          <li><Link to='/'>Home</Link></li>
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
          <li><Link to='/my-appointments'>Mis reservas</Link></li>
          <li><button onClick={logout}>Logout</button></li>
          <menu onClick={toggleSeeMenu}><img className='menu' src={menu} alt="menu" /></menu>
          </>
          ): (isOnMobile?
            <>
            <ul><Link to='/login'>Login</Link></ul>
            <ul><Link to='/register'>Registrarse</Link></ul>
            </>:
            <>
            <li><Link to='/'>Inicio</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Registrarse</Link></li>
            </>

          )}
        </ul>

          {/* MENU PARA MOBILE */}

        <ul className='navBarOptionsMobile' style={!seeMenu?{display:"none"}:null}>
          <li onClick={toggleSeeMenu} className='goBackBtn'><img src={cruz} alt="" /></li>
          {seeMenu&&(
              isAuthenticated ? (
              <>
            
            
            <li onClick={toggleSeeMenu}><Link to='/'>Home</Link></li>
            {isAdmin && (
              
              <li style={{position: 'relative'}}>
                <li onClick={toggleAdminMenu}>Administrar</li>
                {showAdminMenu && (
                  <ul className='adminMenu'>
                    <li onClick={()=>{toggleAdminMenu(); toggleSeeMenu()}}><Link to='/admin/cars'>Autos</Link></li>
                    <li onClick={()=>{toggleAdminMenu(); toggleSeeMenu()}}><Link to='/admin/users'>Usuarios</Link></li>
                    <li onClick={()=>{toggleAdminMenu(); toggleSeeMenu()}}><Link to='/admin/appointments'>Reservas</Link></li>
                  </ul>
                )}
              </li>
            )}
            <li onClick={toggleSeeMenu}><Link to='/my-appointments'>Mis reservas</Link></li>
            <li onClick={()=>{logout();toggleSeeMenu()}}>Logout</li>
            </>
            ): (isOnMobile?
              <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Registrarse</Link></li>
              </>:
              <>
              <li><Link to='/'>Inicio</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Registrarse</Link></li>
              </>

            )
          )}
          
        </ul>
    </div>
  )
}
export default NavBarComponent