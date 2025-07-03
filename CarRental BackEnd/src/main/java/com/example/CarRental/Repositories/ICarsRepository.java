package com.example.CarRental.Repositories;

import com.example.CarRental.Entities.Cars;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ICarsRepository extends JpaRepository<Cars,Integer> {
  List<Cars> findByCategoryId(Integer id);
}
