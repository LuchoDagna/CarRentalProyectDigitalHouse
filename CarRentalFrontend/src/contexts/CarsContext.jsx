import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
    const {user, token} = useAuth();
    const [cars, setCars] = useState([]);
    const [carToFind, setCarToFind] = useState([]);
    
  // FINDALL AUTOS

    const getCars = async ()=>{
        try{
          const response = await fetch("http://localhost:8080/cars/findAll", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }})
            if(!response.ok){
              throw new Error("Ha ocurrido un error al llamar a los cars")
            }
            const data = await response.json();
            setCars(data)
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
    }

    useEffect(() => {
      getCars()
    }, [])

// ENCONTRAR AUTO POR ID

    const getCarsById = async (id)=>{
        try{
          const response = await fetch(`http://localhost:8080/cars/findById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }})
            if(!response.ok){
              throw new Error("Ha ocurrido un error al llamar a los cars")
            }
            const data = await response.json();
            setCarToFind(data)
            return data;
        }
        catch(error){
          console.log("Error en el fetch: " + error);
          throw error;
        }
    }

    useEffect(() => {
      getCars()
    }, [])

    // GUARDAR AUTO

    const saveCar = async(model,year,priceADay,doors,transmition,mainImgUrl,available,carCategoryId) =>{
      if(user?.role !== "ADMIN"){
        console.log("No es admin para ejecutar este fetch")
        return
      }
       try{ const response = await fetch("http://localhost:8080/cars/save",{
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            model,
            year,
            priceADay,
            doors,
            transmition,
            mainImgUrl,
            available,
            carCategoryId
          })
        })
        if (response.ok) {
          console.log("Auto guardado exitosamente");
        } else {
          const errorText = await response.text(); 
          console.error("Error al guardar el auto:", errorText);
        }
      }
      catch(error){
        console.log("Error en el fetch: " + error);
          throw error;
      }
    }


    // BORRAR AUTO

    const deleteCar = async (id) => {
      if(user?.role !== "ADMIN"){
        console.log("No es admin para ejecutar este fetch")
        return
      }
      try{
        const response = await fetch(`http://localhost:8080/cars/delete/${id}`,{
          method:"DELETE",
          headers:{
            'Authorization': `Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        if(response.ok){
          console.log("Auto eliminado")
        }else{
          console.log("Auto no se pudo eliminar")
        }
      }catch(error){
        console.log("Error en el fetch: " + error);
          throw error;
      }
    }

    // ACTUALIZAR AUTO

    const updateCar=async(id,model,year,priceADay,doors,transmition,mainImgUrl,available,carCategoryId)=>{
      if(user?.role !== "ADMIN"){
        console.log("No es admin para ejecutar este fetch")
        return
      }
      try{
        console.log("ID enviado:", id);
        const response =await fetch(`http://localhost:8080/cars/update`,{
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            id,
            model,
            year,
            priceADay,
            doors,
            transmition,
            mainImgUrl,
            available,
            carCategoryId
          })
        })
        if (response.ok) {
          console.log("Auto actualizado exitosamente");
        } else {
          const errorText = await response.text(); 
          console.error("Error al actualizar el auto:", errorText);
        }
      }catch(error){
        console.log("Error en el fetch: " + error);
          throw error;
      }
      }
    
    
    return (
      <CarsContext.Provider
      value={{cars, getCars, deleteCar, saveCar, updateCar, carToFind, getCarsById}}>
          {children}
      </CarsContext.Provider>
    )
    
    }

export const useCars = () => useContext(CarsContext);
  

