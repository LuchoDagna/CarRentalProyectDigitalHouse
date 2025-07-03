import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../contexts/AuthContext';
import { useCars } from '../contexts/CarsContext';
import flecha from '../assets/flecha.png';
import '../styles/ReserveCar.css';
import { useAppointments } from '../contexts/AppointmentContext';
import { useImgs } from '../contexts/CarImgsContext';
import { CarCard } from '../components/CarCard';

export const ReserveCar = () => {
  const { user } = useAuth();
  const { saveAppointment, findByCarId } = useAppointments();
  const { id } = useParams();
  const { cars, getCars} = useCars();
  const { imagesById, getImagesById } = useImgs();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [carruselMargin, setCarruselMargin] = useState(0);
  const [reservaHecha, setReservaHecha] = useState(false);
  const [error, setError] = useState('');
  const [shuffledCars, setShuffledCars] = useState([])
  const [translateCarrusel2, setTranslateCarruesel2] = useState(0)

  
  useEffect(() => {
    getCars()
  }, [])
  
  const shuffleCars = useCallback(() => {
    if (cars.length > 0) {
      const filteredCars = cars.filter(c => c.id !== parseInt(id));
      const shuffled = filteredCars.slice().sort(() => Math.random() - 0.5);
      setShuffledCars(shuffled);
      setTranslateCarruesel2(0);
    }
  }, [cars, id]);

  useEffect(() => {
    shuffleCars();
  }, [cars, id, shuffleCars]);
  
  const categoryNames = {
    1: "HatchBack",
    2: "Sedán",
    3: "Familiar",
    4: "Coupé",
    5: "SUV"
  };
  
  const handleClickLeft = ()=>{
    if(translateCarrusel2>=0)return
    setTranslateCarruesel2(translateCarrusel2+12.5)
  }
  const handleClickRight = ()=>{
    if(translateCarrusel2<=-87.5)return
    setTranslateCarruesel2(translateCarrusel2-12.5)
  }
  
  const handleReserva = async () => {
    if (!isRangeAvailable(startDate, endDate)) {
      setError('El auto no está disponible en algunas de las fechas seleccionadas');
      return;
    }
    
    setError('');
    try {
      await saveAppointment(startDate, endDate, car.id, user.id, 'PENDIENTE');
      setReservaHecha(true);
    } catch (err) {
      setError('Error al realizar la reserva');
      console.error(err);
    }
  };
  
  const handleFlecha1 = () => {
    if (carruselMargin !== 0) {
      setCarruselMargin(carruselMargin + 100);
    }
  };
  
  const handleFlecha2 = () => {
    if (carruselMargin !== (imagesById.length) * -100) {
      setCarruselMargin(carruselMargin - 100);
    }
  };
  
  const isRangeAvailable = (start, end) => {
    if (!start || !end) return true;
    
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    
    for (let date = new Date(startDateObj); date <= endDateObj; date.setDate(date.getDate() + 1)) {
      const isBooked = bookedDates.some(range => 
        date >= new Date(range.start) && date <= new Date(range.end)
      );
      
      if (isBooked) {
        return false;
      }
    }
    return true;
  };
  
  useEffect(() => {
    getImagesById(id);
  }, [id]);
  
  useEffect(() => {
    let isActive = true;
    
    const fetchBooked = async () => {
      try {
        const appointments = await findByCarId(id) || [];
        const ranges = appointments.map(app => ({
          start: new Date(app.startDate),
          end: new Date(app.endDate)
        }));
        
        if (isActive) {
          setBookedDates(ranges);
        }
      } catch (err) {
        console.error('No se pudieron cargar reservas:', err);
      }
    };
    
    fetchBooked();
    return () => { isActive = false; };
  }, [id]);

  
  const car = cars.find(c => c.id === parseInt(id));
  if (!car) return <p>Auto no encontrado</p>;
  
  return (
    <div className='ReserveCar'>
    <div className='reserveCarContainer'>
      <div className='carImgsContainer'>
        <div style={{ marginLeft: `${carruselMargin}%` }} className='carImgsCarrusel'>
          <img src={car.mainImgUrl} alt="mainImg" />
          {Object.entries(imagesById).map(([id, imgObj]) => (
            <img 
              key={id}
              src={imgObj.url} 
              alt={id} 
            />
          ))}
        </div>
        <div className='flechas'>
          <img 
            src={flecha} 
            onClick={handleFlecha1} 
            style={carruselMargin === 0 ? { visibility: 'hidden' } : { visibility: '' }} 
            className='flecha' 
            id='flecha1' 
            alt="flecha1" 
          />
          <img 
            src={flecha} 
            onClick={handleFlecha2} 
            style={carruselMargin === (imagesById.length) * -100 ? { visibility: 'hidden' } : { visibility: '' }} 
            className='flecha' 
            id='flecha2' 
            alt="flecha2" 
          />
        </div>
      </div>
      
      <div className='carInfoContainer'>
        <h2>{car.brand} {car.model}</h2>
        <p>Precio por día: ${car.priceADay.toLocaleString()}</p>
        <h3>Seleccioná fechas para tu reserva</h3>

        <div className='fechaContainer'>
          <label>Fecha de inicio:</label>
          <DatePicker
            className='fechaSelect'
            selected={startDate}
            onChange={date => {
              setStartDate(date);
              setEndDate(null);
              setError('');
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDateIntervals={bookedDates.map(range => ({
              start: range.start,
              end: range.end
            }))}
            placeholderText="Elegí la fecha de inicio"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        
        <div className='fechaContainer'>
          <label>Fecha de finalización:</label>
          <DatePicker
            className='fechaSelect'
            selected={endDate}
            onChange={date => {
              if (isRangeAvailable(startDate, date)) {
                setEndDate(date);
                setError('');
              } else {
                setError('El auto no está disponible en algunas de las fechas seleccionadas');
              }
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            excludeDateIntervals={bookedDates.map(range => ({
              start: range.start,
              end: range.end
            }))}
            placeholderText="Elegí la fecha de fin"
            disabled={!startDate}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <br />
        {user ? (
          reservaHecha ? (
            <div className="mensajeReserva">
              <Link to="/my-appointments">
              <p>¡Reserva confirmada!</p>
              </Link>
            </div>
          ) : (
            <button
              className='buttonReservar'
              disabled={!startDate || !endDate}
              onClick={handleReserva}
            >
              Confirmar reserva
            </button>
          )
        ) : (
          <Link to="/login">
            <button className='buttonReservar'>Iniciar sesión para reservar</button>
          </Link>
        )}
        
        <div className='carCaracteristicas'>
          <h3>Características:</h3>
          <p><b>Marca:</b> {car.brand}</p>
          <p><b>Modelo:</b> {car.model}</p>
          <p><b>Puertas:</b> {car.doors}</p>
          <p><b>Transmisión:</b> {car.transmition}</p>
          <p><b>Año:</b> {car.year}</p>
          <p><b>Categoría:</b> {categoryNames[car.categoryId]}</p>
        </div>
      </div>
      </div>
      <h2 className='otherCars'>Otros autos relacionados</h2>
      <div className='reserveCarCarruselContainer'>
        <div className='reserveCarCarrusel'>
            <div className='reserveCarCarruselCars' style={{transform: `translateX(${translateCarrusel2}%)`}}>
              {shuffledCars.slice(0, 8).map(car =>(
                          <CarCard key={car.id} car={car}/>
                        ))}
            </div>
        </div>
            <div className='reserveCarCarruselFlechas'>
                <img style={translateCarrusel2>=0?{visibility:"hidden"}:{}} src={flecha} onClick={handleClickLeft} id="flechaIzq" />
                <img style={translateCarrusel2<=-87.5?{visibility:"hidden"}:{}} src={flecha} onClick={handleClickRight} id="flechaDer" />
            </div>
      </div>
    </div>
  );
};