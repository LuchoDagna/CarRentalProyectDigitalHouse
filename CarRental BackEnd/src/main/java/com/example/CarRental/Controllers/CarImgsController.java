package com.example.CarRental.Controllers;

import com.example.CarRental.Entities.CarImgs;
import com.example.CarRental.Services.CarImgsService;
import com.example.CarRental.dto.CarImgDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/imgs")
public class CarImgsController {

    private final CarImgsService carImgsService;

    @Autowired
    public CarImgsController(CarImgsService carImgsService) {
        this.carImgsService = carImgsService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<CarImgs>> findAll() {
        return ResponseEntity.ok(carImgsService.findAll());
    }

    @GetMapping("/findByCarId/{carId}")
    public ResponseEntity<List<CarImgs>> findByCarId(@PathVariable Integer carId) {
        return ResponseEntity.ok(carImgsService.findByCarId(carId));
    }

    @PostMapping("/save")
    public ResponseEntity<CarImgs> save(@RequestBody CarImgDTO carImg) {
        return ResponseEntity.ok(carImgsService.save(carImg));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) {
        try {
            carImgsService.deleteById(id);
            return ResponseEntity.ok("Se eliminó la imagen con id: " + id + " correctamente");
        } catch (Exception e) {
            return ResponseEntity.ok("No se encontró la imagen con id: " + id);
        }
    }
}
