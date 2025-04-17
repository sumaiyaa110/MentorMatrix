package com.example.MentorSignup.repository;

import com.example.MentorSignup.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduledNotificationRepository extends JpaRepository<Notification, Long> {
}
