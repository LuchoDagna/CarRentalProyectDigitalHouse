import React from 'react'
import './CarCard.css'
import { Link } from 'react-router-dom'

export const CarCard = ({car}) => {
  return (
    <div className='CarCardContainer'>
        <div className='imgContainer'>
          <img src={car.mainImgUrl} alt={car.model} />
        </div>
        <h2>{car.model}</h2>
        <p>{car.year}</p>
        <p id='price'>{
          new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
          }).format(car.priceADay)
        }</p>
        <Link to={`/reserve-car/${car.id}`}>
        <button>RESERVAR</button>
        </Link>
    </div>
  )
}
