package com.example.CarRental.auth;

import com.example.CarRental.Entities.Users;
import com.example.CarRental.Repositories.IUsersRepository;
import com.example.CarRental.configuration.JwtService;
import com.example.CarRental.dto.AuthRequest;
import com.example.CarRental.dto.AuthResponse;
import com.example.CarRental.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private  final IUsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register (RegisterRequest registerRequest){
        Users user = Users.builder()
                .name(registerRequest.getFirstname())
                .lastName(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role("USER")
                .build();
        usersRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .firstName(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        String jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .firstName(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

}
