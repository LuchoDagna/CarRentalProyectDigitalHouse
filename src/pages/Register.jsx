import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
import "../styles/Register.css"

export const Register = () => {
  const {register} = useAuth();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!name || !lastName || !email || !password){
      alert("Completa todos los campos para registrarte")
      return
    }
    try{
      await register(name, lastName, email, password)
      navigate("/")
    }
    catch{
      alert("No se pudo registrar el usuario")
    }
    console.log(name,lastName)
  }


  return (
   <div className='registerContainer'>
    <form className='registerFormContainer' onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
        <input type="name"  placeholder='Nombre' value={name} onChange={e=> setName(e.target.value)} />
        <input type="lastName"  placeholder='Apellido' value={lastName} onChange={e=> setLastName(e.target.value)} />
        <input type="email"  placeholder='Email' value={email} onChange={e=> setEmail(e.target.value)} />
        <input type="password"  placeholder='Contraseña' value={password} onChange={e=> setPassword(e.target.value)} />
        <button type='submit'>Registrarse</button>
    </form>
   </div>
  )
}
