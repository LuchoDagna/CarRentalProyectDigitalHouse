import React, { useEffect, useState } from 'react'
import { useCars } from '../contexts/CarsContext'
import '../components/AdminCar.css'
import { useImgs } from '../contexts/CarImgsContext';
import flecha from '../assets/flecha.png'
import cruz from '../assets/cruz.png'

export const AdminCar = ({ car, onCarDeleted }) => {
  const { updateCar, deleteCar } = useCars();
  const { imagesById, getImagesById, saveImage, deleteImage } = useImgs();

  const [isEditing, setIsEditing] = useState(false);
  const [newImgUrl, setNewImgUrl] = useState('');
  const [isEditingImgs, setIsEditingImgs] = useState(false);
  const [wantsToDelete, setWantsToDelete] = useState(false);
  const [carruselMargin, setCarruselMargin] = useState(0);
  const [form, setForm] = useState({
    model: car.model,
    year: car.year,
    priceADay: car.priceADay,
    doors: car.doors,
    transmition: car.transmition,
    mainImgUrl: car.mainImgUrl,
    available: car.available,
    categoryId: car.categoryId.toString()
  });

  const labelMapping = {
    model: 'Modelo',
    year: 'Año',
    priceADay: 'Precio por día',
    doors: 'Puertas',
    transmition: 'Transmisión',
    mainImgUrl: 'URL de imagen principal',
    available: 'Disponible',
    categoryId: 'Categoría'
  };

  useEffect(() => {
    if (isEditingImgs) getImagesById(car.id);
  }, [isEditingImgs]);

  const handleFlecha1 = () => {
    if (carruselMargin !== 0) setCarruselMargin(carruselMargin + 100);
  };

  const handleFlecha2 = () => {
    if (carruselMargin !== (imagesById.length - 1) * -100) {
      setCarruselMargin(carruselMargin - 100);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setForm({
      model: car.model,
      year: car.year,
      priceADay: car.priceADay,
      doors: car.doors,
      transmition: car.transmition,
      mainImgUrl: car.mainImgUrl,
      available: car.available,
      categoryId: car.categoryId.toString()
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setWantsToDelete(false);
    await deleteCar(car.id);
    onCarDeleted();
  };

  const handleSave = e => {
    e.preventDefault();
    updateCar(
      car.id,
      form.model,
      parseInt(form.year, 10),
      parseFloat(form.priceADay),
      parseInt(form.doors, 10),
      form.transmition,
      form.mainImgUrl,
      form.available === 'true',
      parseInt(form.categoryId, 10)
    );
    setIsEditing(false);
  };

  const handleIsEditingImgs = () => {
    setCarruselMargin(0);
    setIsEditingImgs(true);
  };

  const handleDeleteImage = async imageId => {
    setCarruselMargin(0);
    await deleteImage(imageId);
    getImagesById(car.id);
  };

  const handleSaveImage = async () => {
    setNewImgUrl('');
    setCarruselMargin(0);
    await saveImage(newImgUrl, car.id);
    getImagesById(car.id);
  };

  return (
    <div className='carContainer'>
      <form className='formCar' onSubmit={handleSave}>
        {Object.entries(form)
          .filter(([key]) => key !== 'categoryId')
          .map(([key, value]) => (
            <div className='infoContainer' key={key}>
              <label htmlFor={key}>{labelMapping[key]}</label>
              {key === 'available' ? (
                <select
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value='true'>Sí</option>
                  <option value='false'>No</option>
                </select>
              ) : key === 'transmition' ? (
                <select
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value='manual'>Manual</option>
                  <option value='automatic'>Automático</option>
                </select>
              ) : (
                <input
                  type={['year','doors'].includes(key) ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}

        <div className='infoContainer'>
          <label htmlFor='categoryId'>{labelMapping['categoryId']}</label>
          <select
            id='categoryId'
            name='categoryId'
            value={form.categoryId}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value='1'>HatchBack</option>
            <option value='2'>Sedán</option>
            <option value='3'>Familiar</option>
            <option value='4'>Coupé</option>
            <option value='5'>SUV</option>
          </select>
        </div>

        <div className='buttonsContainer'>
          {!isEditing ? (
            <button type='button' onClick={handleEdit}>
              Editar
            </button>
          ) : (
            <>
              <button type='button' onClick={handleIsEditingImgs}>
                Imágenes
              </button>
              <button type='submit'>Guardar</button>
              <button type='button' onClick={handleCancel}>
                Cancelar
              </button>
            </>
          )}
          <button
            className='deleteButton'
            type='button'
            onClick={() => setWantsToDelete(true)}
          >
            <img
              src='https://cdn-icons-png.flaticon.com/512/323/323811.png'
              alt='tacho'
            />
          </button>
        </div>
      </form>

      {wantsToDelete && (
        <div className='sureDelete'>
          <div>
            <h2>Seguro que quieres eliminar el auto {car.model}?</h2>
            <button id='btnCancelar' onClick={() => setWantsToDelete(false)}>
              Cancelar
            </button>
            <button id='btnEliminar' onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      )}

      {isEditingImgs && (
        <div className='imgsEditorContainer'>
          <div className='imgsEditor'>
            <div className='imgsCarruselContainer'>
              <div
                style={{ marginLeft: `${carruselMargin}%` }}
                className='imgsCarrusel'
              >
                {Object.entries(imagesById).map(([key, image]) => (
                  <div key={key}>
                    <img src={image.url} alt={`img-${key}`} />
                    <button onClick={() => handleDeleteImage(image.id)}>
                      Eliminar imagen
                    </button>
                  </div>
                ))}
              </div>
              <div className='flechas'>
                <img
                  src={flecha}
                  onClick={handleFlecha1}
                  style={
                    carruselMargin === 0
                      ? { visibility: 'hidden' }
                      : {} 
                  }
                  className='flecha'
                  alt='flecha1'
                  id='flecha1'
                />
                <img
                  src={flecha}
                  onClick={handleFlecha2}
                  style={
                    carruselMargin === (imagesById.length - 1) * -100
                      ? { visibility: 'hidden' }
                      : {}
                  }
                  className='flecha'
                  alt='flecha2'
                  id='flecha2'

                />
              </div>
            </div>
            <div className='imgsEditorInput'>
              <input
                type='text'
                placeholder='Introducir una URL'
                value={newImgUrl}
                onChange={e => setNewImgUrl(e.target.value)}
              />
              <button onClick={handleSaveImage}>Agregar imagen</button>
            </div>
            <img
              src={cruz}
              alt='cruz'
              className='cross'
              onClick={() => setIsEditingImgs(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
