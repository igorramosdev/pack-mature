
// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
    offset: 120
  });

  // Initialize other functions
  setupGeoLocation();
  setupCurrentDate();
  setupCountdown();
  setupFaqToggle();
  setupPurchaseNotifications();
  setupOrderBumpsInteraction();
  setupScrollProgress();
  setupHoverEffects();
  setupTestimonialsSlider();
  preventHorizontalScroll();
});

// Setup interactive effects for order bumps
function setupOrderBumpsInteraction() {
  const bumpItems = document.querySelectorAll('.bump-item');
  
  bumpItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Add a slight glow effect
      item.style.boxShadow = '0 15px 30px rgba(52, 152, 219, 0.3), 0 0 15px rgba(52, 152, 219, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
      // Remove the glow effect
      item.style.boxShadow = '';
    });
  });
}

// Add a scroll progress indicator
function setupScrollProgress() {
  // Create the progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  document.body.appendChild(progressBar);
  
  // Update progress bar width on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

// Setup hover effects for purchase button and CTA buttons
function setupHoverEffects() {
  const ctaButtons = document.querySelectorAll('.cta-button, .purchase-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      // Add a text shadow effect
      button.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
      // Remove the text shadow effect
      button.style.textShadow = '';
    });
  });
}

// Fetch user location using ipinfo API
function setupGeoLocation() {
  const apiToken = '7e914d5080da7d';
  fetch(`https://ipinfo.io/json?token=${apiToken}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('userCity').textContent = data.city || 'your city';
    })
    .catch(error => {
      console.error('Error fetching location:', error);
      document.getElementById('userCity').textContent = 'your city';
    });
}

// Display current date in required format
function setupCurrentDate() {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  document.getElementById('currentDate').textContent = formattedDate;
}

// Set up countdown timer - persisted by session/IP
function setupCountdown() {
  // Try to get saved end date from localStorage
  let endDate = new Date();
  const savedEndDate = localStorage.getItem('countdownEndDate');
  
  if (savedEndDate) {
    // Use the saved end date if it exists
    endDate = new Date(parseInt(savedEndDate));
    
    // If the saved date is in the past, create a new one
    if (endDate <= new Date()) {
      endDate = new Date();
      endDate.setDate(endDate.getDate() + 3);
      localStorage.setItem('countdownEndDate', endDate.getTime().toString());
    }
  } else {
    // Create a new end date (3 days from now) if none exists
    endDate.setDate(endDate.getDate() + 3);
    localStorage.setItem('countdownEndDate', endDate.getTime().toString());
  }
  
  function updateTimer() {
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      
      // Reset the timer when it reaches zero
      endDate = new Date();
      endDate.setDate(endDate.getDate() + 3);
      localStorage.setItem('countdownEndDate', endDate.getTime().toString());
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Also update the final countdown
    if (document.getElementById('final-hours')) {
      document.getElementById('final-hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('final-minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('final-seconds').textContent = seconds.toString().padStart(2, '0');
    }
  }
  
  // Initial update
  updateTimer();
  
  // Update timer every second
  setInterval(updateTimer, 1000);
}

// Initialize all functions when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
  
  // Initialize all components
  setupSlider();
  setupCountdown(); // Now handles both countdowns
  setupFaqToggle();
  setupPurchaseNotifications();
  showUserLocation();
});

function setupSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto advance slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

function showUserLocation() {
  // Try to get user's location from IP
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      const cityElement = document.getElementById('userCity');
      if (cityElement && data.city) {
        cityElement.textContent = data.city;
      } else {
        cityElement.textContent = 'your area';
      }
    })
    .catch(() => {
      const cityElement = document.getElementById('userCity');
      if (cityElement) {
        cityElement.textContent = 'your area';
      }
    });
  
  // Set current date
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const date = new Date();
    dateElement.textContent = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

// Setup FAQ accordion
setupFaqToggle();

// Final countdown is now handled by the main countdown timer function
// This ensures both timers are in sync
function setupFaqToggle() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Toggle active class on the clicked item
      item.classList.toggle('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
}

// Setup random purchase notifications
function setupPurchaseNotifications() {
  const popup = document.getElementById('purchasePopup');
  const nameElement = document.getElementById('buyerName');
  const cityElement = document.getElementById('buyerCity');
  
  // Expanded list of common American names
  const names = [
    'John', 'Michael', 'David', 'James', 'Robert', 'William', 'Thomas', 
    'Charles', 'Joseph', 'Richard', 'Daniel', 'Matthew', 'Anthony', 'Mark', 
    'Steven', 'Andrew', 'Brian', 'Kevin', 'Jason', 'Ryan', 'Christopher',
    'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel', 'Gregory', 'Alexander',
    'Patrick', 'Jonathan', 'Tyler', 'Nicholas', 'Nathan', 'Jeffrey', 'Aaron',
    'Eric', 'Stephen', 'Kyle', 'Jose', 'Adam', 'Timothy', 'Henry', 'Nathan',
    'Zachary', 'Derek', 'Ethan', 'Christian', 'Jeremy', 'Peter', 'Sean'
  ];
  
  // Expanded list of US cities
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
    'San Antonio', 'San Diego', 'Dallas', 'Austin', 'Seattle', 'Denver', 
    'Boston', 'Las Vegas', 'Portland', 'Miami', 'Atlanta', 'Orlando', 
    'San Francisco', 'Nashville', 'Washington DC', 'Indianapolis', 'Columbus',
    'Charlotte', 'Detroit', 'Minneapolis', 'Raleigh', 'St. Louis', 'Pittsburgh',
    'Tampa', 'Cincinnati', 'Cleveland', 'Kansas City', 'Sacramento', 'Salt Lake City',
    'San Jose', 'Fort Worth', 'Virginia Beach', 'Jacksonville', 'Milwaukee',
    'Memphis', 'Louisville', 'Tucson', 'Fresno', 'Albuquerque', 'Omaha', 
    'Oklahoma City', 'Tulsa', 'Arlington'
  ];
  
  // Purchase messages to add variety
  const messages = [
    'just purchased the ebook!',
    'just bought the full package!',
    'just unlocked all the secrets!',
    'became a member!',
    'just got access to the exclusive material!',
    'invested in his future!',
    'is discovering the secrets right now!'
  ];
  
  function showNotification() {
    // Get random name and city
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Update popup content
    nameElement.textContent = randomName;
    cityElement.textContent = randomCity;
    document.getElementById('purchaseMessage').textContent = randomMessage;
    
    // Show popup
    popup.classList.add('show');
    
    // Hide popup after 5 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 5000);
  }
  
  // Show first notification quickly (after 5 seconds)
  setTimeout(() => {
    showNotification();
    
    // Then show notifications more frequently (between 15-40 seconds)
    setInterval(() => {
      const randomDelay = Math.floor(Math.random() * (40 - 15 + 1) + 15) * 1000;
      setTimeout(showNotification, randomDelay);
    }, 30000); // Check every 30 seconds if we should show a notification
  }, 5000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


// Testimonials slider functionality
function setupTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  // Initialize dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(index);
      startSlideInterval();
    });
  });

  // Auto-rotate slides
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 5000); // Change slide every 5 seconds
  }

  // Start the slider
  startSlideInterval();

  // Pause on hover, resume on mouse leave
  const sliderContainer = document.querySelector('.testimonials-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
      startSlideInterval();
    });
  }
}

// Prevent horizontal scroll
function preventHorizontalScroll() {
  document.body.addEventListener('scroll', function(e) {
    if (e.target.scrollWidth > e.target.clientWidth) {
      e.preventDefault();
    }
  });
  
  // Force check for any horizontal overflow and fix container widths
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.offsetWidth > window.innerWidth) {
      el.style.maxWidth = '100vw';
      el.style.overflowX = 'hidden';
    }
  });
}
