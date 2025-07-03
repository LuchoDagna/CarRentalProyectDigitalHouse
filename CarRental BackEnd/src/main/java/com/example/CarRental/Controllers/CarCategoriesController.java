package com.example.CarRental.Controllers;

import com.example.CarRental.Entities.CarCategories;
import com.example.CarRental.Services.CarCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CarCategoriesController {

    private final CarCategoryService carCategoryService;

    @Autowired
    public CarCategoriesController(CarCategoryService carCategoryService) {
        this.carCategoryService = carCategoryService;
    }


    @PostMapping("/save")
    public ResponseEntity<CarCategories> save(@RequestBody CarCategories category) {
        return ResponseEntity.ok(carCategoryService.save(category));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<CarCategories>> findAll() {
        return ResponseEntity.ok(carCategoryService.findAll());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<CarCategories> findById(@PathVariable Integer id) {
        Optional<CarCategories> categoryToLookFor = carCategoryService.findById(id);
        return categoryToLookFor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws Exception {
        Optional<CarCategories> categoryToLookFor = carCategoryService.findById(id);
        if (categoryToLookFor.isPresent()) {
            carCategoryService.deleteById(id);
            return ResponseEntity.ok("Se eliminó la categoría con id: " + id + " correctamente");
        } else {
            return ResponseEntity.ok("No se encontró la categoría con id: " + id);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(@RequestBody CarCategories category) {
        Optional<CarCategories> categoryToLookFor = carCategoryService.findById(category.getId());
        if (categoryToLookFor.isPresent()) {
            carCategoryService.update(category);
            return ResponseEntity.ok("La categoría se actualizó correctamente");
        } else {
            return ResponseEntity.ok("No se encontró la categoría con ese id");
        }
    }
}

