package com.example.MentorSignup.service;

import com.example.MentorSignup.model.Mentor;
import com.example.MentorSignup.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorService {

    @Autowired
    private MentorRepository mentorRepository;

    public Mentor registerMentor(Mentor mentor) {
        if (mentorRepository.existsByEmail(mentor.getEmail())) {
            throw new IllegalArgumentException("A mentor with this email already exists.");
        }
        return mentorRepository.save(mentor);
    }

    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    public Mentor getMentorByEmail(String email) {
        return mentorRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Mentor not found with email: " + email));
    }
}

