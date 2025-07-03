package com.example.CarRental.Repositories;

import com.example.CarRental.Entities.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IAppointmentsRepository extends JpaRepository<Appointments,Integer> {
    List<Appointments> findByStatus(String status);
    List<Appointments> findByUserId(Integer userId);
    List<Appointments> findByCarId(Integer carId);
    void deleteByCarId(Integer carId);
}
