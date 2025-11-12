package com.fixitnow.backend.Controller;

import com.fixitnow.backend.Model.User;
import com.fixitnow.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepo;





    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(409).body(
                    Map.of(
                            "error", "Conflict",
                            "message", "Email already in use",
                            "timestamp", LocalDateTime.now(),
                            "path", "/api/auth/register"
                    )
            );
        }
        User saved = userRepo.save(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User found = userRepo.findByEmail(user.getEmail());
        if (found == null || !found.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body(
                    Map.of(
                            "error", "Unauthorized",
                            "message", "Invalid email or password",
                            "timestamp", LocalDateTime.now(),
                            "path", "/api/auth/login"
                    )
            );
        }
        return ResponseEntity.ok(found);
    }
}