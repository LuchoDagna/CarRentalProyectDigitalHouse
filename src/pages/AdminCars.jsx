import React, { useEffect, useState } from 'react'
import { useCars } from '../contexts/CarsContext'
import { AdminCar } from '../components/AdminCar';
import "../styles/AdminCars.css"

export const AdminCars = () => {
  const { cars, getCars, saveCar } = useCars();
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

  // Mapeo de etiquetas amigables
  const labelMapping = {
    model: 'Modelo',
    year: 'Año',
    priceADay: 'Precio por día',
    doors: 'Puertas',
    transmition: 'Transmisión',
    mainImgUrl: 'URL de imagen',
    available: 'Disponible',
    categoryId: 'Categoría'
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await saveCar(
        newCar.model,
        parseInt(newCar.year, 10),
        parseFloat(newCar.priceADay),
        parseInt(newCar.doors, 10),
        newCar.transmition,
        newCar.mainImgUrl,
        newCar.available === 'true',
        parseInt(newCar.categoryId, 10)
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
      });
    } catch (error) {
      console.error("Error al guardar el auto:", error);
      alert("Error al guardar el auto, asegurate que no tenga el mismo nombre que otro");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='AdminCarsContainer'>
      <h2 className='saveCarTitle'>Guardar un nuevo auto</h2>
      <form onSubmit={handleSave} className='saveCar'>
        {/* Campos dinámicos excepto category */}
        {Object.entries(newCar)
          .filter(([key]) => key !== 'categoryId')
          .map(([key, value]) => {
            // Select para available
            if (key === 'available') {
              return (
                <div key={key}>
                  <label htmlFor={key}>{labelMapping[key]}</label>
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  >
                    <option value="">Elegir...</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
              );
            }
            // Select para transmition
            if (key === 'transmition') {
              return (
                <div key={key}>
                  <label htmlFor={key}>{labelMapping[key]}</label>
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  >
                    <option value="">Elegir...</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automático</option>
                  </select>
                </div>
              );
            }
            // Inputs de texto para el resto
            return (
              <div key={key}>
                <label htmlFor={key}>{labelMapping[key]}</label>
                <input
                  type={key === 'year' || key === 'doors' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            );
          })}

        {/* Selector de categoría */}
        <div className='saveCarCategory'>
          <label htmlFor="categoryId">{labelMapping['categoryId']}</label>
          <select
            id="categoryId"
            name="categoryId"
            value={newCar.categoryId}
            onChange={handleChange}
          >
            <option value="">Elegir categoría</option>
            <option value="1">HatchBack</option>
            <option value="2">Sedán</option>
            <option value="3">Familiar</option>
            <option value="4">Coupé</option>
            <option value="5">SUV</option>
          </select>
        </div>

        <button type='submit'>Guardar Auto</button>
      </form>

      <h2 className='carsTitle'>Lista de autos ya cargados</h2>
      <div className='carsContainer'>
        {cars.slice().reverse().map(car => (
          <AdminCar key={car.id} car={car} onCarDeleted={getCars} />
        ))}
      </div>
    </div>
  );
};

