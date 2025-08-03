
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const getStartedBtn = document.getElementById('get-started-btn');
  const formSection = document.getElementById('form-section');
  const formSteps = document.querySelectorAll('.form-step');
  const nextBtns = document.querySelectorAll('.btn-next');
  const prevBtns = document.querySelectorAll('.btn-prev');
  const progressSteps = document.querySelectorAll('.progress-step');
  const eduPathForm = document.getElementById('edupath-form');
  const resultsSection = document.getElementById('results-section');
  const loadingSpinner = document.querySelector('.loading-spinner');
  const resultsContent = document.querySelector('.results-content');
  const newSearchBtn = document.getElementById('new-search');
  const downloadPdfBtn = document.getElementById('download-pdf');

  // Scroll to form when "Get Started" button is clicked
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
      formSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Form navigation
  nextBtns.forEach(button => {
    button.addEventListener('click', function() {
      // Get the current active step
      const currentStep = document.querySelector('.form-step.active');
      const currentStepIndex = Array.from(formSteps).indexOf(currentStep);
      
      // Validate the current step before proceeding
      if (validateStep(currentStepIndex + 1)) {
        // Hide current step
        currentStep.classList.remove('active');
        
        // Show next step
        formSteps[currentStepIndex + 1].classList.add('active');
        
        // Update progress tracker
        updateProgressTracker(currentStepIndex + 1);
      }
    });
  });

  prevBtns.forEach(button => {
    button.addEventListener('click', function() {
      // Get the current active step
      const currentStep = document.querySelector('.form-step.active');
      const currentStepIndex = Array.from(formSteps).indexOf(currentStep);
      
      // Hide current step
      currentStep.classList.remove('active');
      
      // Show previous step
      formSteps[currentStepIndex - 1].classList.add('active');
      
      // Update progress tracker
      updateProgressTracker(currentStepIndex - 1);
    });
  });

  // Update progress tracker
  function updateProgressTracker(stepIndex) {
    progressSteps.forEach((step, index) => {
      if (index <= stepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
    
    // Also update progress lines if needed
    const progressLines = document.querySelectorAll('.progress-line');
    progressLines.forEach((line, index) => {
      if (index < stepIndex) {
        line.style.backgroundColor = 'var(--primary-color)';
      } else {
        line.style.backgroundColor = 'var(--bg-dark)';
      }
    });
  }

  // Form validation
  function validateStep(stepNumber) {
    const currentStep = document.getElementById(`step-${stepNumber}`);
    
    if (stepNumber === 1) {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;
      
      if (!name || !email || !age) {
        alert('Please fill in all required fields.');
        return false;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
      
      return true;
    } 
    else if (stepNumber === 2) {
      const educationLevel = document.getElementById('education-level').value;
      
      if (!educationLevel) {
        alert('Please select your current education level.');
        return false;
      }
      
      return true;
    }
    else if (stepNumber === 3) {
      const interests = document.querySelectorAll('input[name="interests"]:checked');
      
      if (interests.length < 3) {
        alert('Please select at least 3 areas of interest.');
        return false;
      }
      
      return true;
    }
    
    return true;
  }

  // Form submission
  if (eduPathForm) {
    eduPathForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate the last step
      if (!validateStep(4)) {
        return;
      }
      
      // Show results section
      formSection.classList.add('hidden');
      resultsSection.classList.remove('hidden');
      
      // Show loading spinner
      loadingSpinner.classList.remove('hidden');
      resultsContent.innerHTML = '';
      
      // Get form data
      const formData = new FormData(eduPathForm);
      const userData = Object.fromEntries(formData.entries());
      
      // Handle multiple selections for checkboxes
      userData.interests = [];
      document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        userData.interests.push(checkbox.value);
      });
      
      // Call API to get recommendations
      getEducationPathRecommendations(userData)
        .then(response => {
          // Hide loading spinner
          loadingSpinner.classList.add('hidden');
          
          // Display results
          displayResults(response);
          
          // Scroll to results
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
          console.error('Error fetching recommendations:', error);
          loadingSpinner.classList.add('hidden');
          resultsContent.innerHTML = `
            <div class="error-message">
              <h3>Oops! Something went wrong</h3>
              <p>We couldn't generate your education path recommendations. Please try again later.</p>
              <button id="try-again" class="btn btn-primary">Try Again</button>
            </div>
          `;
          
          document.getElementById('try-again').addEventListener('click', function() {
            formSection.classList.remove('hidden');
            resultsSection.classList.add('hidden');
          });
        });
    });
  }

  // Display results
  function displayResults(recommendations) {
    if (!recommendations || recommendations.length === 0) {
      resultsContent.innerHTML = `
        <div class="no-results">
          <h3>No Recommendations Found</h3>
          <p>We couldn't find suitable education path recommendations based on your profile. Please try again with different information.</p>
        </div>
      `;
      return;
    }
    
    let resultsHTML = '';
    
    // Add user summary
    resultsHTML += `
      <div class="user-summary">
        <h3>Your Profile Summary</h3>
        <p><strong>Current Education:</strong> ${document.getElementById('education-level').options[document.getElementById('education-level').selectedIndex].text}</p>
        <p><strong>Field of Study:</strong> ${document.getElementById('field-of-study').value || 'Not specified'}</p>
        <p><strong>Dream Career:</strong> ${document.getElementById('dream-job').value}</p>
      </div>
    `;
    
    // Add path recommendations
    resultsHTML += `<h3 class="recommendations-title">Recommended Education Paths</h3>`;
    
    recommendations.forEach((path, index) => {
      resultsHTML += `
        <div class="pathway-card">
          <h3>${path.title || `Pathway Option ${index + 1}`}</h3>
          <p>${path.description || ''}</p>
          
          ${path.steps ? `
            <h4>Steps to Follow:</h4>
            <ul>
              ${path.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          ` : ''}
          
          ${path.timeframe ? `<p><strong>Estimated Timeframe:</strong> ${path.timeframe}</p>` : ''}
          ${path.institutions ? `<p><strong>Recommended Institutions:</strong> ${path.institutions.join(', ')}</p>` : ''}
        </div>
      `;
    });
    
    // Add additional resources
    resultsHTML += `
      <div class="additional-resources">
        <h3>Additional Resources</h3>
        <ul>
          <li><a href="https://www.coursera.org" target="_blank">Coursera - Online Courses & Certifications</a></li>
          <li><a href="https://www.edx.org" target="_blank">edX - Free Online Courses by Harvard, MIT, & more</a></li>
          <li><a href="https://www.linkedin.com/learning" target="_blank">LinkedIn Learning - Professional Courses</a></li>
        </ul>
      </div>
    `;
    
    resultsContent.innerHTML = resultsHTML;
  }

  // New search button
  if (newSearchBtn) {
    newSearchBtn.addEventListener('click', function() {
      // Reset form
      eduPathForm.reset();
      
      // Show first step
      formSteps.forEach((step, index) => {
        if (index === 0) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
      
      // Reset progress tracker
      updateProgressTracker(0);
      
      // Switch sections
      resultsSection.classList.add('hidden');
      formSection.classList.remove('hidden');
      
      // Scroll to form
      formSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Download PDF
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', function() {
      alert('PDF download functionality will be implemented in the next version.');
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
