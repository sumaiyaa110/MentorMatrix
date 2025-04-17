package com.example.MentorSignup.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String time;
    private String topic;
    private String description;

    @Column(nullable = false)
    private Integer maxSlots = 20; // Maximum allowed slots

    @Column(nullable = false)
    private Integer currentSlots = 0; // Tracks the number of enrolled users

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user; // Relationship with the user who created the session

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Enrollment> enrollments; // Relationship with Enrollment entity

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getMaxSlots() {
        return maxSlots;
    }

    public void setMaxSlots(Integer maxSlots) {
        this.maxSlots = maxSlots;
    }

    public Integer getCurrentSlots() {
        return currentSlots;
    }

    public void setCurrentSlots(Integer currentSlots) {
        this.currentSlots = currentSlots;
    }

    public List<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    // Method to check availability
    public boolean isAvailable() {
        return currentSlots < maxSlots;
    }

    // Method to increment current slots
    public void incrementCurrentSlots() {
        if (isAvailable()) {
            this.currentSlots++;
        } else {
            throw new IllegalStateException("No slots available for this session.");
        }
    }
}
