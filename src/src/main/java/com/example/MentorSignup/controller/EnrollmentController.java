package com.example.MentorSignup.controller;

import com.example.MentorSignup.model.Session;
import com.example.MentorSignup.service.EnrollmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private static final Logger logger = LoggerFactory.getLogger(EnrollmentController.class);

    @Autowired
    private EnrollmentService enrollmentService;

    /**
     * Handles user enrollment requests.
     *
     * @param userId    ID of the user to enroll
     * @param sessionId ID of the session to enroll the user in
     * @return ResponseEntity with the result of the enrollment
     */
    @PostMapping
    public ResponseEntity<String> enrollUser(
            @RequestParam Long userId,
            @RequestParam Long sessionId
    ) {
        logger.info("Enrollment request received for userId: {} and sessionId: {}", userId, sessionId);

        try {
            // Validate inputs
            if (userId == null || sessionId == null) {
                logger.warn("Invalid enrollment request: userId or sessionId is null");
                return ResponseEntity.badRequest().body("Invalid userId or sessionId.");
            }

            // Perform enrollment
            String result = enrollmentService.enrollUser(userId, sessionId);

            // Check result and log appropriate messages
            if ("Enrollment successful.".equals(result)) {
                logger.info("Enrollment successful for userId: {} and sessionId: {}", userId, sessionId);
                return ResponseEntity.ok(result);
            } else {
                logger.warn("Enrollment failed for userId: {} and sessionId: {}. Reason: {}", userId, sessionId, result);
                return ResponseEntity.badRequest().body(result);
            }

        } catch (IllegalArgumentException ex) {
            logger.error("Enrollment failed due to invalid input: {}", ex.getMessage());
            return ResponseEntity.badRequest().body("Invalid input provided: " + ex.getMessage());

        } catch (Exception e) {
            logger.error("Unexpected error during enrollment for userId: {} and sessionId: {}", userId, sessionId, e);
            return ResponseEntity.status(500).body("An unexpected error occurred. Please try again later.");
        }
    }
    @GetMapping("/mentee/{userId}/sessions")
    public ResponseEntity<?> getEnrolledSessionsByMentee(@PathVariable Long userId) {
        logger.info("Fetching enrolled sessions for mentee with userId: {}", userId);

        try {
            // Fetch sessions using the service
            List<Session> enrolledSessions = enrollmentService.getEnrolledSessionsByMentee(userId);
            return ResponseEntity.ok(enrolledSessions);
        } catch (IllegalArgumentException e) {
            logger.error("Error fetching sessions: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error fetching sessions for userId: {}", userId, e);
            return ResponseEntity.status(500).body("An unexpected error occurred. Please try again later.");
        }
    }
    @DeleteMapping("/{enrollmentId}")
    public ResponseEntity<?> unenroll(@PathVariable Long enrollmentId) {
        boolean isDeleted = enrollmentService.unenroll(enrollmentId);
        if (isDeleted) {
            return ResponseEntity.ok("Unenrolled successfully");
        } else {
            return ResponseEntity.status(404).body("Enrollment not found");
        }
    }

}
