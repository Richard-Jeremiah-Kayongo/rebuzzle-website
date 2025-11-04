// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ============================================
// FADE-IN ON SCROLL ANIMATIONS
// ============================================

const sections = document.querySelectorAll('section');

const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in-active');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
});

// ============================================
// CAROUSEL FUNCTIONALITY - TRUE SLIDING
// ============================================
let currentSlide = 0;
const slides = [
    'images/splashscreen.png',
    'images/homepage.png',
    'images/gamescreen.png',
    'images/rotated.png',
    'images/shop.png'
];

let isAnimating = false;

function setCarouselImagesWithoutAnimation() {
    const positions = ['far-left', 'left', 'center', 'right', 'far-right'];
    
    for (let i = 0; i < 5; i++) {
        const slideIndex = (currentSlide - 2 + i + slides.length) % slides.length;
        const imgElement = document.getElementById(`carousel-img-${i}`);
        if (imgElement) {
            imgElement.style.transition = 'none';
            imgElement.src = slides[slideIndex];
            imgElement.className = `carousel-image ${positions[i]}`;
            imgElement.offsetHeight; // Force reflow
            imgElement.style.transition = '';
        }
    }
}

function changeSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Shift positions for animation
    const images = document.querySelectorAll('.carousel-image');
    images.forEach((img) => {
        const currentPos = img.className.split(' ')[1];
        const positions = ['far-left', 'left', 'center', 'right', 'far-right'];
        const currentIndex = positions.indexOf(currentPos);
        const newIndex = (currentIndex + direction + 5) % 5;
        img.className = `carousel-image ${positions[newIndex]}`;
    });
    
    // After animation, update the slide index and reset images
    setTimeout(() => {
        currentSlide = (currentSlide - direction + slides.length) % slides.length;
        setCarouselImagesWithoutAnimation();
        isAnimating = false;
    }, 1000);
}

// Initialize carousel on load
window.addEventListener('DOMContentLoaded', () => {
    setCarouselImagesWithoutAnimation();
});

// ============================================
// MISSION TEXT TYPING ANIMATION
// ============================================
const missionFullText = "Our mission is to challenge minds and spark creativity, helping players of all ages discover the joy of solving puzzles while building sharper thinking skills.";
const words = missionFullText.split(' ');
let wordIndex = 0;

function typeMissionText() {
    const missionElement = document.getElementById('mission-text');
    if (!missionElement) return;
    
    const interval = 2000 / words.length; // Total 3 seconds divided by number of words
    
    const typingInterval = setInterval(() => {
        if (wordIndex < words.length) {
            missionElement.textContent += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
            wordIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, interval);
}

// Start typing when mission section comes into view
const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeMissionText();
            missionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const missionSection = document.querySelector('.mission-section');
if (missionSection) {
    missionObserver.observe(missionSection);
}
// ============================================
// FEATURES CAROUSEL FUNCTIONALITY
// ============================================
let currentFeatureSlide = 0;
const featureCards = document.querySelectorAll('.feature-card');
const dots = document.querySelectorAll('.dot');

function showFeatureSlide(index) {
    // Hide all cards
    featureCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current card and activate dot
    if (featureCards[index]) {
        featureCards[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeFeatureSlide(direction) {
    currentFeatureSlide += direction;
    
    // Loop around
    if (currentFeatureSlide >= featureCards.length) {
        currentFeatureSlide = 0;
    }
    if (currentFeatureSlide < 0) {
        currentFeatureSlide = featureCards.length - 1;
    }
    
    showFeatureSlide(currentFeatureSlide);
}

function goToFeatureSlide(index) {
    currentFeatureSlide = index;
    showFeatureSlide(currentFeatureSlide);
}

// Initialize first slide
window.addEventListener('DOMContentLoaded', () => {
    if (featureCards.length > 0) {
        showFeatureSlide(0);
    }
});
// ============================================
// TESTIMONIALS SCROLL FUNCTIONALITY
// ============================================
// Auto-scroll testimonials on mobile
let testimonialAutoScroll;
function startTestimonialAutoScroll() 
{
    if (window.innerWidth <= 768) {
        testimonialAutoScroll = setInterval(() => {
            const grid = document.getElementById('testimonial-grid');
            if (grid) {
                const maxScroll = grid.scrollWidth - grid.clientWidth;
                
                // Check if at the end
                if (grid.scrollLeft >= maxScroll - 10) {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    grid.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }, 3000);
    }
}

// Stop auto-scroll when user manually scrolls
const testimonialGrid = document.getElementById('testimonial-grid');
if (testimonialGrid) {
    testimonialGrid.addEventListener('touchstart', () => {
        clearInterval(testimonialAutoScroll);
    });
}

window.addEventListener('DOMContentLoaded', startTestimonialAutoScroll);
window.addEventListener('resize', () => {
    clearInterval(testimonialAutoScroll);
    startTestimonialAutoScroll();
});