package com.example.CarRental.Repositories;

import com.example.CarRental.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IUsersRepository extends JpaRepository<Users,Integer> {
    List<Users> findByRole(String role);
    Optional<Users> findByEmail(String email);
}
