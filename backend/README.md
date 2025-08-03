
# Smart EduPath - Spring Boot Backend

This directory contains the Spring Boot backend for the Smart EduPath application.

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── smartedupath/
│   │   │           ├── controller/
│   │   │           ├── model/
│   │   │           ├── service/
│   │   │           ├── repository/
│   │   │           ├── config/
│   │   │           ├── exception/
│   │   │           └── SmartEduPathApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   └── test/
│       └── java/
│           └── com/
│               └── smartedupath/
└── pom.xml
```

## Setup Instructions

1. Make sure you have Java JDK 17+ installed
2. Make sure you have Maven installed
3. Navigate to the backend directory
4. Run `mvn spring-boot:run` to start the application
5. The backend API will be available at http://localhost:8080

## API Endpoints

### POST /api/recommendations

Generates education path recommendations based on user profile data.

Request body:
```json
{
  "name": "User's name",
  "email": "user@example.com",
  "age": 20,
  "educationLevel": "high-school",
  "fieldOfStudy": "Computer Science",
  "gpa": 3.5,
  "interests": ["technology", "business"],
  "skills": "Programming, Writing, Research",
  "dreamJob": "Software Engineer",
  "jobDescription": "I want to build apps",
  "timeframe": "3-5"
}
```

Response:
```json
[
  {
    "title": "Computer Science Degree Path",
    "description": "A traditional computer science degree...",
    "steps": [
      "Complete a Bachelor's Degree in Computer Science",
      "Build a portfolio of personal projects",
      "..."
    ],
    "timeframe": "4-5 years",
    "institutions": [
      "MIT", 
      "Stanford University",
      "..."
    ]
  }
]
```

## Integration with DeepSeek AI API

The backend integrates with the DeepSeek AI API to generate personalized education path recommendations based on the user's profile information. The API key should be stored in the application.properties file as an environment variable.

## Notes for Implementation

1. Add proper error handling and validation
2. Implement logging for debugging and monitoring
3. Add rate limiting to protect the API from abuse
4. Add authentication for production use
