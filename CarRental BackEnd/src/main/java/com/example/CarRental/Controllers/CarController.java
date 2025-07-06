package com.example.CarRental.Controllers;

import com.example.CarRental.Entities.Cars;
import com.example.CarRental.Entities.Users;
import com.example.CarRental.Services.CarsService;
import com.example.CarRental.dto.CarDTO;
import com.example.CarRental.dto.UpdateCarDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarsService carsService;

    @Autowired
    public CarController(CarsService carsService) {
        this.carsService = carsService;
    }

    @PostMapping("/save")
    public ResponseEntity<Cars> save(@RequestBody CarDTO car){
        return ResponseEntity.ok(carsService.save(car));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Cars>> findAll(){
        return ResponseEntity.ok(carsService.findAll());
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<Cars> findById(@PathVariable Integer id){
        Optional<Cars> carToLookFor = carsService.findById(id);
        if (carToLookFor.isPresent()){
            return ResponseEntity.ok(carToLookFor.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/findByCategoryId/{id}")
    public ResponseEntity<List<Cars>> findByCategoryId(@PathVariable Integer id){
        return ResponseEntity.ok(carsService.findByCategory(id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws Exception {
        Optional<Cars> carToLookFor = carsService.findById(id);
        if (carToLookFor.isPresent()){
            carsService.deleteById(id);
            return ResponseEntity.ok("Se elimino el usuario con id: " + id +" correctamente");
        }
        else {
            return ResponseEntity.ok("No se encontró el usuario con id: "+ id);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateCar(@RequestBody UpdateCarDTO car) {
        System.out.println("ID recibido: " + car.getId()); // 👈 Verifica esto
        if (car.getId() == null) {
            throw new IllegalArgumentException("El ID es nulo en el backend");
        }

        ResponseEntity<String> response;
        Optional<Cars> userToLookFor = carsService.findById(car.getId());
        if (userToLookFor.isPresent()){
            carsService.update(car);
            response = ResponseEntity.ok("El auto se actualizo correctamente");
        }
        else{
            response = ResponseEntity.ok("No se encontró el auto con ese id");
        }
        return response;

    }
}
