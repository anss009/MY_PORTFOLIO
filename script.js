let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// Active navigation on scroll
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

// Mobile menu toggle
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// ===== SCROLL ANIMATIONS =====
const animateOnScroll = () => {
  // About Section
  const aboutImg = document.querySelector('.about-img');
  const aboutContent = document.querySelector('.about-content');
  
  if (aboutImg) {
    const aboutImgPosition = aboutImg.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (aboutImgPosition < screenPosition) {
      aboutImg.classList.add('animate');
      aboutContent.classList.add('animate');
    }
  }

  // Service Section
  const serviceHeading = document.querySelector('.service .heading');
  const serviceBoxes = document.querySelectorAll('.service-box');
  
  if (serviceHeading) {
    const servicePosition = serviceHeading.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (servicePosition < screenPosition) {
      serviceHeading.classList.add('animate');
      
      serviceBoxes.forEach((box, index) => {
        setTimeout(() => {
          box.classList.add('animate');
        }, index * 200);
      });
    }
  }

  // Projects Section
  const projectsHeading = document.querySelector('.projects .heading');
  const projectBoxes = document.querySelectorAll('.project-box');
  
  if (projectsHeading) {
    const projectsPosition = projectsHeading.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (projectsPosition < screenPosition) {
      projectsHeading.classList.add('animate');
      
      projectBoxes.forEach((box, index) => {
        setTimeout(() => {
          box.classList.add('animate');
        }, index * 200);
      });
    }
  }

  // Education Section
  const educationHeading = document.querySelector('.education .heading');
  const educationContainers = document.querySelectorAll('.education .container');
  
  if (educationHeading) {
    const educationPosition = educationHeading.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (educationPosition < screenPosition) {
      educationHeading.classList.add('animate');
      
      educationContainers.forEach((container, index) => {
        setTimeout(() => {
          container.classList.add('animate');
        }, index * 300);
      });
    }
  }
};

// Listen to scroll event
window.addEventListener('scroll', animateOnScroll);

// Run on page load
window.addEventListener('load', () => {
  animateOnScroll();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
      }
    }
  });
});

// Add parallax effect to images on mouse move
document.addEventListener('mousemove', (e) => {
  const homeImg = document.querySelector('.home-img img');
  const aboutImg = document.querySelector('.about-img img');
  
  if (homeImg) {
    const moveX = (e.clientX * 0.01);
    const moveY = (e.clientY * 0.01);
    homeImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

// Typing effect for home section (optional enhancement)
const typingText = document.querySelector('.home-content h3');
if (typingText) {
  const text = typingText.getAttribute('data-text');
  let index = 0;
  
  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  
  // Uncomment below to enable typing effect
  // typingText.textContent = '';
  // setTimeout(type, 2000);
}

// Add active state animation to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    let ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Animate service icons on hover
const serviceIcons = document.querySelectorAll('.service-icon i');
serviceIcons.forEach(icon => {
  icon.parentElement.parentElement.addEventListener('mouseenter', () => {
    icon.style.animation = 'none';
    setTimeout(() => {
      icon.style.animation = '';
    }, 10);
  });
});

// Counter animation for stats (if you want to add stats)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Intersection Observer for more efficient scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.service-box, .project-box, .education .container');
animatedElements.forEach(el => observer.observe(el));

// Add cursor trail effect (optional - uncomment to enable)

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

circles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach((circle, index) => {
    circle.style.left = x - 12 + 'px';
    circle.style.top = y - 12 + 'px';
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;
    
    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
  
  requestAnimationFrame(animateCircles);
}

animateCircles();


console.log('Portfolio animations loaded successfully!');