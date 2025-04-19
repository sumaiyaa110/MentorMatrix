# API Specifications

All APIs use JSON and follow RESTful conventions. JWT is used for authentication.

## Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get token

## Mentors
- `GET /api/mentors` — List all mentors
- `GET /api/mentors/{id}` — View mentor profile

## Sessions
- `POST /api/sessions` — Create a new session (Mentor only)
- `GET /api/sessions` — Get available sessions
- `POST /api/sessions/enroll/{id}` — Enroll in a session

## Feedback
- `POST /api/feedback/{sessionId}` — Leave feedback
- `GET /api/feedback/mentor/{id}` — View feedback for a mentor
