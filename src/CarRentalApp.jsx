import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavBarComponent } from './components/NavBarComponent';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CarList } from './pages/CarList';
import { MyAppointments } from './pages/MyAppointments';
import { ReserveCar } from './pages/ReserveCar';
import { AdminUsers } from './pages/AdminUsers';
import { AdminCars } from './pages/AdminCars';
import { AdminAppointments } from './pages/AdminAppointments';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { CarsProvider } from './contexts/CarsContext';
import { UsersProvider } from './contexts/UsersContext';
import { CarCategoriesProvider } from './contexts/CarCategoriesContext';
import { CarImgsProvider } from './contexts/CarImgsContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import ScrollToTop from './hooks/ScrollToTop';

export const CarRentalApp = () => {
  return (
    <div className='page'>
        <AuthProvider>
          <UsersProvider>
            <CarCategoriesProvider>
              <CarsProvider>
                <CarImgsProvider>
                  <AppointmentProvider>
                    <NavBarComponent/>
                      <main>
                          <ScrollToTop />
                        <Routes>
                          {/* RUTAS PARA USUARIOS NO REGISTRADOS */}
                            <Route path='/' element={<Home/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/cars' element={<CarList/>}/>
                            <Route path='/reserve-car/:id' element={<ReserveCar/>}/>

                          {/* RUTAS PARA USUARIOS REGISTRADOS */}
                            <Route path='/my-appointments' element={<MyAppointments/>}/>
                            <Route path='/reserve/:carId' element={<ReserveCar/>}/>

                          {/* RUTAS PARA ADMINISTRADORES */}
                            <Route path='/admin/users' element={<AdminUsers/>}/>
                            <Route path='/admin/cars' element={<AdminCars/>}/>
                            <Route path='/admin/appointments' element={<AdminAppointments/>}/>
                            
                        </Routes>
                      </main>
                        
                      <Footer/>
                  </AppointmentProvider>
                </CarImgsProvider>
              </CarsProvider>
            </CarCategoriesProvider>
          </UsersProvider>
      </AuthProvider>
    </div>
  )
}

export default CarRentalApp;