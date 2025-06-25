import React from 'react'
import "../components/Footer.css"

export const Footer = () => {
  return (
    <footer>
      <div>
    <h3>Viaj.ar</h3>
    <p>Alquiler de autos fácil, rápido y seguro.</p>
  </div>

  <div>
    <h4>Navegación</h4>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/login">Iniciar sesión</a></li>
      <li><a href="/register">Registrarse</a></li>
    </ul>
  </div>

  <div>
    <h4>Seguinos</h4>
    <ul>
      <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
      <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
      <li><a href="https://www.twitter.com/" target="_blank">Twitter</a></li>
      <li><a href="https://www.youtube.com/" target="_blank">YouTube</a></li>
    </ul>
  </div>

  <div>
    <h4>Contacto</h4>
    <p>Email: contacto@viaj.ar</p>
    <p>Teléfono: +54 9 223 123-4567</p>
  </div>

  <div>
    <p>&copy; 2025 Viaj.ar - Todos los derechos reservados.</p>
  </div>

    </footer>
  )
}
