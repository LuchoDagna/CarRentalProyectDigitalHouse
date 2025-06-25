import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "../styles/Login.css"


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      alert("Por favor ingresa email y contraseña")
      return;
    }
    try{
      await login(email, password);
      navigate("/")
    } catch(error){
      alert("Email o contraseña incorrectos")
    }
  }
  return (
    <div className='LoginPageContainer'>
      <form className='loginContainer' onSubmit={handleSubmit}>
        <h2>Iniciar Sesion</h2>
        <input 
        type="email"
        placeholder='Email'
        value={email} 
        onChange={e=> setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Ingresar</button>
      </form>

    </div>
  );
}
