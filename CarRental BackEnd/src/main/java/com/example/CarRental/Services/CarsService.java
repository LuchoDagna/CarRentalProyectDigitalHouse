package com.example.CarRental.Services;

import com.example.CarRental.Entities.Appointments;
import com.example.CarRental.Entities.Cars;
import com.example.CarRental.Repositories.IAppointmentsRepository;
import com.example.CarRental.Repositories.ICarImgsRepository;
import com.example.CarRental.Repositories.ICarsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarsService {
    private final ICarsRepository carsRepository;
    private final IAppointmentsRepository appointmentsRepository;
    private final ICarImgsRepository carImgsRepository;

    public List<Cars> findAll(){
        return carsRepository.findAll();
    }

    public Optional<Cars> findById(Integer id){
        return carsRepository.findById(id);
    }
    public List<Cars> findByCategory(Integer id){
        return carsRepository.findByCategoryId(id);
    }
    @Transactional
    public void deleteById(Integer id) throws Exception {
        Optional<Cars> carToFind= carsRepository.findById(id);
        if (carToFind.isPresent()){
            if (carImgsRepository.findByCarId(id)!=null){
                carImgsRepository.deleteByCarId(id);

            }
            if (appointmentsRepository.findByCarId(id)!=null){
                appointmentsRepository.deleteByCarId(id);

            }
            carsRepository.deleteById(id);
        }
        else{
            throw new Exception("No se encontro el id "+ id);
        }
    }
    public void update(Cars car){

        carsRepository.save(car);
    }

    public Cars save(Cars car){
        return carsRepository.save(car);
    }

}
