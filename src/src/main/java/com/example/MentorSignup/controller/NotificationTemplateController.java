package com.example.MentorSignup.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NotificationTemplateController {

    // Updated endpoint to avoid conflict
    @GetMapping("/api/notification-template-list")
    public List<NotificationTemplate> getTemplates() {
        return List.of(
                new NotificationTemplate("Welcome New User", "Welcome to the platform!", "normal"),
                new NotificationTemplate("System Error", "A critical system error occurred.", "critical"),
                new NotificationTemplate("Session Reminder", "Your session starts in 10 minutes.", "high")
        );
    }

    // Inner static class for notification templates
    static class NotificationTemplate {
        private String title;
        private String message;
        private String priority;

        public NotificationTemplate(String title, String message, String priority) {
            this.title = title;
            this.message = message;
            this.priority = priority;
        }

        // Getters and setters omitted for brevity
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getPriority() {
            return priority;
        }

        public void setPriority(String priority) {
            this.priority = priority;
        }
    }
}
