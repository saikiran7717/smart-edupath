
// Mock API response for development - Will be replaced with actual API call
async function getEducationPathRecommendations(userData) {
  // In production, this function would make an actual API call to the backend
  console.log('User data sent to API:', userData);
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate recommendations based on user data
      const recommendations = callSpringBootAPI(userData);
      resolve(recommendations);
    }, 2000); // 2 second delay to simulate API call
  });
}

// Generate mock recommendations based on user profile
// This will be replaced by actual API integration with Spring Boot backend
function generateMockRecommendations(userData) {
  const recommendations = [];
  
  // Basic recommendation based on dream job
  if (userData.dreamJob) {
    const dreamJob = userData.dreamJob.toLowerCase();
    
    // Software Engineer / Developer path
    if (dreamJob.includes('software') || dreamJob.includes('developer') || dreamJob.includes('programmer')) {
      recommendations.push({
        title: 'Computer Science Degree Path',
        description: 'A traditional computer science degree provides strong foundations in programming, algorithms, and software development concepts.',
        steps: [
          'Complete a Bachelor\'s Degree in Computer Science (4 years)',
          'Build a portfolio of personal projects during your studies',
          'Consider internships at tech companies during summer breaks',
          'Explore specialized courses in your area of interest (web development, AI, etc.)'
        ],
        timeframe: '4-5 years',
        institutions: ['MIT', 'Stanford University', 'Carnegie Mellon', 'UC Berkeley']
      });
      
      recommendations.push({
        title: 'Coding Bootcamp + Self Learning Path',
        description: 'An accelerated path focusing on practical skills and rapid entry into the job market.',
        steps: [
          'Complete a 3-6 month intensive coding bootcamp',
          'Build a strong portfolio of projects',
          'Contribute to open source projects',
          'Network with industry professionals'
        ],
        timeframe: '6-12 months',
        institutions: ['App Academy', 'Flatiron School', 'General Assembly', 'Hack Reactor']
      });
    }
    
    // Data Scientist path
    else if (dreamJob.includes('data') || dreamJob.includes('analyst') || dreamJob.includes('science')) {
      recommendations.push({
        title: 'Data Science Master\'s Degree Path',
        description: 'A comprehensive education in statistical methods, machine learning, and data analysis techniques.',
        steps: [
          'Complete a Bachelor\'s in a quantitative field (Statistics, Computer Science, Mathematics)',
          'Pursue a Master\'s Degree in Data Science or related field',
          'Develop expertise in Python, R, and SQL',
          'Build a portfolio of data analysis projects'
        ],
        timeframe: '5-6 years',
        institutions: ['Stanford University', 'UC Berkeley', 'University of Washington', 'Georgia Tech']
      });
      
      recommendations.push({
        title: 'Online Certification + Projects Path',
        description: 'A flexible, self-paced approach to learning data science skills while building practical experience.',
        steps: [
          'Complete online specializations in Data Science (Coursera, edX)',
          'Earn industry certifications (Google Data Analytics, IBM Data Science)',
          'Participate in data competitions (Kaggle)',
          'Create a portfolio of data analysis projects'
        ],
        timeframe: '1-2 years',
        institutions: ['Coursera', 'edX', 'DataCamp', 'Udacity']
      });
    }
    
    // Doctor / Medical path
    else if (dreamJob.includes('doctor') || dreamJob.includes('medical') || dreamJob.includes('physician')) {
      recommendations.push({
        title: 'Traditional Medical Doctor Path',
        description: 'The comprehensive path to becoming a licensed physician through formal medical education.',
        steps: [
          'Complete a Bachelor\'s Degree with pre-med requirements (4 years)',
          'Attend Medical School (4 years)',
          'Complete Residency in your specialty (3-7 years)',
          'Obtain medical license and board certification'
        ],
        timeframe: '11-15 years',
        institutions: ['Harvard Medical School', 'Johns Hopkins University', 'Stanford Medicine', 'Mayo Clinic School of Medicine']
      });
    }
    
    // Business / Management path
    else if (dreamJob.includes('business') || dreamJob.includes('manager') || dreamJob.includes('entrepreneur')) {
      recommendations.push({
        title: 'MBA Path',
        description: 'A business-focused education to develop management, leadership, and strategic planning skills.',
        steps: [
          'Complete a Bachelor\'s Degree in Business or related field',
          'Gain 2-5 years of work experience',
          'Pursue an MBA with concentration in your area of interest',
          'Build a professional network through internships and events'
        ],
        timeframe: '6-8 years',
        institutions: ['Harvard Business School', 'Stanford GSB', 'Wharton School', 'MIT Sloan']
      });
      
      recommendations.push({
        title: 'Entrepreneurship + Online Learning Path',
        description: 'A hands-on approach to building business skills through practical experience and targeted learning.',
        steps: [
          'Complete online business courses and certifications',
          'Start small business projects to gain experience',
          'Find a mentor in your industry',
          'Build a network of contacts and potential investors'
        ],
        timeframe: '2-4 years',
        institutions: ['Y Combinator Startup School', 'edX Business Courses', 'Coursera Business Specializations']
      });
    }
  }
  
  // If no specific recommendations could be generated, add generic ones
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Personalized Degree Program',
      description: 'Based on your profile, we recommend pursuing a degree program aligned with your interests and career goals.',
      steps: [
        'Research universities offering programs in your field of interest',
        'Connect with professionals in your target industry',
        'Gain practical experience through internships',
        'Build a portfolio showcasing your skills'
      ],
      timeframe: '3-5 years'
    });
    
    recommendations.push({
      title: 'Professional Certification Path',
      description: 'Enhance your skills and credentials through industry-recognized certifications and practical experience.',
      steps: [
        'Identify key certifications valued in your target industry',
        'Complete online or in-person certification courses',
        'Apply skills through practical projects or internships',
        'Build a professional network in your field'
      ],
      timeframe: '1-2 years'
    });
  }
  
  return recommendations;
}

// Function to make API call to the Java Spring Boot backend
// This will replace the mock API call in production
async function callSpringBootAPI(userData) {
  try {
    const response = await fetch('http://localhost:8080/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}
