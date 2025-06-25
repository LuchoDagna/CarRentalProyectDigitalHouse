import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const{user, token} = useAuth();
    const[users, setUsers] = useState([]);

    const getUsers= async ()=>{
       
        try{
            const response = await fetch("http://localhost:8080/users/findAll",{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Respuesta no OK:", response.status, errorText);
                return;
            }

            const data = await response.json()
            setUsers(data);
            if(!response.ok){
                console.log("No se pudo hacer el findAll de users")
            }
        }catch(error){
            console.log("Error en el fetch: " + error);
            throw error;
        }
    }
     useEffect(() => {
          getUsers()
        }, [])

    const saveUser =async (name,lastName,email,password,role)=>{
        if(user?.role!=="ADMIN"){
            console.log("El usuario no tiene permitido este fetch");
            return
        }
        try{
            const response = await fetch("http://localhost:8080/users/save",{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    email,
                    password,
                    role
                })
            });
            if(response.ok){
                console.log("Usuario guardado")
            }
            if(!response.ok){
                console.log("Usuario no se pudo guardar")
            }
        }catch(error){
            console.log("Error en el fetch: " + error);
            throw error;
        }
    }
    const deleteUser =async (id)=>{
        if(user?.role!=="ADMIN"){
            console.log("El usuario no tiene permitido este fetch");
            return
        }
        try{
            const response = await fetch(`http://localhost:8080/users/delete/${id}`,{
                method:"DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            });
            if(response.ok){
                console.log("Usuario eliminado")
                getUsers();
            }
            if(!response.ok){
                console.log("Usuario no se pudo eliminar")
            }
        }catch(error){
            console.log("Error en el fetch: " + error);
            throw error;
        }
    }

    const updateUser = async (id,name,lastName,email,password,role) =>{
        if(user?.role!=="ADMIN"){
            console.log("El usuario no tiene permitido este fetch");
            return
        }
        try{
            const response = await fetch(`http://localhost:8080/users/update`,{
                method:"PUT",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    id,
                    name,
                    lastName,
                    email,
                    password,
                    role
                })
            });
            if(response.ok){
                console.log("Usuario actualizado")
                await getUsers();
            }
            if(!response.ok){
                console.log("Usuario no se pudo actualizar")
            }
        }catch(error){
            console.log("Error en el fetch: " + error);
            throw error;
        }
        
    }

  return (
    <UsersContext.Provider value={{users,getUsers,deleteUser,saveUser,updateUser}}>
        {children}
    </UsersContext.Provider>
  )
}


export const useUsers = () => useContext(UsersContext);