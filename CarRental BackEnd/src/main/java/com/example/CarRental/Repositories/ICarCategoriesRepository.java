package com.example.CarRental.Repositories;

import com.example.CarRental.Entities.CarCategories;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICarCategoriesRepository extends JpaRepository<CarCategories, Integer> {
}
