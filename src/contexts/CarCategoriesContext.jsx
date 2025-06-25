import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext';

const CarCategoriesContext = createContext()

export const CarCategoriesProvider = ({ children }) => {
    const {user, token} = useAuth();
    const [categories, setCategories] = useState([]);
   
     // FINDALL CATEGORIAS
   
       const getCategories = async ()=>{
           try{
             const response = await fetch("http://localhost:8080/categories/findAll", {
               method: "GET",
               headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json"
               }})
               if(!response.ok){
                 throw new Error("Ha ocurrido un error al llamar a las categories")
               }
               const data = await response.json();
               setCategories(data)
           }
           catch(error){
             console.log("Error en el fetch: " + error);
             throw error;
           }
       }
   
   
       // GUARDAR CATEGORIA
   
       const saveCategory = async(name) =>{
         if(user?.role !== "ADMIN"){
           console.log("No es admin para ejecutar este fetch")
           return
         }
          try{ const response = await fetch("http://localhost:8080/categories/save",{
             method: "POST",
             headers: {
               'Authorization': `Bearer ${token}`,
               "Content-Type":"application/json"
             },
             body: JSON.stringify({name})
           })
           if (response.ok) {
             console.log("Categoria guardada exitosamente");
           } else {
             console.error("Error al guardar la categoria");
           }
         }
         catch(error){
           console.log("Error en el fetch: " + error);
             throw error;
         }
       }
   
   
       // BORRAR CATEGORIA
   
       const deleteCategory = async (id) => {
         if(user?.role !== "ADMIN"){
           console.log("No es admin para ejecutar este fetch")
           return
         }
         try{
           const response = await fetch(`http://localhost:8080/categories/delete/${id}`,{
             method:"DELETE",
             headers:{
               'Authorization': `Bearer ${token}`,
               "Content-Type":"application/json"
             }
           })
           if(response.ok){
             console.log("Categoria eliminada")
           }else{
             console.log("Categoria no se pudo eliminar")
           }
         }catch(error){
           console.log("Error en el fetch: " + error);
             throw error;
         }
       }
   
       // ACTUALIZAR AUTO
   
       const updateCategory=async(id,name)=>{
         if(user?.role !== "ADMIN"){
           console.log("No es admin para ejecutar este fetch")
           return
         }
         try{
           const response =await fetch("http://localhost:8080/categories/update",{
             method: "PUT",
             headers: {
               'Authorization': `Bearer ${token}`,
               "Content-Type":"application/json"
             },
             body: JSON.stringify({
               id,
               name
             })
           })
           if (response.ok) {
             console.log("Categoria actualizada exitosamente");
           } else {
             console.error("Error al actualizar la categoria");
           }
         }catch(error){
           console.log("Error en el fetch: " + error);
             throw error;
         }
         }
       
       
       return (
         <CarCategoriesContext.Provider
         value={{categories,getCategories,deleteCategory,saveCategory,updateCategory}}>
             {children}
         </CarCategoriesContext.Provider>
       )
}
export const useCategories = () => useContext(CarCategoriesContext);