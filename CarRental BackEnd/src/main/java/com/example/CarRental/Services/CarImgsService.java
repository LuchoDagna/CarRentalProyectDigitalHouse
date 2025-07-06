package com.example.CarRental.Services;

import com.example.CarRental.Entities.CarImgs;
import com.example.CarRental.Entities.Cars;
import com.example.CarRental.Repositories.ICarImgsRepository;
import com.example.CarRental.Repositories.ICarsRepository;
import com.example.CarRental.dto.CarImgDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CarImgsService {
    private ICarImgsRepository carsImgsRepository;

    @Autowired
    private ICarsRepository carsRepository;

    @Autowired
    public CarImgsService(ICarImgsRepository carsImgsRepository) {
        this.carsImgsRepository = carsImgsRepository;
    }



    public List<CarImgs> findAll() {
        return carsImgsRepository.findAll();
    }

    public List<CarImgs> findByCarId(Integer carId) {
        return carsImgsRepository.findByCar_Id(carId);
    }

    public CarImgs save(CarImgDTO dto) {
        Cars car= carsRepository.findById(dto.getCarId())
                .orElseThrow(()->(new RuntimeException("Car no encontrado")));
        CarImgs carImgToSave = CarImgs.builder()
                .url(dto.getUrl())
                .car(car)
                .build();

        return carsImgsRepository.save(carImgToSave);
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
