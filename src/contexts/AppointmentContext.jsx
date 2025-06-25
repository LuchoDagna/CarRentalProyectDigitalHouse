import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const AppointmentContext = createContext()

export const AppointmentProvider = ({ children }) => {
    const {user, token} = useAuth();
    const [appointments, setAppointments] = useState([])
    const [appointmentToFind, setAppointmentToFind] = useState([])



    const getAppointments = async ()=>{
        try{
          const response = await fetch("http://localhost:8080/appointments/findAll", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }})
            if(!response.ok){
              throw new Error("Ha ocurrido un error al llamar a los appointments")
            }
            const data = await response.json();
            setAppointments(data);
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
    }
    useEffect(() => {
  if (token) {
    getAppointments();
  }
}, [token]);

    const getByIdAppointments = async (id)=>{
        try{
          const response = await fetch(`http://localhost:8080/appointments/findByUserId/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type":"application/json"
            }})
            if(!response.ok){
              throw new Error("Ha ocurrido un error al llamar a los appointments")
            }
            const data = await response.json();
            setAppointmentToFind(data)
            // console.log(data,appointmentToFind)
            return data
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
    }

    const saveAppointment = async (startDate,endDate,carId,userId,status)=>{
        if(user?.role === null){
            console.log("No eres usuario para ejecutar este fetch")
            return
          }
        try{
          const response = await fetch("http://localhost:8080/appointments/save", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                startDate,
                endDate,
                carId,
                userId,
                status
              })
        })
            if(!response.ok){
              throw new Error("Ha ocurrido un error al guardar el appointment")
            }
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
        console.log("Guardado")
    }

    const deleteAppointment = async (id)=>{
        if(user?.role !== "ADMIN"){
            console.log("No es admin para ejecutar este fetch")
            return
          }
        try{
          const response = await fetch(`http://localhost:8080/appointments/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        })
            if(response.ok){
                    console.log("Usuario actualizado")
                    await getAppointments();
              }
            if(!response.ok){
              throw new Error("Ha ocurrido un error al eliminar el appointment")
            }
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
    }


    const updateAppointment = async (id,startDate,endDate,carId,userId,status)=>{
        try{
          const response = await fetch(`http://localhost:8080/appointments/update`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id,
                startDate,
                endDate,
                carId,
                userId,
                status
              })
        })
            if(response.ok){
                    console.log("Usuario actualizado")
                    await getAppointments();
                }
            if(!response.ok){
              throw new Error("Ha ocurrido un error al actualizar el appointment")
            }
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
    }
    const findByCarId= async (id)=>{
      try{
        const response = await fetch(`http://localhost:8080/appointments/findByCarId/${id}`, {
          method: "GET",
          headers: {
              "Content-Type":"application/json"
          }})
          if(!response.ok){
            throw new Error("Ha ocurrido un error al llamar a los appointments")
          }
          const data = await response.json();
          setAppointmentToFind(data)
          return data; 
      }
      catch(error){
        console.log("Error en el fetch: " + error);
        throw error;
      }
    }


  return (
    <AppointmentContext.Provider value={{appointments,appointmentToFind,getAppointments,getByIdAppointments,deleteAppointment,saveAppointment,updateAppointment,findByCarId}}>
        {children}
    </AppointmentContext.Provider>
  )
}
export const useAppointments = () => useContext(AppointmentContext);