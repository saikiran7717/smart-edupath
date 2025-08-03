# 🎓 Smart EduPath

> **AI-Powered Education Guidance Platform**

Smart EduPath is an intelligent education guidance platform that leverages AI to provide personalized higher education recommendations. Our platform analyzes user profiles, interests, and career goals to suggest the most suitable educational pathways for achieving their dreams.

![GitHub repo size](https://img.shields.io/github/repo-size/saikiran7717/smart-edupath)
![GitHub last commit](https://img.shields.io/github/last-commit/saikiran7717/smart-edupath)
![GitHub issues](https://img.shields.io/github/issues/saikiran7717/smart-edupath)
![GitHub stars](https://img.shields.io/github/stars/saikiran7717/smart-edupath)

## 🌟 Features

- **🎯 Personalized Recommendations**: AI-powered analysis of user profiles to suggest ideal education paths
- **🤖 Google Gemini Integration**: Advanced AI capabilities for intelligent pathway generation
- **📊 Multi-Step Assessment**: Comprehensive form covering interests, skills, and career goals
- **💼 Career Alignment**: Recommendations aligned with specific career objectives
- **📱 Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS
- **🔒 Secure Backend**: Spring Boot API with proper CORS configuration and security measures
- **📈 Progress Tracking**: Visual progress indicators throughout the assessment process

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI components library
- **State Management**: React Hooks
- **Development Server**: Runs on port 5173

### Backend
- **Framework**: Java Spring Boot
- **Database**: MySQL with JPA/Hibernate
- **AI Integration**: Google Gemini 2.0 Flash API
- **Security**: CORS configuration, rate limiting
- **API**: RESTful endpoints
- **Server**: Runs on port 8080

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Version Control**: Git
- **IDE Support**: VS Code configuration included

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **Java** (JDK 17 or higher) - [Download here](https://adoptium.net/)
- **Maven** (3.6+ or use included wrapper)
- **MySQL** (8.0+) - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/saikiran7717/smart-edupath.git
cd smart-edupath
```

#### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev
```

#### 3. Database Setup
```sql
-- Create database
CREATE DATABASE edupath;

-- Create user (optional, or use existing MySQL user)
CREATE USER 'edupath_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON edupath.* TO 'edupath_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 4. Backend Configuration
```bash
# Navigate to backend directory
cd backend

# Copy example configuration
cp src/main/resources/application-example.properties src/main/resources/application.properties
```

**Edit `backend/src/main/resources/application.properties`:**
```properties
# Replace with your actual values
gemini.api.key=YOUR_ACTUAL_GEMINI_API_KEY
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.datasource.url=jdbc:mysql://localhost:3306/edupath
```

#### 5. Start Backend Server
```bash
# Clean and compile
mvn clean compile

# Run the application (runs on http://localhost:8080)
mvn spring-boot:run
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `gemini.api.key` | Google Gemini API key | ✅ | - |
| `spring.datasource.username` | Database username | ✅ | - |
| `spring.datasource.password` | Database password | ✅ | - |
| `spring.datasource.url` | Database connection URL | ✅ | `jdbc:mysql://localhost:3306/edupath` |
| `server.port` | Backend server port | ❌ | `8080` |

### Getting API Keys

1. **Google Gemini API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your configuration

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:8080`
- **API Prefix**: `/api`

### Endpoints

#### POST `/api/recommendations`
Generate personalized education recommendations based on user profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "educationLevel": "high-school",
  "fieldOfStudy": "Computer Science",
  "gpa": 8.5,
  "interests": ["technology", "science", "engineering"],
  "skills": "Programming, Problem Solving, Mathematics",
  "dreamJob": "Software Engineer",
  "jobDescription": "I want to develop innovative software solutions",
  "timeframe": "3-5"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "title": "Computer Science Degree Path",
      "description": "Traditional CS education with strong foundations",
      "steps": [
        "Complete Bachelor's in Computer Science (4 years)",
        "Build portfolio projects",
        "Gain internship experience"
      ],
      "timeframe": "4-5 years",
      "institutions": ["MIT", "Stanford", "Carnegie Mellon"]
    }
  ],
  "userProfile": { /* user data */ }
}
```

## 🗂️ Project Structure

```
smart-edupath/
├── 📁 backend/                    # Spring Boot backend
│   ├── 📁 src/main/java/
│   │   └── 📁 com/smartedupath/
│   │       ├── 📁 config/         # Configuration classes
│   │       ├── 📁 controller/     # REST controllers
│   │       ├── 📁 model/          # JPA entities
│   │       ├── 📁 service/        # Business logic
│   │       └── 📁 repo/           # Data repositories
│   ├── 📁 src/main/resources/
│   │   ├── application.properties # Main configuration
│   │   └── application-example.properties # Template
│   └── pom.xml                    # Maven dependencies
├── 📁 src/                        # React frontend
│   ├── 📁 components/ui/          # Reusable UI components
│   ├── 📁 pages/                  # Page components
│   ├── 📁 scripts/                # JavaScript utilities
│   ├── 📁 styles/                 # CSS stylesheets
│   └── 📁 hooks/                  # Custom React hooks
├── 📁 public/                     # Static assets
├── package.json                   # Frontend dependencies
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind CSS config
└── README.md                      # Project documentation
```

## 🎨 UI Components

Built with a comprehensive set of modern UI components:

- **Forms**: Multi-step form with validation
- **Navigation**: Progress tracking and breadcrumbs
- **Feedback**: Loading states, success/error messages
- **Layout**: Responsive grid and container systems
- **Interactive**: Buttons, checkboxes, dropdowns, and more

## 🔒 Security Features

- **Data Protection**: Sensitive information excluded from repository
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Rate Limiting**: API endpoint protection against abuse
- **Input Validation**: Form data sanitization and validation
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Deployment
```bash
# Create production JAR
mvn clean package

# Run production JAR
java -jar target/smart-edupath-0.0.1-SNAPSHOT.jar
```

## 🧪 Testing

### Frontend Tests
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Backend Tests
```bash
# Run unit tests
mvn test

# Run integration tests
mvn verify
```

## 📝 Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Scripts
```bash
mvn clean compile    # Clean and compile
mvn spring-boot:run  # Run development server
mvn test            # Run tests
mvn package         # Build JAR file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript/Java coding standards
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📊 Performance

- **Frontend**: Optimized React components with lazy loading
- **Backend**: Efficient database queries with JPA optimization
- **AI Integration**: Cached responses for improved performance
- **Build**: Minified and compressed production builds

## 🔍 Troubleshooting

### Common Issues

**Frontend won't start:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Backend connection errors:**
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

**API key issues:**
- Verify Gemini API key is valid
- Check API quota and billing status
- Ensure proper environment configuration

## 👥 Authors

- **Sai Kiran** - *Initial work* - [@saikiran7717](https://github.com/saikiran7717)

## 🙏 Acknowledgments

- Google Gemini AI for intelligent recommendations
- Radix UI for beautiful component primitives
- Tailwind CSS for utility-first styling
- Spring Boot community for excellent documentation
- React community for continuous innovation

---

<div align="center">
  <p>Made with ❤️ for students seeking their ideal education path</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
