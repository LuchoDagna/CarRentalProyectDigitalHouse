package com.example.CarRental.auth;

import com.example.CarRental.dto.AuthRequest;
import com.example.CarRental.dto.AuthResponse;
import com.example.CarRental.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }
}
