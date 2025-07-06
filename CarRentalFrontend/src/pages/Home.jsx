import React, { useEffect, useMemo, useState } from 'react'
import { useCars } from '../contexts/CarsContext'
import { CarCard } from '../components/CarCard';
import '../styles/Home.css'
import { useAppointments } from '../contexts/AppointmentContext';
import DatePicker from 'react-datepicker';
import flecha from '../assets/flecha.png';

export const Home = () => {
  const{cars,getCars} = useCars();
  const{appointments, getAppointments} = useAppointments();
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDoors, setSelectedDoors] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [emptyCheckbox, setEmptyCheckbox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isOnMobile, setIsOnMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    const isMobile = window.innerWidth <= 900;
    setIsOnMobile(isMobile);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);

  return () => {
    window.removeEventListener('resize', checkMobile);
  };
}, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    console.log(isOnMobile)
    }

  const handlePriceChange= (e)=>{
    setSelectedPrice(e.target.value);
  }
  
  
  useEffect(() => {
    getAppointments();
    getCars();
  }, []);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;
  
  const [shuffledCars, setShuffledCars] = useState([]);

  useEffect(() => {
    if (cars.length > 0 && shuffledCars.length === 0) {
      const shuffled = cars.slice().sort(() => Math.random() - 0.5);
      setShuffledCars(shuffled);
    }
  }, [cars, shuffledCars]);
  
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPrice, selectedDoors, selectedCategory, searchQuery, startDate, endDate,appointments]);
  
  const isCarAvailable = (carId) => {
    if (!startDate || !endDate) return true; 
    
    const carAppointments = appointments.filter(app => 
      app.carId === carId
    );
    
    return !carAppointments.some(app => {
      const appStart = new Date(app.startDate);
      const appEnd = new Date(app.endDate);
      const selectedStart = new Date(filterStartDate);
      const selectedEnd = new Date(filterEndDate);
      
      return (
        selectedStart <= appEnd && 
        selectedEnd >= appStart
      );
    });
  };

  const filteredCars = shuffledCars.filter(car => {
    const price = car.priceADay;
    const matchesPrice= (()=>{
      switch (selectedPrice) {
        case 'price1':
          return price < 50000;
          case 'price2':
            return price >= 50000 && price < 70000;
            case 'price3':
              return price >= 70000 && price < 90000;
              case 'price4':
                return price >= 90000 && price < 110000;
                case 'price5':
                  return price >= 110000;
                  default:
                    return true; 
                  }
                })();
                
                const matchesDoors = selectedDoors ? car.doors.toString() === selectedDoors : true;
                const matchesCategory = selectedCategory ? car.carCategory.id.toString() === selectedCategory : true;
                 const matchesSearch = searchQuery 
                  ? car.model.toLowerCase().includes(searchQuery.toLowerCase())
                  : true;

                const matchesAvailability = isCarAvailable(car.id);
                
                return matchesPrice && matchesDoors && matchesCategory && matchesSearch && matchesAvailability;
              });
              const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
              const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    return (
  <div>

      <div className='fondoPrincipal'>
        Un clic<br />
        una ruta<br />
        mil recuerdos <br />
      </div>

      
      <div className='homeSearcher'>
        <h1 >Elegí cómo viajar</h1>
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleSearchChange} 
          placeholder='¿Que estas buscando?'/>
         <div className="date-range-picker">
            <DatePicker
              selected={startDate}
              onChange={date => {
                setStartDate(date);
                if (endDate && date > endDate) setEndDate(null);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Fecha de inicio"
              className="date-input"
            />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              placeholderText="Fecha de fin"
              disabled={!startDate}
              className="date-input"
            />
          </div>
          <button className="search-button" onClick={handleSearchClick}>
            Buscar
          </button>
      </div>

      <div className='cars'>

        {isOnMobile?(
          !showFilters?( 
          <div className='showFilters' onClick={()=>{setShowFilters(true)}}>
              <p>Mostrar Filtros</p>
              <img src={flecha} alt="" />
          </div>
          ):(
            <div className='filters'>
              <p style={{cursor:"pointer"}} onClick={()=>{setShowFilters(false)}}><u>Ocultar Filtros</u></p>
          <h2>Aplicar filtros</h2>

          <div className='filter'>

                <h3>Precio</h3>           

           
             <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price1" && !emptyCheckbox ?true:false} value="price1" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              Menos de $50.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price2" && !emptyCheckbox ?true:false} value="price2" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              $50.000 - $70.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price3" && !emptyCheckbox ?true:false} value="price3" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              $70.000 - $90.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price4" && !emptyCheckbox ?true:false} value="price4" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              $90.000 - $110.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price5" && !emptyCheckbox ?true:false} value="price5" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              Mas de $110.000
            </label>
            

          </div>
          <div className='filter'>
            <h3>Cantidad de Puertas</h3>           

            <label>
              <input type="checkbox" name="doors" value="3" checked={selectedDoors==="3" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} onChange={(e)=>{setSelectedDoors(e.target.value)}}/>
              3 puertas
            </label>
            <label>
              <input type="checkbox" name="doors" value="5" checked={selectedDoors==="5" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} onChange={(e)=>{setSelectedDoors(e.target.value)}}/>
              5 puertas
            </label>

          </div>
          <div className='filter'>
            <h3>Categoria de auto</h3>           

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="1" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="1" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Hatchback
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="2" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="2" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Sedán
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="3" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="3" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Familiar
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="4" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="4" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Coupé
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="5" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="5" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              SUV
            </label>
            

          </div>
          <button className='cleanButton' onClick={()=>{
            setEmptyCheckbox(true);
            setSelectedCategory(``);
            setSelectedDoors(``);
            setSelectedPrice(``);
            setCurrentPage(1);
            setSearchQuery('');
            setSearchTerm('');
            setStartDate(null);
            setEndDate(null);
            setFilterStartDate(null);
            setFilterEndDate(null);
            }}>
            Limpiar Filtros
          </button>
        </div>
          )
         
        ):
        (<div className='filters'>
          <h2>Aplicar filtros</h2>

          <div className='filter'>

                <h3>Precio</h3>           

           
             <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price1" && !emptyCheckbox ?true:false} value="price1" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              Menos de $50.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price2" && !emptyCheckbox ?true:false} value="price2" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              $50.000 - $70.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price3" && !emptyCheckbox ?true:false} value="price3" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              $70.000 - $90.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price4" && !emptyCheckbox ?true:false} value="price4" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              $90.000 - $110.000
            </label>

            <label>
              <input type="checkbox" name="precio" checked={selectedPrice==="price5" && !emptyCheckbox ?true:false} value="price5" onClick={()=>{setEmptyCheckbox(false)}} onChange={handlePriceChange}/>
              Mas de $110.000
            </label>
            

          </div>
          <div className='filter'>
            <h3>Cantidad de Puertas</h3>           

            <label>
              <input type="checkbox" name="doors" value="3" checked={selectedDoors==="3" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} onChange={(e)=>{setSelectedDoors(e.target.value)}}/>
              3 puertas
            </label>
            <label>
              <input type="checkbox" name="doors" value="5" checked={selectedDoors==="5" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} onChange={(e)=>{setSelectedDoors(e.target.value)}}/>
              5 puertas
            </label>

          </div>
          <div className='filter'>
            <h3>Categoria de auto</h3>           

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="1" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="1" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Hatchback
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="2" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="2" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Sedán
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="3" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="3" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Familiar
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="4" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="4" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              Coupé
            </label>

            <label>
              <input type="checkbox" name="category" checked={selectedCategory==="5" && !emptyCheckbox ?true:false} onClick={()=>{setEmptyCheckbox(false)}} value="5" onChange={(e)=>{setSelectedCategory(e.target.value)}}/>
              SUV
            </label>
            

          </div>
          <button className='cleanButton' onClick={()=>{
            setEmptyCheckbox(true);
            setSelectedCategory(``);
            setSelectedDoors(``);
            setSelectedPrice(``);
            setCurrentPage(1);
            setSearchQuery('');
            setSearchTerm('');
            setStartDate(null);
            setEndDate(null);
            setFilterStartDate(null);
            setFilterEndDate(null);
            }}>
            Limpiar Filtros
          </button>
        </div>)
        }

        
        <div className='CarsContainer'>
          {currentCars.map(car =>(
            <CarCard key={car.id} car={car}/>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>


    </div>
  )
}
