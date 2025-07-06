package com.example.CarRental.Services;

import com.example.CarRental.Entities.Appointments;
import com.example.CarRental.Entities.CarCategories;
import com.example.CarRental.Entities.Cars;
import com.example.CarRental.Repositories.IAppointmentsRepository;
import com.example.CarRental.Repositories.ICarCategoriesRepository;
import com.example.CarRental.Repositories.ICarImgsRepository;
import com.example.CarRental.Repositories.ICarsRepository;
import com.example.CarRental.dto.CarDTO;
import com.example.CarRental.dto.UpdateCarDTO;
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
    private final ICarCategoriesRepository carCategoriesRepository;

    public List<Cars> findAll(){
        return carsRepository.findAll();
    }

    public Optional<Cars> findById(Integer id){
        return carsRepository.findById(id);
    }
    public List<Cars> findByCategory(Integer id){
        return carsRepository.findByCarCategory_Id(id);
    }
    @Transactional
    public void deleteById(Integer id) throws Exception {
        Optional<Cars> carToFind= carsRepository.findById(id);
        if (carToFind.isPresent()){
            if (carImgsRepository.findByCar_Id(id)!=null){
                carImgsRepository.deleteByCarId(id);

            }
            if (appointmentsRepository.findByCar_Id(id)!=null){
                appointmentsRepository.deleteByCarId(id);

            }
            carsRepository.deleteById(id);
        }
        else{
            throw new Exception("No se encontro el id "+ id);
        }
    }
    public void update(UpdateCarDTO car){
        Cars existing = carsRepository.findById(car.getId())
                        .orElseThrow(()->(new RuntimeException("Car not found")));
        CarCategories carCategory = carCategoriesRepository.findById(car.getCarCategoryId())
                    .orElseThrow(()->(new RuntimeException("CarCategory not found")));

        existing.setModel(car.getModel());
        existing.setYear(car.getYear());
        existing.setPriceADay(car.getPriceADay());
        existing.setDoors(car.getDoors());
        existing.setTransmition(car.getTransmition());
        existing.setMainImgUrl(car.getMainImgUrl());
        existing.setAvailable(car.getAvailable());
        existing.setCarCategory(carCategory);
        carsRepository.save(existing);
    }

    public Cars save(CarDTO car){
        CarCategories carCategories = carCategoriesRepository.findById(car.getCarCategoryId())
                .orElseThrow(()->(new RuntimeException("Category not found")));
        Cars carToSave = Cars.builder()
                .model(car.getModel())
                .year(car.getYear())
                .priceADay(car.getPriceADay())
                .doors(car.getDoors())
                .transmition(car.getTransmition())
                .mainImgUrl(car.getMainImgUrl())
                .available(car.getAvailable())
                .carCategory(carCategories)
                .build();


        return carsRepository.save(carToSave);
    }

}
