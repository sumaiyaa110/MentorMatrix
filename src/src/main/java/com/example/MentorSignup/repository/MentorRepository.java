package com.example.MentorSignup.repository;

import com.example.MentorSignup.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {
    // Method to find a mentor by their email
    Optional<Mentor> findByEmail(String email);

    // Method to check if a mentor exists by email
    boolean existsByEmail(String email);
}
