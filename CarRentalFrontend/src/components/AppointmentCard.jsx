import { useEffect, useState } from 'react';
import { useCars } from '../contexts/CarsContext';
import "../components/AppointmentCard.css"
import { useAppointments } from '../contexts/AppointmentContext';

export const AppointmentCard = ({appointment, refetchAppointments}) => {
  const {getCarsById} = useCars();
  const {updateAppointment} = useAppointments();
  const [car,setCar] = useState([])
  const [isCanceling,setIsCanceling] = useState(false)

  const fetchCar = async () => {
  const carFound = await getCarsById(appointment.carId);
  setCar(carFound);
   };
  useEffect(() => {
     
     fetchCar();
}, []);
  
const calcularDias = (fechaInicio, fechaFin) => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  inicio.setHours(0, 0, 0, 0);
  fin.setHours(0, 0, 0, 0);

  const diferenciaEnMs = fin - inicio;
  const dias = diferenciaEnMs / (1000 * 60 * 60 * 24);

  return dias;
};

const cancelarReserva=async()=>{
  await updateAppointment(
    appointment.id,
    appointment.startDate,
    appointment.endDate,
    appointment.carId,
    appointment.userId,
    "CANCELADO"
  )
  refetchAppointments();
}



  return (
    <div className='AppointmentCard'>
       <div className='appointmentCardImgContainer'>
        <img src={car.mainImgUrl} alt={car.id} />
       </div>
      <div className='appointmentCardInfoContainer'>

        <h3>{car.model}</h3>

        <p>Dia de retiro: <strong>{new Date(appointment.startDate).toLocaleDateString("es-AR")}</strong></p>

        <p>Dia de devolucion: <strong>{new Date(appointment.endDate).toLocaleDateString("es-AR")}</strong></p>

        <p>Precio total: <strong>{
          new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
          }).format(car.priceADay*calcularDias(appointment.startDate,appointment.endDate))
        }</strong>
        </p>

        <p>Estado de la reserva: <strong>{appointment.status}</strong></p>
        {appointment.status!=="CANCELADO"&&(<button className='AppointmentCardCancelButton' onClick={()=>{setIsCanceling(true)}}>Cancelar reserva</button>)}
        
        {isCanceling&&
        (<div className='appointmentCardWantsToCancel'>

          <div className='appointmentCardWantsToCancelContainer'>

            <p>¿Seguro que quieres cancelar tu reserva?</p>

            <div>
              <button style={{ color: 'white', backgroundColor: 'red', fontWeight: '600' }} onClick={()=>{setIsCanceling(false);cancelarReserva()}}>Cancelar reserva</button>
              <button onClick={()=>{setIsCanceling(false)}}>Volver atrás</button>
            </div>

            
          </div>

        </div>)}


      </div>
    </div>
  )
}
