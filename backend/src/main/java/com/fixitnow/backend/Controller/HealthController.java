package com.fixitnow.backend.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "http://localhost:5173")
public class HealthController {
    
    @GetMapping
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "FixItNow Backend");
        response.put("version", "0.0.1-SNAPSHOT");
        response.put("timestamp", System.currentTimeMillis());
        response.put("environment", "Development");
        return response;
    }
}
