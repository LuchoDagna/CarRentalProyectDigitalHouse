package com.example.CarRental.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCarDTO {
    private Integer id;

    private String model;

    private Integer year;

    private Double priceADay;

    private Integer doors;

    private String transmition;

    private String mainImgUrl;

    private Boolean available;

    private Integer carCategoryId;
}
