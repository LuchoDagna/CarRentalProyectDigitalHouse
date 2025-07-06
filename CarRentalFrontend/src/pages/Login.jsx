import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "../styles/Login.css"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
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
    
    // Resetear errores previos
    setErrors({});
    
    // Validar campos
    const newErrors = {};
    if (!email) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(email)) {
      newErrors.email = "El email debe tener un formato válido";
    }
    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      // Mostrar error específico basado en el tipo de error
      if (error.response && error.response.status === 401) {
        setErrors({ login: "Email o contraseña incorrectos" });
      } else {
        setErrors({ login: "Error al iniciar sesión. Intente nuevamente." });
      }
    }
  };

  return (
    <div className='LoginPageContainer'>
      <form className='loginContainer' onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        
        {/* Mensaje de error general */}
        {errors.login && <div className="error-message-general">{errors.login}</div>}
        
        <div className="input-group">
          <input 
            type="email"
            placeholder='Email'
            value={email} 
            onChange={e => {
              setEmail(e.target.value);
              if (errors.email) {
                const newErrors = {...errors};
                delete newErrors.email;
                setErrors(newErrors);
              }
            }}
            onBlur={handleBlurEmail}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              if (errors.password) {
                const newErrors = {...errors};
                delete newErrors.password;
                setErrors(newErrors);
              }
            }}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        
        <button type='submit'>Ingresar</button>
      </form>
    </div>
  );
}