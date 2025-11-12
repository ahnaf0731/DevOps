package com.fixitnow.backend.Controller;

import com.fixitnow.backend.Repository.BookingRepository;
import com.fixitnow.backend.Model.Booking;
import com.fixitnow.backend.Model.Service;
import com.fixitnow.backend.Model.User;
import com.fixitnow.backend.Repository.ServiceRepository;
import com.fixitnow.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
    @Autowired private BookingRepository bookingRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ServiceRepository serviceRepo;

    @PostMapping
    public Booking book(@RequestBody Booking booking, @RequestParam Long customerId, @RequestParam Long serviceId) {
        User customer = userRepo.findById(customerId).orElseThrow();
        Service service = serviceRepo.findById(serviceId).orElseThrow();
        booking.setCustomer(customer);
        booking.setService(service);
        booking.setBookingDate(LocalDate.now());
        booking.setStatus("PENDING");
        return bookingRepo.save(booking);
    }

    @GetMapping("/customer/{customerId}")
    public List<Booking> getByCustomer(@PathVariable Long customerId) {
        User customer = userRepo.findById(customerId).orElseThrow();
        return bookingRepo.findByCustomer(customer);
    }
}