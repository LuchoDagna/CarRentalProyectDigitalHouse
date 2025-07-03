package com.example.CarRental.Services;

import com.example.CarRental.Entities.Appointments;
import com.example.CarRental.Repositories.IAppointmentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentsService {
    @Autowired
    private IAppointmentsRepository appointmentsRepository;

    public Appointments save(Appointments appointment){
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

    public void update(Appointments appointment){
        appointmentsRepository.save(appointment);
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
        return appointmentsRepository.findByUserId(id);
    }

    public List<Appointments> findByCarId(Integer id){
        return appointmentsRepository.findByCarId(id);
    }
}
