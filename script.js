// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
    offset: 120
  });

  // Initialize all functionality
  setupGeoLocation();
  setupCurrentDate();
  setupCountdown();
  setupFaqToggle();
  setupPurchaseNotifications();
  setupOrderBumpsInteraction();
  setupScrollProgress();
  setupHoverEffects();
  setupTestimonialsSlider();
  setupMobileCtaButton();
  setupLiveCounter();
  setupScrollAnimations();
  setupPerformanceOptimizations();
  setupScarcityCounter();
  setupConversionOptimizations();
  setupLiveSalesCounter();
});

// Enhanced Live Counter for Notification Bar
function setupLiveCounter() {
  const counter = document.querySelector('.live-counter');
  if (!counter) return;

  const baseCount = 14;
  const variation = 3;
  
  setInterval(() => {
    const newCount = baseCount + Math.floor(Math.random() * variation);
    counter.textContent = newCount;
    
    // Add animation effect
    counter.style.transform = 'scale(1.1)';
    setTimeout(() => {
      counter.style.transform = 'scale(1)';
    }, 200);
  }, 15000 + Math.random() * 10000); // Random interval between 15-25 seconds
}

// Enhanced Mobile CTA Button
function setupMobileCtaButton() {
  const mobileButton = document.getElementById('mobile-cta');
  if (!mobileButton) return;

  // Show/hide based on scroll position
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateMobileCta() {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollProgress = scrollY / (documentHeight - windowHeight);

    // Show after scrolling 20% and hide when near bottom (90%)
    if (scrollProgress > 0.2 && scrollProgress < 0.9) {
      mobileButton.classList.add('show');
    } else {
      mobileButton.classList.remove('show');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateMobileCta);
      ticking = true;
    }
  }

  // Optimized scroll listener
  window.addEventListener('scroll', requestTick, { passive: true });

  // Enhanced touch handling
  const ctaButton = mobileButton.querySelector('.mobile-cta-button');
  if (ctaButton) {
    // Add ripple effect on touch
    ctaButton.addEventListener('touchstart', function(e) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${e.touches[0].clientX - this.offsetLeft - 25}px;
        top: ${e.touches[0].clientY - this.offsetTop - 25}px;
        width: 50px;
        height: 50px;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Handle click/touch
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading state
      const originalText = this.querySelector('.mobile-cta-text').textContent;
      this.querySelector('.mobile-cta-text').textContent = 'Redirecting...';
      this.style.opacity = '0.7';
      
      setTimeout(() => {
        window.location.href = this.getAttribute('href');
      }, 500);
    });
  }
}

// Enhanced Order Bumps Interaction
function setupOrderBumpsInteraction() {
  const bumpItems = document.querySelectorAll('.bump-item');

  bumpItems.forEach(item => {
    // Enhanced hover effects
    item.addEventListener('mouseenter', () => {
      item.style.boxShadow = '0 20px 40px rgba(52, 152, 219, 0.3), 0 0 20px rgba(52, 152, 219, 0.2)';
      
      // Animate the icon
      const icon = item.querySelector('.bump-icon');
      if (icon) {
        icon.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
      }
    });

    item.addEventListener('mouseleave', () => {
      item.style.boxShadow = '';
      
      const icon = item.querySelector('.bump-icon');
      if (icon) {
        icon.style.transform = '';
      }
    });

    // Add click tracking
    item.addEventListener('click', () => {
      // Add selection effect
      item.style.transform = 'scale(0.98)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
    });
  });
}

