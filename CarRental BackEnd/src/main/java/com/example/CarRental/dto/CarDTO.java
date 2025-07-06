package com.example.CarRental.dto;

import com.example.CarRental.Entities.CarCategories;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {

    private String model;


    private Integer year;


    private Double priceADay;


    private Integer doors;


    private String transmition;


    private String mainImgUrl;


    private Boolean available;

    private Integer carCategoryId;
}
