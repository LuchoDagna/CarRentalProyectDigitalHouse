package com.example.CarRental.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "car_imgs")
public class CarImgs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_imgs_id")
    private Integer id;
    private String url;
    @Column(name = "car_id")
    private Integer carId;

    public CarImgs() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getCarId() {
        return carId;
    }

    public void setCarId(Integer carId) {
        this.carId = carId;
    }
}
