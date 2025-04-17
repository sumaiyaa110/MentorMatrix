package com.example.MentorSignup.controller;

import com.example.MentorSignup.model.User;
import com.example.MentorSignup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> signupUser(@RequestBody @Valid User user) {
        try {
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String role
    ) {
        try {
            User user = userService.authenticateUser(email, password);
            if (user != null) {
                if (user.getRole().equals(role)) {
                    return ResponseEntity.ok(
                            Map.of(
                                    "message", "Login successful",
                                    "id", user.getId(),                // Include user ID
                                    "role", user.getRole(),
                                    "firstName", user.getFirstName(),
                                    "lastName", user.getLastName(),
                                    "email", user.getEmail(),
                                    "gender", user.getGender(),        // Include gender
                                    "about", user.getAbout()           // Include about
                            )
                    );
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Role mismatch. Access denied.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(
                    Map.of(
                            "id", user.getId(),
                            "firstName", user.getFirstName(),
                            "lastName", user.getLastName(),
                            "email", user.getEmail(),
                            "role", user.getRole(),
                            "gender", user.getGender(),
                            "about", user.getAbout()
                    )
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
