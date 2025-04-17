package com.example.MentorSignup.service;

import com.example.MentorSignup.model.Session;
import com.example.MentorSignup.model.User;
import com.example.MentorSignup.repository.SessionRepository;
import com.example.MentorSignup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session saveSession(Long userId, Session session) {
        // Check if a session already exists for the same date and time
        Optional<Session> existingSession = sessionRepository.findByDateAndTime(session.getDate(), session.getTime());
        if (existingSession.isPresent()) {
            throw new IllegalArgumentException("A session is already scheduled at this date and time.");
        }

        // Retrieve user by ID and set it as the foreign key for the session
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        session.setUser(user);

        return sessionRepository.save(session);
    }

    public boolean deleteSessionById(Long id) {
        if (sessionRepository.existsById(id)) {
            sessionRepository.deleteById(id);
            return true; // Successfully deleted
        }
        return false; // Session with the given ID does not exist
    }
    public List<Session> getSessionsByUserId(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

}
