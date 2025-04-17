package com.example.MentorSignup.controller;

import com.example.MentorSignup.model.Notification;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @PostMapping("/schedule-notification")
    public ResponseEntity<String> scheduleNotification(@RequestBody NotificationRequest request) {
        if (request.getMessage() == null || request.getPriority() == null || request.getScheduleTime() == null || request.getRecipients() == null) {
            return ResponseEntity.badRequest().body("Invalid request payload");
        }

        // Logic to process the notification
        // e.g., save to database or schedule with a task scheduler

        return ResponseEntity.ok("Notification scheduled successfully");
    }
}

class NotificationRequest {
    private String message;
    private String priority;
    private String scheduleTime;
    private List<String> recipients;

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getScheduleTime() { return scheduleTime; }
    public void setScheduleTime(String scheduleTime) { this.scheduleTime = scheduleTime; }

    public List<String> getRecipients() { return recipients; }
    public void setRecipients(List<String> recipients) { this.recipients = recipients; }
}
