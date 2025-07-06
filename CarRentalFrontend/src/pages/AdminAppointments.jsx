import React, { useEffect } from 'react'
import { useAppointments } from '../contexts/AppointmentContext'
import { AdminAppointmentsCard } from '../components/AdminAppointmentsCard';
import "../styles/AdminAppointments.css"

export const AdminAppointments = () => {

  const {appointments,getAppointments} = useAppointments();
  useEffect(() => {
    getAppointments()
    return
  }, [])
  
  return (
    <>
    <div className='AdminAppointmentsContainer'>
      <h2>Lista de Reservas</h2>
      <div className='AppointmentsContainer'>
        {appointments.map(app =>(
          <AdminAppointmentsCard key={app.id} app={app}/>
        ))}
      </div>
    </div>
    <div className='adminMobile'>
        <h3>No se puede ver el panel de admin desde un celular</h3>
    </div>
    
    </>
  )
}
