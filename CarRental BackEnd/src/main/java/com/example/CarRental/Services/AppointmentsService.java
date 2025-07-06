package com.example.CarRental.Services;

import com.example.CarRental.Entities.Appointments;
import com.example.CarRental.Entities.Cars;
import com.example.CarRental.Entities.Users;
import com.example.CarRental.Repositories.IAppointmentsRepository;
import com.example.CarRental.Repositories.ICarsRepository;
import com.example.CarRental.Repositories.IUsersRepository;
import com.example.CarRental.dto.AppointmentDTO;
import com.example.CarRental.dto.UpdateAppointmentDTO;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentsService {
    @Autowired
    private IAppointmentsRepository appointmentsRepository;
    @Autowired
    private IUsersRepository usersRepository;
    @Autowired
    private ICarsRepository carsRepository;

    public Appointments save(AppointmentDTO dto){
        Users user = usersRepository.findById(dto.getUserId())
                .orElseThrow(()->new RuntimeException("User not Found"));
        Cars car = carsRepository.findById(dto.getCarId())
                .orElseThrow(()->new RuntimeException("Car not found"));
        Appointments appointment = Appointments.builder()
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .status(dto.getStatus())
                .user(user)
                .car(car)
                .build();
       return appointmentsRepository.save(appointment);
    }

    public void deleteById(Integer id) throws Exception{
        Optional<Appointments> appointmentToLookFor = appointmentsRepository.findById(id);
        if (appointmentToLookFor.isPresent()){
            appointmentsRepository.deleteById(id);
        }
        else{
            throw new Exception("No se encuentra el id: "+ id);
        }
    }

    public void update(UpdateAppointmentDTO dto){
        Appointments existing = appointmentsRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Cars car = carsRepository.findById(dto.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        Users user = usersRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setStatus(dto.getStatus());
        existing.setCar(car);
        existing.setUser(user);

        appointmentsRepository.save(existing);
    }

    public Optional<Appointments> findById(Integer id){
        return appointmentsRepository.findById(id);
    }

    public List<Appointments> findAll(){
        return appointmentsRepository.findAll();
    }

    public List<Appointments> findByStatus(String status){
        return appointmentsRepository.findByStatus(status);
    }

    public List<Appointments> findByUserId(Integer id){
        return appointmentsRepository.findByUser_Id(id);
    }

    public List<Appointments> findByCarId(Integer id){
        return appointmentsRepository.findByCar_Id(id);
    }
}
