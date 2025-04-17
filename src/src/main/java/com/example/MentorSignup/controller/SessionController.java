package com.example.MentorSignup.controller;

import com.example.MentorSignup.model.Session;
import com.example.MentorSignup.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // Retrieve all sessions
    @GetMapping
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    // Save a new session
    @PostMapping
    public ResponseEntity<?> saveSession(@RequestParam Long userId, @RequestBody Session session) {
        try {
            return ResponseEntity.ok(sessionService.saveSession(userId, session));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete a session by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSession(@PathVariable Long id) {
        boolean isDeleted = sessionService.deleteSessionById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.status(404).body("Session not found"); // HTTP 404 Not Found
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Session>> getSessionsByUserId(@PathVariable Long userId) {
        try {
            List<Session> sessions = sessionService.getSessionsByUserId(userId);
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
