package com.fixitnow.backend.Controller;

import com.fixitnow.backend.Repository.BookingRepository;
import com.fixitnow.backend.Model.Booking;
import com.fixitnow.backend.Model.Review;
import com.fixitnow.backend.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired private ReviewRepository reviewRepo;
    @Autowired private BookingRepository bookingRepo;

    @PostMapping
    public Review add(@RequestBody Review review, @RequestParam Long bookId) {
        Booking booking = bookingRepo.findById(bookId).orElseThrow();
        review.setBooking(booking);
        return reviewRepo.save(review);
    }

    @GetMapping("/booking/{bookId}")
    public Review getByBooking(@PathVariable Long bookId) {
        return reviewRepo.findByBooking(bookingRepo.findById(bookId).orElseThrow());
    }
}