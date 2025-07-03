package com.example.CarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

}