// Enhanced Scroll Progress Indicator
function setupScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.min((window.scrollY / windowHeight) * 100, 100);
    
    progressBar.style.width = `${scrolled}%`;
    
    // Add pulsing effect when near completion
    if (scrolled > 90) {
      progressBar.style.animation = 'progress-pulse 2s infinite';
    } else {
      progressBar.style.animation = '';
    }
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced Hover Effects for CTA Buttons
function setupHoverEffects() {
  const ctaButtons = document.querySelectorAll('.cta-button, .purchase-button');

  ctaButtons.forEach(button => {
    // Mouse enter effect
    button.addEventListener('mouseenter', () => {
      button.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.6)';
      button.style.transform = 'translateY(-3px) scale(1.02)';
      
      // Add particle effect
      createParticleEffect(button);
    });

    button.addEventListener('mouseleave', () => {
      button.style.textShadow = '';
      button.style.transform = '';
    });

    // Click effect
    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(-1px) scale(0.98)';
    });

    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-3px) scale(1.02)';
    });
  });
}

// Particle Effect for Buttons
function createParticleEffect(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 5;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #f39c12;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top + Math.random() * rect.height}px;
      animation: particle-float 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Enhanced Geolocation with Fallback
function setupGeoLocation() {
  const cityElement = document.getElementById('userCity');
  if (!cityElement) return;

  // List of fallback cities for better UX
  const fallbackCities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin'
  ];

  // Try multiple APIs for better reliability
  const apis = [
    () => fetch('https://ipapi.co/json/').then(r => r.json()),
    () => fetch('https://ipinfo.io/json?token=7e914d5080da7d').then(r => r.json()),
    () => fetch('https://api.ipgeolocation.io/ipgeo?apiKey=fallback').then(r => r.json())
  ];

  async function tryGeoLocation() {
    for (const api of apis) {
      try {
        const data = await api();
        if (data.city || data.location?.city) {
          cityElement.textContent = data.city || data.location.city;
          return;
        }
      } catch (error) {
        console.log('Geo API failed, trying next...');
      }
    }
    
    // Use random fallback city
    const randomCity = fallbackCities[Math.floor(Math.random() * fallbackCities.length)];
    cityElement.textContent = randomCity;
  }

  tryGeoLocation();
}

// Enhanced Current Date Setup
function setupCurrentDate() {
  const dateElement = document.getElementById('currentDate');
  if (!dateElement) return;

  const date = new Date();
  const options = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'America/New_York' // Use EST for consistency
  };
  
  const formattedDate = date.toLocaleDateString('en-US', options);
  dateElement.textContent = formattedDate;
  
  // Add subtle animation
  dateElement.style.opacity = '0';
  setTimeout(() => {
    dateElement.style.transition = 'opacity 0.5s ease';
    dateElement.style.opacity = '1';
  }, 100);
}

