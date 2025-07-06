import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css"

export const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Función para validar el formato del email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBlurEmail = () => {
    if (email && !validateEmail(email)) {
      setErrors({...errors, email: "El email debe tener un formato válido (ej: usuario@dominio.com)"});
    } else {
      const newErrors = {...errors};
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos vacíos
    const newErrors = {};
    if (!name) newErrors.name = "El nombre es obligatorio";
    if (!lastName) newErrors.lastName = "El apellido es obligatorio";
    if (!email) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(email)) {
      newErrors.email = "El email debe tener un formato válido";
    }
    if (!password) newErrors.password = "La contraseña es obligatoria";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(name, lastName, email, password);
      navigate("/");
    } catch {
      alert("No se pudo registrar el usuario");
    }
  };

  return (
    <div className='registerContainer'>
      <form className='registerFormContainer' onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        
        <div className="input-group">
          <input 
            type="text" 
            placeholder='Nombre' 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className="input-group">
          <input 
            type="text" 
            placeholder='Apellido' 
            value={lastName} 
            onChange={e => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
        
        <div className="input-group">
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={e => {
              setEmail(e.target.value);
              // Limpiar error mientras escribe
              if (errors.email) {
                const newErrors = {...errors};
                delete newErrors.email;
                setErrors(newErrors);
              }
            }}
            onBlur={handleBlurEmail}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="input-group">
          <input 
            type="password" 
            placeholder='Contraseña' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        
        <button type='submit'>Registrarse</button>
      </form>
    </div>
  )
}