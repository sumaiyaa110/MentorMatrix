package com.example.MentorSignup.repository;

import com.example.MentorSignup.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findBySessionId(Long sessionId);
    boolean existsByUserIdAndSessionId(Long userId, Long sessionId);
}
