
// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: false,
    mirror: false
  });

  // Initialize other functions
  setupGeoLocation();
  setupCurrentDate();
  setupCountdown();
  setupFaqToggle();
  setupPurchaseNotifications();
});

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

// Set up countdown timer - 3 days from now
function setupCountdown() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  
  function updateTimer() {
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
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
  }
  
  // Initial update
  updateTimer();
  
  // Update timer every second
  setInterval(updateTimer, 1000);
}

// Setup FAQ accordion
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
  
  // Common American names
  const names = [
    'John', 'Michael', 'David', 'James', 'Robert', 'William', 'Thomas', 
    'Charles', 'Joseph', 'Richard', 'Daniel', 'Matthew', 'Anthony', 'Mark', 
    'Steven', 'Andrew', 'Brian', 'Kevin', 'Jason', 'Ryan'
  ];
  
  // Common US cities
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
    'San Antonio', 'San Diego', 'Dallas', 'Austin', 'Seattle', 'Denver', 
    'Boston', 'Las Vegas', 'Portland', 'Miami', 'Atlanta', 'Orlando', 
    'San Francisco', 'Nashville'
  ];
  
  function showNotification() {
    // Get random name and city
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    // Update popup content
    nameElement.textContent = randomName;
    cityElement.textContent = randomCity;
    
    // Show popup
    popup.classList.add('show');
    
    // Hide popup after 5 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 5000);
  }
  
  // Show first notification after 10 seconds
  setTimeout(() => {
    showNotification();
    
    // Then show notifications randomly between 30-60 seconds
    setInterval(() => {
      const randomDelay = Math.floor(Math.random() * (60 - 30 + 1) + 30) * 1000;
      setTimeout(showNotification, randomDelay);
    }, 60000); // Check every minute if we should show a notification
  }, 10000);
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
