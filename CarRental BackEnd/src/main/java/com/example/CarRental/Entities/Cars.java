package com.example.CarRental.Entities;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.Date;

@Entity
@Table(name = "cars")
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    private Integer id;
    @Column(name = "model")
    private String model;
    @Column(name = "year")
    private Integer year;
    @Column(name = "price_a_day")
    private Double priceADay;
    @Column(name = "doors")
    private Integer doors;
    @Column(name = "transmition")
    private String transmition;
    @Column(name = "main_img_url")
    private String mainImgUrl;
    @Column(name = "available")
    private Boolean available;
    @Column(name = "car_category_id")
    private Integer categoryId;

    public Cars() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getPriceADay() {
        return priceADay;
    }

    public void setPriceADay(Double priceADay) {
        this.priceADay = priceADay;
    }

    public Integer getDoors() {
        return doors;
    }

    public void setDoors(Integer doors) {
        this.doors = doors;
    }

    public String getTransmition() {
        return transmition;
    }

    public void setTransmition(String transmition) {
        this.transmition = transmition;
    }

    public String getMainImgUrl() {
        return mainImgUrl;
    }

    public void setMainImgUrl(String mainImgUrl) {
        this.mainImgUrl = mainImgUrl;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}