// Enhanced Countdown Timer with Visual Effects
function setupCountdown() {
  let endDate = new Date();
  const savedEndDate = localStorage.getItem('countdownEndDate');

  if (savedEndDate) {
    endDate = new Date(parseInt(savedEndDate));
    if (endDate <= new Date()) {
      endDate = new Date();
      endDate.setHours(endDate.getHours() + 23); // 23 hours from now
      localStorage.setItem('countdownEndDate', endDate.getTime().toString());
    }
  } else {
    endDate.setHours(endDate.getHours() + 23);
    localStorage.setItem('countdownEndDate', endDate.getTime().toString());
  }



  function updateTimer() {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      // Reset timer
      endDate = new Date();
      endDate.setHours(endDate.getHours() + 23);
      localStorage.setItem('countdownEndDate', endDate.getTime().toString());
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update main countdown
    updateCountdownElement('days', days);
    updateCountdownElement('hours', hours);
    updateCountdownElement('minutes', minutes);
    updateCountdownElement('seconds', seconds);

    // Update final countdown if elements exist - force update with direct DOM manipulation
    const finalHours = document.getElementById('final-hours');
    const finalMinutes = document.getElementById('final-minutes');
    const finalSeconds = document.getElementById('final-seconds');
    
    if (finalHours) {
      const hoursStr = hours.toString().padStart(2, '0');
      finalHours.textContent = hoursStr;
      finalHours.style.color = '#f39c12';
      finalHours.style.fontWeight = '700';
      finalHours.style.fontSize = '1.3rem';
      console.log('Final Hours Element Found and Updated:', hoursStr, finalHours);
    } else {
      console.log('Final Hours Element NOT FOUND!');
    }
    
    if (finalMinutes) {
      const minutesStr = minutes.toString().padStart(2, '0');
      finalMinutes.textContent = minutesStr;
      finalMinutes.style.color = '#f39c12';
      finalMinutes.style.fontWeight = '700';
      finalMinutes.style.fontSize = '1.3rem';
    } else {
      console.log('Final Minutes Element NOT FOUND!');
    }
    
    if (finalSeconds) {
      const secondsStr = seconds.toString().padStart(2, '0');
      finalSeconds.textContent = secondsStr;
      finalSeconds.style.color = '#f39c12';
      finalSeconds.style.fontWeight = '700';
      finalSeconds.style.fontSize = '1.3rem';
    } else {
      console.log('Final Seconds Element NOT FOUND!');
    }

    // Add urgency effects when time is low
    if (hours < 1) {
      addUrgencyEffects();
    }
  }

  function updateCountdownElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      const newValue = value.toString().padStart(2, '0');
      if (element.textContent !== newValue) {
        // Add change animation
        element.style.transform = 'scale(1.1)';
        element.style.color = '#e74c3c';
        element.textContent = newValue;
        
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.color = '';
        }, 200);
      }
    }
  }

  function addUrgencyEffects() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
      item.style.animation = 'urgency-shake 0.5s infinite';
    });

    const urgencyIndicator = document.querySelector('.urgency-indicator');
    if (urgencyIndicator) {
      urgencyIndicator.style.background = 'linear-gradient(135deg, rgba(231, 76, 60, 0.4), rgba(192, 57, 43, 0.4))';
    }
  }

  // Start timer
  updateTimer();
  setInterval(updateTimer, 1000);
}

// Enhanced Testimonials Slider
function setupTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  if (!slides.length) return;

  function showSlide(index, direction = 'next') {
    // Remove active class from all slides and dots
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.transform = direction === 'next' ? 'translateX(-100px)' : 'translateX(100px)';
      slide.style.opacity = '0';
    });
    
    dots.forEach(dot => dot.classList.remove('active'));

    // Show new slide with animation
    setTimeout(() => {
      slides[index].style.transform = 'translateX(0)';
      slides[index].style.opacity = '1';
      slides[index].classList.add('active');
    }, 100);

    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next, 'next');
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev, 'prev');
  }

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      const direction = index > currentSlide ? 'next' : 'prev';
      showSlide(index, direction);
      startAutoSlide();
    });
  });

  // Auto slide function
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 6000); // Changed to 6 seconds for better UX
  }

  // Pause on hover
  const sliderContainer = document.querySelector('.testimonials-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }

  // Start auto sliding
  startAutoSlide();

  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;

  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        clearInterval(slideInterval);
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoSlide();
      }
    }, { passive: true });
  }
}

// Enhanced FAQ Toggle with Smooth Animations
function setupFaqToggle() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
          }
        }
      });

      // Toggle current FAQ
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        
        // Scroll into view on mobile
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            item.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }, 300);
        }
      }
    });
  });
}

