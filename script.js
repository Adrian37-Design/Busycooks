// ================================
// BUSYCOOKS RESTAURANT - SCRIPTS
// Interactive Functionality
// ================================

// ========== NAVIGATION ========== 
// Mobile Menu Toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle) {
  navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
    });
  });
}

// Highlight Active Page in Navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.navbar-menu a');
navItems.forEach(item => {
  const href = item.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    item.classList.add('active');
  }
});

// ========== MENU FILTERING ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      menuItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ========== ORDER TRACKING ==========
const orderForm = document.getElementById('order-tracking-form');
const orderResult = document.getElementById('order-result');

if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const orderNumber = document.getElementById('order-number').value;
    
    // Simulate order status (in real app, this would be an API call)
    const statuses = [
      { status: 'Order Received', message: 'Your order has been received and is being prepared.', icon: '📋' },
      { status: 'Preparing', message: 'Our chefs are carefully preparing your delicious meal.', icon: '👨‍🍳' },
      { status: 'Ready for Pickup', message: 'Your order is ready! Come pick it up.', icon: '✅' },
      { status: 'Out for Delivery', message: 'Your order is on the way to you!', icon: '🚗' },
      { status: 'Delivered', message: 'Enjoy your meal! Thank you for choosing Busycooks.', icon: '🎉' }
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    orderResult.innerHTML = `
      <div class="glass-card fade-in-up">
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">${randomStatus.icon}</div>
          <h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">Order #${orderNumber}</h3>
          <h4 style="margin-bottom: 1rem;">${randomStatus.status}</h4>
          <p style="color: var(--color-gray-dark);">${randomStatus.message}</p>
        </div>
      </div>
    `;
    
    orderResult.style.display = 'block';
  });
}

// ========== GALLERY LIGHTBOX ==========
const galleryItems = document.querySelectorAll('.gallery-item');
let lightbox = null;

if (galleryItems.length > 0) {
  // Create lightbox element
  lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-image" src="" alt="Gallery Image">
  `;
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;
  document.body.appendChild(lightbox);
  
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  lightboxImage.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    border-radius: 1rem;
  `;
  
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  lightboxClose.style.cssText = `
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: 3rem;
    color: white;
    cursor: pointer;
    z-index: 10001;
  `;
  
  // Open lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImage.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// ========== REVIEWS CAROUSEL ==========
const reviewsContainer = document.querySelector('.reviews-container');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (reviewsContainer && prevBtn && nextBtn) {
  let currentIndex = 0;
  const reviews = document.querySelectorAll('.review-card');
  const totalReviews = reviews.length;
  
  function showReview(index) {
    reviews.forEach((review, i) => {
      review.style.display = i === index ? 'block' : 'none';
    });
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
    showReview(currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalReviews;
    showReview(currentIndex);
  });
  
  // Auto-rotate every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalReviews;
    showReview(currentIndex);
  }, 5000);
  
  // Show first review initially
  showReview(0);
}

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon at ${email}.`);
      contactForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation class
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.menu-item, .review-card, .glass-card, .gallery-item');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// ========== SMOOTH SCROLL TO TOP ==========
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E91E63 0%, #F48FB1 100%);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
  z-index: 1000;
  transition: 0.3s ease;
`;
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'translateY(0)';
});
