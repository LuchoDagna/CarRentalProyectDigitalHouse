import React, { useEffect, useState } from 'react'
import { useAppointments } from '../contexts/AppointmentContext'
import "../components/AdminAppointmentsCard.css"
import { useCars } from '../contexts/CarsContext';

export const AdminAppointmentsCard = ({app}) => {
    const {updateAppointment, deleteAppointment} = useAppointments();
    const {carToFind, getCarsById} = useCars();
    const [isEditing, setIsEditing] = useState(false);
    const [car, setCar] = useState({
          model: "",
          year: "",
          priceADay: "",
          doors: "",
          transmition: "",
          mainImgUrl: "",
          available: "",
          categoryId: ""
        });
    const [appForm, setAppForm] = useState({
        startDate:app.startDate,
        endDate:app.endDate,
        carId:app.carId,
        userId:app.userId,
        status: app.status
    });

   useEffect(() => {
  const fetchCar = async () => {
    const carFound = await getCarsById(app.carId);
    setCar(carFound);
  };

  fetchCar();
}, []);
    
    const findCar =  ()=>{
        const car = carToFind
        setCar(car)
    }


    const handleChange = (e)=>{
        const{name, value} = e.target
        setAppForm(prev=>({...prev,[name]:value}))
    }
    const handleEdit= ()=>setIsEditing(true);

    const handleDelete = () => {
    deleteAppointment(app.id);
    };

    const handleSave = (e) => {
    e.preventDefault();
    updateAppointment(
        app.id,
        new Date(appForm.startDate).toISOString(),
        new Date(appForm.endDate).toISOString(),
        parseInt(appForm.carId),
        parseInt(appForm.userId),
        appForm.status
    );
    setIsEditing(false);
    };


  return (
    <div className='appointmentCardContainer'>
        <form className='appointmentCardContainerForm'>
            <div><strong>Fecha de inicio: </strong>{new Date(app.startDate).toLocaleDateString("es-AR")}</div>
            <div><strong>Fecha de finalizacion: </strong>{new Date(app.endDate).toLocaleDateString("es-AR")}</div>
            <div><strong>Auto: </strong>{car.model}</div>
            <div><strong>Usuario: </strong>{app.userId}</div>
            <div>
                <label htmlFor="status"><strong>Estado: </strong></label>
                {isEditing ? (
                    <select
                    id="status"
                    name="status"
                    value={appForm.status}
                    onChange={handleChange}
                    >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="EN CURSO">EN CURSO</option>
                    <option value="TERMINADO">TERMINADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                    </select>
                ) : (
                    <span> {app.status}</span>
                )}</div>
                <div>
                {isEditing ? (
                    <>
                        <button type="button" onClick={handleSave}>Guardar</button>
                    </>
                    ) : (
                    <>
                        <button type="button" onClick={handleEdit}>
                            Editar
                        </button>
                        <button type="button" onClick={handleDelete}>
                        Eliminar
                        </button>
                    </>
                )}
            </div>
        </form>
    </div>
  )
}
