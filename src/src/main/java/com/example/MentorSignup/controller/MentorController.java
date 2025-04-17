package com.example.MentorSignup.controller;

import com.example.MentorSignup.model.Mentor;
import com.example.MentorSignup.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @PostMapping("/register")
    public ResponseEntity<?> registerMentor(@RequestBody @Valid Mentor mentor) {
        try {
            Mentor newMentor = mentorService.registerMentor(mentor);
            return ResponseEntity.ok(newMentor);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllMentors() {
        try {
            List<Mentor> mentors = mentorService.getAllMentors();
            return ResponseEntity.ok(mentors);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getMentorByEmail(@RequestParam String email) {
        System.out.println("Received email parameter: " + email); // Debugging
        try {
            Mentor mentor = mentorService.getMentorByEmail(email);
            return ResponseEntity.ok(mentor);
        } catch (IllegalArgumentException e) {
            System.err.println("Error: Mentor not found with email: " + email);
            return ResponseEntity.status(404).body("Mentor not found with email: " + email);
        } catch (Exception e) {
            System.err.println("Internal server error: " + e.getMessage());
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
}