// Enhanced Purchase Notifications with More Realistic Timing
function setupPurchaseNotifications() {
  const popup = document.getElementById('purchasePopup');
  if (!popup) return;

  const nameElement = document.getElementById('buyerName');
  const cityElement = document.getElementById('buyerCity');
  const messageElement = document.getElementById('purchaseMessage');

  // Expanded and more diverse names
  const names = [
    'Michael', 'David', 'James', 'Robert', 'John', 'William', 'Thomas',
    'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark',
    'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian',
    'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
    'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry',
    'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel', 'Frank', 'Raymond'
  ];

  // More diverse cities
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington DC', 'Boston', 'El Paso', 'Nashville',
    'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville',
    'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
    'Kansas City', 'Mesa', 'Virginia Beach', 'Atlanta', 'Colorado Springs',
    'Omaha', 'Raleigh', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Cleveland',
    'Wichita', 'Arlington', 'New Orleans', 'Bakersfield', 'Tampa', 'Honolulu'
  ];

  const messages = [
    'just purchased the complete guide!',
    'just unlocked all the secrets!',
    'just invested in his dating success!',
    'just got instant access!',
    'just joined thousands of satisfied customers!',
    'just downloaded the ebook!',
    'just secured his copy!',
    'just made the best investment of his life!',
    'just discovered the secrets!',
    'just transformed his dating game!'
  ];

  const timeAgo = [
    '2 minutes ago',
    '5 minutes ago',
    '8 minutes ago',
    '12 minutes ago',
    '15 minutes ago',
    '18 minutes ago',
    '23 minutes ago',
    '1 hour ago'
  ];

  function showNotification() {
    if (!nameElement || !cityElement || !messageElement) return;

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomTime = timeAgo[Math.floor(Math.random() * timeAgo.length)];

    // Update content
    nameElement.textContent = randomName;
    cityElement.textContent = randomCity;
    messageElement.textContent = randomMessage;
    
    const timeElement = popup.querySelector('.popup-time');
    if (timeElement) {
      timeElement.textContent = randomTime;
    }

    // Show with enhanced animation
    popup.style.transform = 'translateX(-120%) scale(0.8)';
    popup.classList.add('show');
    
    setTimeout(() => {
      popup.style.transform = 'translateX(0) scale(1)';
    }, 100);

    // Hide after 6 seconds
    setTimeout(() => {
      popup.style.transform = 'translateX(-120%) scale(0.8)';
      setTimeout(() => {
        popup.classList.remove('show');
      }, 500);
    }, 6000);
  }

  // More realistic timing - show first notification after 8 seconds
  setTimeout(() => {
    showNotification();
    
    // Then show every 25-45 seconds
    function scheduleNext() {
      const delay = (25 + Math.random() * 20) * 1000; // 25-45 seconds
      setTimeout(() => {
        showNotification();
        scheduleNext();
      }, delay);
    }
    
    scheduleNext();
  }, 8000);
}

// Scarcity Counter Animation
function setupScarcityCounter() {
  const remainingCopies = document.querySelector('.remaining-copies');
  if (!remainingCopies) return;

  const baseCount = 47;
  const minCount = 23;
  
  // Gradually decrease the count over time
  setInterval(() => {
    const currentCount = parseInt(remainingCopies.textContent);
    if (currentCount > minCount) {
      const newCount = Math.max(currentCount - 1, minCount);
      
      // Add animation effect
      remainingCopies.style.transform = 'scale(1.2)';
      remainingCopies.style.color = '#e74c3c';
      remainingCopies.textContent = newCount;
      
      setTimeout(() => {
        remainingCopies.style.transform = 'scale(1)';
        remainingCopies.style.color = '';
      }, 300);
    }
  }, 45000 + Math.random() * 15000); // Random interval between 45-60 seconds
}

// Advanced Conversion Optimizations
function setupConversionOptimizations() {
  // Exit intent detection
  let hasShownExitIntent = false;
  
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !hasShownExitIntent && window.innerWidth > 768) {
      hasShownExitIntent = true;
      showExitIntentModal();
    }
  });

  // Add urgency animations when time is running low
  const urgencyElements = document.querySelectorAll('.countdown-item, .scarcity-indicator');
  urgencyElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'urgency-shake 0.5s ease-in-out';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.animation = '';
    });
  });

  // Enhanced click tracking for CTAs
  const ctaButtons = document.querySelectorAll('.cta-button, .mobile-cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Add loading state
      button.style.opacity = '0.8';
      button.style.transform = 'scale(0.98)';
      
      // Facebook Pixel tracking
      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
          value: 7.90,
          currency: 'USD'
        });
      }
      
      setTimeout(() => {
        button.style.opacity = '';
        button.style.transform = '';
      }, 200);
    });
  });
}

