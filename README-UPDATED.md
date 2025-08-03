# Smart EduPath

Smart EduPath is an AI-powered education guidance platform designed to help students make informed decisions about their higher education journey. The platform analyzes user profiles and provides personalized educational pathway recommendations.

## Features

- 🎯 Personalized education recommendations
- 🤖 AI-powered pathway analysis using Google Gemini API
- 💼 Career goal alignment
- 📊 Skills and interests assessment
- 🎓 Multiple education path options

## Tech Stack

### Frontend
- React with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- Radix UI components

### Backend
- Java Spring Boot
- Spring Data JPA
- MySQL Database
- Google Gemini AI Integration
- RESTful API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Java 17 or higher
- Maven
- MySQL Server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-edupath.git
   cd smart-edupath
   ```

2. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install
   
   # Start development server (runs on port 5173)
   npm run dev
   ```

3. **Backend Setup**
   
   a. **Database Configuration**
   - Create a MySQL database named `edupath`
   - Update database credentials in `backend/src/main/resources/application.properties`
   
   b. **Environment Configuration**
   - Copy `backend/src/main/resources/application-example.properties` to `application.properties`
   - Replace placeholder values with your actual configuration:
     - `YOUR_GEMINI_API_KEY_HERE`: Your Google Gemini API key
     - `YOUR_DB_USERNAME`: Your MySQL username
     - `YOUR_DB_PASSWORD`: Your MySQL password
   
   c. **Run the Backend**
   ```bash
   cd backend
   mvn clean compile
   mvn spring-boot:run
   ```
   
   The backend will run on `http://localhost:8080`

### API Configuration

The frontend is configured to make API calls to the backend running on port 8080. The main API endpoint is:
- `POST /api/recommendations` - Get personalized education recommendations

### Environment Variables

Create the following configuration files:

#### Backend (`backend/src/main/resources/application.properties`)
```properties
# Replace these values with your actual configuration
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

## Project Structure

```
smart-edupath/
├── frontend files (React/Vite)
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/smartedupath/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── model/       # JPA entities
│   │       └── config/      # Configuration classes
│   └── src/main/resources/
│       └── application.properties
└── README.md
```

## Usage

1. Navigate to `http://localhost:5173` in your browser
2. Fill out the multi-step form with your:
   - Basic information
   - Current education level
   - Interests and skills
   - Career goals
3. Receive personalized education pathway recommendations
4. Download recommendations as PDF (if implemented)

## API Endpoints

- `POST /api/recommendations` - Generate education recommendations
  - Request body: User profile data
  - Response: List of recommended education pathways

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Notes

- Never commit sensitive information like API keys or database passwords
- Use environment variables or configuration files that are git-ignored
- The `application.properties` file contains sensitive data and should not be pushed to the repository

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact: info@smartedupath.com
