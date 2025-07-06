package com.example.CarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarImgDTO {
    private Integer id;
    private String url;
    private Integer carId;
}
