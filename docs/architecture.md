# System Architecture

## Overview
The Mentor-Mentee Scheduling System is built as a full-stack web application using:

- **Frontend**: React (JavaScript)
- **Backend**: Spring Boot (Java)
- **Database**: MySQL

## Layers Breakdown

### 1. Frontend (React)
- Auth pages (Login, Register)
- User Dashboard (Different for Mentor/Mentee)
- Session Management UI
- Feedback submission

### 2. Backend (Spring Boot)
- REST APIs for CRUD operations
- JWT-based Authentication
- Session Scheduling Logic
- Role-based Access Control

### 3. Database (MySQL)
- Tables: Users, Sessions, Feedback, Expertise
- Relationships: One-to-Many (Mentor → Sessions), Many-to-Many (Mentees ↔ Sessions)

## Communication Flow
1. User interacts via UI
2. React calls Spring Boot APIs
3. Backend fetches/saves data to MySQL
