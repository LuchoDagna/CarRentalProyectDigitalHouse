import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null)
    const[token, setToken] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser  = localStorage.getItem('user');

    if (savedToken && savedUser) {
        try {
            const decoded = jwtDecode(savedToken);
            const now = Date.now() / 1000;

            if (decoded.exp && decoded.exp > now) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
            }
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
        }
    }
}, []);

    const register = async (firstname, lastname, email, password) =>{
        try{
            const response = await fetch("http://localhost:8080/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({firstname, lastname, email, password})}
            )
            if(!response.ok){
                throw new Error("Register failed");
            }
            const data = await response.json();
            const { token, userName, userLastName, userEmail, role} = data;
            const user = {userName, userLastName, userEmail, role}

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setToken(token)
            setUser(user)
        }
    catch(error){
        console.log("Error en el register: " + error);
        throw error;
    }
    }


    const login = async (email, password) =>{
        try{
            const response = await fetch("http://localhost:8080/auth/login", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email, password}),
            })
        if(!response.ok){
            throw new Error("Login failed")
        }
        const data= await response.json();
        const { token,id, firstName, lastName, email: userEmail, role} = data;
        const user = {id, firstName, lastName, email: userEmail, role}
        console.log(user)

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user); 
        }catch(error){
            console.log("Error en el login: " + error);
            throw error;
        }
        
    } 
    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setToken(null)
        navigate("/")
    }

    const isAuthenticated = !!token;
    const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
    value={{user, token,register, login, logout, isAuthenticated, isAdmin}}>
        {children}
    </AuthContext.Provider>
)
}
export const useAuth = () => useContext(AuthContext);
