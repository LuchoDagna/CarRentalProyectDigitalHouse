import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext';

const CarImgsContext = createContext();

export const CarImgsProvider = ({children}) => {
  const {user, token} = useAuth();
      const [images, setImages] = useState([]);
      const [imagesById, setImagesById] = useState([]);
     
       // FINDALL IMAGENES
     
         const getImages = async ()=>{
             try{
               const response = await fetch("http://localhost:8080/imgs/findAll", {
                 method: "GET",
                 headers: {
                        "Content-Type":"application/json"
                 }})
                 if(!response.ok){
                   throw new Error("Ha ocurrido un error al llamar a las imagenes")
                 }
                 const data = await response.json();
                 setImages(data)
             }
             catch(error){
               console.log("Error en el fetch: " + error);
               throw error;
             }
         }
     
     
         // GUARDAR IMAGENES
     
         const saveImage = async(url, carId) =>{
           if(user?.role !== "ADMIN"){
             console.log("No es admin para ejecutar este fetch")
             return
           }
            try{ const response = await fetch("http://localhost:8080/imgs/save",{
               method: "POST",
               headers: {
                 'Authorization': `Bearer ${token}`,
                 "Content-Type":"application/json"
               },
               body: JSON.stringify({url,carId})
             })
             if (response.ok) {
               console.log("Imagen guardada exitosamente");
             } else {
               console.error("Error al guardar la imagen");
             }
           }
           catch(error){
             console.log("Error en el fetch: " + error);
               throw error;
           }
         }
     
     
         // BORRAR IMAGEN
     
         const deleteImage = async (id) => {
           if(user?.role !== "ADMIN"){
             console.log("No es admin para ejecutar este fetch")
             return
           }
           try{
             const response = await fetch(`http://localhost:8080/imgs/delete/${id}`,{
               method:"DELETE",
               headers:{
                 'Authorization': `Bearer ${token}`,
                 "Content-Type":"application/json"
               }
             })
             if(response.ok){
               console.log("Imagen eliminada")
             }else{
               console.log("Imagen no se pudo eliminar")
             }
           }catch(error){
             console.log("Error en el fetch: " + error);
               throw error;
           }
         }

         const getImagesById = async (id) => {
           try{
             const response = await fetch(`http://localhost:8080/imgs/findByCarId/${id}`,{
               method:"GET",
               headers:{
                 "Content-Type":"application/json"
               }
             })
             if(response.ok){
               console.log("Imagenes conseguidas")
               const data = await response.json();
                 setImagesById(data)
             }else{
               console.log("Imagenes no se pudieron encontrar")
             }
           }catch(error){
             console.log("Error en el fetch: " + error);
               throw error;
           }
         }


             
         return (
           <CarImgsContext.Provider
           value={{images,imagesById,getImages,saveImage,deleteImage,getImagesById}}>
               {children}
           </CarImgsContext.Provider>
         )
}
export const useImgs = () => useContext(CarImgsContext);