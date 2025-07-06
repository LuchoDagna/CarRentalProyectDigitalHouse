import React, { useEffect, useState } from 'react'
import { useCars } from '../contexts/CarsContext'
import { AdminCar } from '../components/AdminCar';
import "../styles/AdminCars.css"
import { useCategories } from '../contexts/CarCategoriesContext';

export const AdminCars = () => {
  const { cars, getCars, saveCar } = useCars();
  const[categoryName, setCategoryName]= useState('')
  const[categoryToDelete, setCategoryToDelete]= useState(null)
  const {categories,getCategories, saveCategory, deleteCategory} = useCategories();

  const [newCar, setNewCar] = useState({
    model: "",
    year: "",
    priceADay: "",
    doors: "",
    transmition: "",
    mainImgUrl: "",
    available: "",
    carCategoryId: ""
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
    carCategoryId: 'Categoría'
  };
 
 useEffect(() => {
  getCars();
}, []);
 
useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getCategories();
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, [getCategories]);

  const handleCategorySaveChange=(e)=>{
    setCategoryName(e.target.value)
  }
  const handleCategorySave= ()=>{
      saveCategory(categoryName)
      setCategoryName('')
  }
  const handleCategoryDelete=(e)=>{
    deleteCategory(Number(categoryToDelete))
  }
  const handleChangeCategoryDelete=(e)=>{
    setCategoryToDelete(e.target.value)
  }

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
        parseInt(newCar.carCategoryId, 10)
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
        carCategoryId: ""
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
    <>
    
    <div className='AdminCarsContainer'>
      <h2 className='saveCarTitle'>Guardar un nuevo auto</h2>
      <form onSubmit={handleSave} className='saveCar'>
        {/* Campos dinámicos excepto category */}
        {Object.entries(newCar)
          .filter(([key]) => key !== 'carCategoryId')
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
          <label htmlFor="carCategoryId">{labelMapping['carCategoryId']}</label>
          <select
            id="carCategoryId"
            name="carCategoryId"
            value={newCar.carCategoryId}
            onChange={handleChange}
          >
            <option value="">Elegir categoría</option>
            {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
            }
          </select>
        </div>
        <button type='submit'>Guardar Auto</button>
      </form>

      <div className='createNewCategoryContainer'>      
          <h2>Crear nueva categoria de auto</h2>
          <p>Ingresa el nombre de la nueva categoria</p>
            <input onChange={handleCategorySaveChange} value={categoryName} type="text" id="" placeholder='Nueva categoria'/>
            <div className='createNewCategoryButtons'>
                <button onClick={handleCategorySave}>Agregar</button>
            </div>
        </div>
      <div className='createNewCategoryContainer'>      
          <h2>Borrar categoria</h2>
          <p>Elige la categoria a borrar </p>
            <select
            id="carCategoryId"
            name="carCategoryId"
            value={categoryToDelete}
            onChange={handleChangeCategoryDelete}
          >
            <option value="">Elegir categoría</option>
            {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
            }
          </select>
            <div className='createNewCategoryButtons'>
                <button onClick={handleCategoryDelete}>Borrar</button>
            </div>
        </div>
      <h2 className='carsTitle'>Lista de autos ya cargados</h2>
      <div className='carsContainer'>
        {cars.slice().reverse().map(car => (
          <AdminCar key={car.id} car={car} onCarDeleted={getCars}/>
        ))}
      </div>
    </div>
    <div className='adminMobile'>
        <h3>No se puede ver el panel de admin desde un celular</h3>
    </div>
    </>
  );
};

