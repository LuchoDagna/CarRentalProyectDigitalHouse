package com.example.CarRental.Services;

import com.example.CarRental.Entities.CarCategories;
import com.example.CarRental.Repositories.ICarCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarCategoryService {
    private final ICarCategoriesRepository carCategoryRepository;

    @Autowired
    public CarCategoryService(ICarCategoriesRepository carCategoryRepository) {
        this.carCategoryRepository = carCategoryRepository;
    }

    public List<CarCategories> findAll() {
        return carCategoryRepository.findAll();
    }

    public Optional<CarCategories> findById(Integer id) {
        return carCategoryRepository.findById(id);
    }

    public CarCategories save(CarCategories category) {
        return carCategoryRepository.save(category);
    }

    public void update(CarCategories category) {
        carCategoryRepository.save(category);
    }

    public void deleteById(Integer id) throws Exception {
        Optional<CarCategories> categoryToDelete = carCategoryRepository.findById(id);
        if (categoryToDelete.isPresent()) {
            carCategoryRepository.deleteById(id);
        } else {
            throw new Exception("No se encontró la categoría con ID " + id);
        }
    }

}
