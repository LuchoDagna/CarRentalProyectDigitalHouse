import { useAppointments } from '../contexts/AppointmentContext'
import { useAuth } from '../contexts/AuthContext';
import { AppointmentCard } from '../components/AppointmentCard';
import { useEffect, useState } from 'react';
import "../styles/MyAppointments.css"

export const MyAppointments = () => {
  const {user} = useAuth();
  const {getByIdAppointments} = useAppointments(); 
  const [appointments, setAppointments] = useState([])

  const getAppointmentsById = async ()=>{
    const data = await getByIdAppointments(user.id);
    setAppointments(data);
  }
 useEffect(() => {
    if (user) {
      getAppointmentsById();
    }
  }, [user]);

  return (
    <div className='myAppointmentsContainer'>
      <div className='fondoMyAppointments'>
        Tus <br />reservas
      </div>
        <div className='appointmentContainer'>
            {appointments.length===0 ? (
              <p className='sinReservas'>Todavia no tienes reservas</p>
            ) : (
              appointments.slice().reverse().map(app => (
                <AppointmentCard key={app.id} appointment={app} refetchAppointments={getAppointmentsById} />
              ))
            )}
        </div>
    </div>
  )
}
