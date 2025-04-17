package com.example.MentorSignup.service;

import com.example.MentorSignup.model.Notification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class NotificationScheduler {

    @Scheduled(fixedRate = 60000) // Run every minute
    public void sendScheduledNotifications() {
        // Logic to fetch scheduled notifications and send them
        System.out.println("Checking for scheduled notifications...");
    }
}
