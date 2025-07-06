package com.example.CarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Date startDate;
    private Date endDate;
    private Integer carId;
    private Integer userId;
    private String status;
}
