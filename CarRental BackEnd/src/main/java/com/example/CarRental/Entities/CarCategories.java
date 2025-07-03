package com.example.CarRental.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "car_categories")
public class CarCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_category_id")
    private Integer id;
    private String name;

    public CarCategories() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
