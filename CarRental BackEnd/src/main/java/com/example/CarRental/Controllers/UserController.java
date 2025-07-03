package com.example.CarRental.Controllers;

import com.example.CarRental.Entities.Users;
import com.example.CarRental.Services.UsersService;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private UsersService usersService;

    @Autowired
    public UserController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/save")
    public ResponseEntity<Users> saveUser(@RequestBody Users user){
        return ResponseEntity.ok(usersService.save(user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) throws Exception {
        usersService.deleteById(id);
        return ResponseEntity.ok("Se elimino el usuario con id: "+ id + " correctamente.");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody Users user) {
        ResponseEntity<String> response;
        Optional<Users> userToLookFor = usersService.findById(user.getId());
        if (userToLookFor.isPresent()){
            usersService.update(user);
            response = ResponseEntity.ok("El usuario se actualizo correctamente");
        }
        else{
            response = ResponseEntity.ok("No se encontró el usuario con ese id");
        }
        return response;

    }
    @GetMapping("/findAll")
    public ResponseEntity<List<Users>> findAllUsers(){
        return ResponseEntity.ok(usersService.findAll());
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Users> findUserById(@PathVariable Integer id){
        Optional<Users> userToFind = usersService.findById(id);
        if (userToFind.isPresent()){
            return ResponseEntity.ok(userToFind.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findByRole/{role}")
    public ResponseEntity<List<Users>> findUserByRole(@PathVariable String role){
        return ResponseEntity.ok(usersService.findByRole(role));
    }
}
