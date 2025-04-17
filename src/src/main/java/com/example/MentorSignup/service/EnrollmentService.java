package com.example.MentorSignup.service;

import com.example.MentorSignup.model.Enrollment;
import com.example.MentorSignup.model.Session;
import com.example.MentorSignup.model.User;
import com.example.MentorSignup.repository.EnrollmentRepository;
import com.example.MentorSignup.repository.SessionRepository;
import com.example.MentorSignup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import java.time.format.DateTimeFormatter;

@Service
public class EnrollmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public String enrollUser(Long userId, Long sessionId) {
        // Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        // Validate session
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found."));

        // Check if session is full
        if (session.getCurrentSlots() >= session.getMaxSlots()) {
            return "Session is already full.";
        }

        // Check if the user is already enrolled in the session
        if (enrollmentRepository.existsByUserIdAndSessionId(userId, sessionId)) {
            return "User is already enrolled in this session.";
        }

        // Create enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setSession(session);
        enrollment.setStatus("Enrolled");
        enrollment.setEnrollmentDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        enrollmentRepository.save(enrollment);

        // Update session slots
        synchronized (session) {
            session.setCurrentSlots(session.getCurrentSlots() + 1);
            sessionRepository.save(session);
        }

        return "Enrollment successful.";
    }
    public List<Session> getEnrolledSessionsByMentee(Long userId) {
        // Validate user existence
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        // Fetch enrollments for the user
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);

        // Map enrollments to sessions
        return enrollments.stream()
                .map(Enrollment::getSession)
                .toList();
    }
    public boolean unenroll(Long enrollmentId) {
        if (enrollmentRepository.existsById(enrollmentId)) {
            enrollmentRepository.deleteById(enrollmentId);
            return true;
        }
        return false;
    }


}
