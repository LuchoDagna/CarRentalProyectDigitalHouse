package com.example.CarRental.Controllers;


import com.example.CarRental.Entities.Appointments;
import com.example.CarRental.Entities.Cars;
import com.example.CarRental.Services.AppointmentsService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentsController {
    private final AppointmentsService appointmentsService;

    @Autowired
    public AppointmentsController(AppointmentsService appointmentsService) {
        this.appointmentsService = appointmentsService;
    }

    @PostMapping("/save")
    public ResponseEntity<Appointments> saveAppointment(@RequestBody Appointments appointment){
        return ResponseEntity.ok(appointmentsService.save(appointment));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Appointments>> findAll(){
        return ResponseEntity.ok(appointmentsService.findAll());
    }
    @GetMapping("/findByStatus/{status}")
    public ResponseEntity<List<Appointments>> findByStatus(@PathVariable String status){
        return ResponseEntity.ok(appointmentsService.findByStatus(status));
    }
    @GetMapping("/findByCarId/{carId}")
    public ResponseEntity<List<Appointments>> findByCarId(@PathVariable Integer carId){
        return ResponseEntity.ok(appointmentsService.findByCarId(carId));
    }
    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<List<Appointments>> findByUserId(@PathVariable Integer userId){
        return ResponseEntity.ok(appointmentsService.findByUserId(userId));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAppointment(@RequestBody Appointments appointment) {
        ResponseEntity<String> response;
        Optional<Appointments> userToLookFor = appointmentsService.findById(appointment.getId());
        if (userToLookFor.isPresent()){
            appointmentsService.update(appointment);
            response = ResponseEntity.ok("El appointment se actualizo correctamente");
        }
        else{
            response = ResponseEntity.ok("No se encontró el appointment con ese id");
        }
        return response;

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws Exception {
        Optional<Appointments> appointmentToLookFor = appointmentsService.findById(id);
        if (appointmentToLookFor.isPresent()){
            appointmentsService.deleteById(id);
            return ResponseEntity.ok("Se elimino correctamente la reserva con id: "+ id);
        }
        else{
            return ResponseEntity.ok("No se eliminó ninguna reserva porque no existe el id: " + id);
        }
    }
}