// Exit Intent Modal
function showExitIntentModal() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9); z-index: 10000;
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.3s ease;
  `;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    padding: 2rem; border-radius: 15px; text-align: center;
    max-width: 500px; margin: 1rem; border: 2px solid #e74c3c;
  `;
  
  modal.innerHTML = `
    <h3 style="color: #e74c3c; margin-bottom: 1rem;">Wait! Don't Leave Empty-Handed!</h3>
    <p style="margin-bottom: 1.5rem; color: #fff;">You're about to miss out on these exclusive secrets. This offer won't last long!</p>
    <a href="https://pay.hotmart.com/H99863889F?checkoutMode=10" 
       style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #e74c3c, #c0392b); 
              color: white; text-decoration: none; border-radius: 25px; font-weight: bold; margin-right: 1rem;">
      Get My Copy Now - $7.90
    </a>
    <button onclick="this.parentElement.parentElement.remove()" 
            style="padding: 1rem 2rem; background: transparent; color: #ccc; border: 1px solid #ccc; 
                   border-radius: 25px; cursor: pointer;">
      Maybe Later
    </button>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  setTimeout(() => {
    if (overlay.parentElement) overlay.remove();
  }, 10000);
}

// Live Sales Counter for Purchase Section
function setupLiveSalesCounter() {
  const liveSalesCount = document.querySelector('.live-sales-count');
  if (!liveSalesCount) return;

  const baseSales = 87;
  const maxVariation = 15;
  
  // Update sales count periodically
  setInterval(() => {
    const currentCount = parseInt(liveSalesCount.textContent);
    const change = Math.floor(Math.random() * 3) + 1; // 1-3 increase
    const newCount = Math.min(currentCount + change, baseSales + maxVariation);
    
    // Add animation effect
    liveSalesCount.style.transform = 'scale(1.15)';
    liveSalesCount.style.color = '#e74c3c';
    liveSalesCount.textContent = newCount;
    
    setTimeout(() => {
      liveSalesCount.style.transform = 'scale(1)';
      liveSalesCount.style.color = '';
    }, 400);
  }, 25000 + Math.random() * 15000); // Random interval between 25-40 seconds
}

// Scroll-based Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Special animations for specific elements
        if (entry.target.classList.contains('countdown-item')) {
          entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const elementsToObserve = document.querySelectorAll(`
    .target-audience-item,
    .testimonial,
    .bump-item,
    .benefit-icon-item,
    .countdown-item
  `);

  elementsToObserve.forEach(el => observer.observe(el));
}

// Performance Optimizations
function setupPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Optimize animations on low-performance devices
  if (navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-animations');
  }

  // Reduce animations on battery-powered devices
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      if (battery.level < 0.3) {
        document.body.classList.add('reduced-animations');
      }
    });
  }
}

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = 60; // Account for sticky header
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
});

// Add CSS animations for particle effect
const style = document.createElement('style');
style.textContent = `
  @keyframes particle-float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-50px) scale(0);
      opacity: 0;
    }
  }

  @keyframes progress-pulse {
    0%, 100% {
      box-shadow: 0 2px 10px rgba(231, 76, 60, 0.5);
    }
    50% {
      box-shadow: 0 2px 20px rgba(231, 76, 60, 0.8);
    }
  }

  @keyframes urgency-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .reduced-animations * {
    animation-duration: 0.3s !important;
    transition-duration: 0.3s !important;
  }

  .in-view {
    animation: fadeInUp 0.6s ease forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style);

// Error handling for all async operations
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Fallback functionality could be added here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Fallback functionality could be added here
});
