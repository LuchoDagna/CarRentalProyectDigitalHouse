package com.example.CarRental.Services;

import com.example.CarRental.Entities.Users;
import com.example.CarRental.Repositories.IUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private final IUsersRepository userRepository;

    @Autowired
    public UsersService(IUsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Users> findAll() {
        return userRepository.findAll();
    }

    public Optional<Users> findById(Integer id) {
        return userRepository.findById(id);
    }

    public List<Users> findByRole(String role) {
        return userRepository.findByRole(role);
    }

    public Users save(Users user) {
        return userRepository.save(user);
    }

    public void update(Users user) {
        userRepository.save(user);
    }

    public void deleteById(Integer id) throws Exception {
        Optional<Users> userToDelete = userRepository.findById(id);
        if (userToDelete.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new Exception("No se encontró el usuario con ID " + id);
        }
    }
}
