import React, { useState } from 'react'
import { useUsers } from '../contexts/UsersContext'
import "../components/AdminUserCard.css"

export const AdminUserCard = ({user}) => {
    const {deleteUser,updateUser} = useUsers();
    const [isEditing, setIsEditing] = useState(false);
    const [userForm, setUserForm] = useState({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role
    });

    const handleChange = (e)=>{
        const{name, value} = e.target
        setUserForm(prev=>({...prev,[name]:value}))
    }
    const handleEdit= ()=>setIsEditing(true);

    const handleCancel = () => {
    setUserForm({ role: user.role });
    setIsEditing(false);
    };

    const handleSave = (e) => {
    e.preventDefault();
    updateUser(
        user.id,
        userForm.name,
        userForm.lastName,
        userForm.email,
        userForm.password,
        userForm.role);
    setIsEditing(false);
    };

    const handleDelete = () => {
    deleteUser(user.id);
    };

  return (
    <div className='userCardContainer'>
        <form>
        <div>
          <strong>Nombre:</strong> {user.name}
        </div>
        <div>
          <strong>Apellido:</strong> {user.lastName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <label htmlFor="role"><strong>Rol:</strong></label>
          {isEditing ? (
            <select
              id="role"
              name="role"
              value={userForm.role}
              onChange={handleChange}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          ) : (
            <span> {user.role}</span>
          )}
        </div>

        {isEditing ? (
          <>
            <button type="button" onClick={handleSave}>Guardar</button>
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleEdit}>
                Editar rol
            </button>
            <button type="button" onClick={handleDelete}>
              Eliminar
            </button>
          </>
        )}
      </form>
    </div>
  )
}
