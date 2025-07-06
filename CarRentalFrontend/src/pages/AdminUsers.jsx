import React, { useEffect, useState } from 'react'
import { useUsers } from '../contexts/UsersContext'
import { AdminUserCard } from '../components/AdminUserCard';
import { useAuth } from '../contexts/AuthContext';
import "../styles/AdminUsers.css"

export const AdminUsers = () => {
  const {users, getUsers, saveUser} = useUsers();
const{user, token} = useAuth();


   useEffect(() => {
  if (token) {
    getUsers();
  }
}, [token]);



  return (
    <>
    <div className='adminUsersContainer'>
      <h2>Administrar Usuarios registrados</h2>
      {/* ADMINISTRAR CADA USER  */}
            <div className='usersContainer'>
                  {users.map(user =>(
                    <AdminUserCard key={user.id} user={user}/>
                  ))}
            </div>
    </div>
    <div className='adminMobile'>
        <h3>No se puede ver el panel de admin desde un celular</h3>
    </div>
    </>
  )
}
