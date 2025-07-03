package com.example.CarRental.Services;

import com.example.CarRental.Entities.CarImgs;
import com.example.CarRental.Repositories.ICarImgsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarImgsService {
    private ICarImgsRepository carsImgsRepository;

    @Autowired
    public CarImgsService(ICarImgsRepository carsImgsRepository) {
        this.carsImgsRepository = carsImgsRepository;
    }



    public List<CarImgs> findAll() {
        return carsImgsRepository.findAll();
    }

    public List<CarImgs> findByCarId(Integer carId) {
        return carsImgsRepository.findByCarId(carId);
    }

    public CarImgs save(CarImgs carImg) {
        return carsImgsRepository.save(carImg);
    }

    public void deleteById(Integer id) throws Exception {
        Optional<CarImgs> imgToDelete = carsImgsRepository.findById(id);
        if (imgToDelete.isPresent()) {
            carsImgsRepository.deleteById(id);
        } else {
            throw new Exception("No se encontró la imagen con ID " + id);
        }
    }
}
