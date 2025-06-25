import React, { useEffect, useState } from 'react'
import { useCars } from '../contexts/CarsContext'
import { AdminCar } from '../components/AdminCar';
import "../styles/AdminCars.css"
import { useCategories } from '../contexts/CarCategoriesContext';

export const AdminCars = () => {
  const {cars, getCars, saveCar} = useCars();
  const [newCar, setNewCar] = useState({
    model: "",
    year: "",
    priceADay: "",
    doors: "",
    transmition: "",
    mainImgUrl: "",
    available: "",
    categoryId: ""
  });


  useEffect(() => {
      getCars();
    }, []);

    const handleSave = async (e) => {
    e.preventDefault();
    try {
        await saveCar( 
            newCar.model,
            parseInt(newCar.year),
            parseFloat(newCar.priceADay),
            parseInt(newCar.doors),
            newCar.transmition,
            newCar.mainImgUrl,
            newCar.available === 'true' || newCar.available === true,
            parseInt(newCar.categoryId)
        );
        getCars();
        setNewCar({
          model: "",
          year: "",
          priceADay: "",
          doors: "",
          transmition: "",
          mainImgUrl: "",
          available: "",
          categoryId: ""
        })
    } catch (error) {
        console.error("Error al guardar el auto:", error);
        alert("Error al guardar el auto, asegurate que no tenga el mismo nombre que otro");
    }
};

    const handleChange = (e) =>{
      const{name, value} = e.target
      setNewCar(prev=>({...prev,[name]:value}))
    }


  return (
    <div className='AdminCarsContainer'>


      {/* GUARDAR NUEVO AUTO */}
      <h2 className='saveCarTitle'>Guardar un nuevo auto</h2>
      <form onSubmit={handleSave} className='saveCar'>
         {Object.entries(newCar).filter(([key]) => key !== 'categoryId').map(([key,value])=>(
                <div key={key}>
                    <label htmlFor={key}>{key}</label>
                    <input type="text" id={key} name={key} value={value} onChange={handleChange}/>
                </div>
            ))
          }
          <div>
                    <label htmlFor={newCar.categoryId}>Categoria</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={newCar.categoryId}    
                        onChange={handleChange}>
                        <option value={null}>Elegir Categoria</option>
                        <option value="1">HatchBack</option>
                        <option value="2">Sedán</option>
                        <option value="3">Familiar</option>
                        <option value="4">Coupé</option>
                        <option value="5">SUV</option>
                    </select>
            </div>
          <button type='submit'>
            Guardar Auto
          </button>
      </form>

      {/* ADMINISTRAR CADA AUTO  */}
      <h2 className='carsTitle'>Lista de autos ya cargados</h2>
      <div className='carsContainer'>
            {cars.slice().reverse().map(car =>(
              <AdminCar key={car.id} car={car} onCarDeleted={getCars}/>
            ))}
      </div>
    </div>
    
  )
}
