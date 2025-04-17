package com.example.MentorSignup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class WebSecurityConfig {

    /**
     * Configures a BCryptPasswordEncoder for password hashing.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the SecurityFilterChain to handle authorization rules and security settings.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF for APIs
                .csrf(csrf -> csrf.disable())

                // Configure authorization rules
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",                // Authentication endpoints
                                "/api/mentor/**",              // Mentor-related endpoints
                                "/api/sessions/**",            // Session-related endpoints
                                "/api/feedback/**",            // Feedback endpoints
                                "/send-notification",          // Real-time notification testing
                                "/api/schedule-notification",  // Scheduling notifications
                                "/api/notification-templates",
                                "/api/enrollments/**"// Notification templates
                        ).permitAll() // Allow public access to these endpoints
                        .anyRequest().authenticated() // All other endpoints require authentication
                )

                // Enable HTTP Basic Authentication
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    /**
     * Configures the AuthenticationManager bean for managing authentication.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
