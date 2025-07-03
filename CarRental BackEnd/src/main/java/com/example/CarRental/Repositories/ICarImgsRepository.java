package com.example.CarRental.Repositories;

import com.example.CarRental.Entities.CarImgs;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICarImgsRepository extends JpaRepository<CarImgs,Integer> {
    List<CarImgs> findByCarId(Integer carId);
    void deleteByCarId(Integer carId);
}
