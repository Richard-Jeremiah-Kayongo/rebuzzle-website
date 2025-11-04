// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

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
            void imgElement.offsetHeight; // Force reflow
            imgElement.style.transition = '';
        }
    }
}

// GLOBAL function for onclick handlers
function changeSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    const images = document.querySelectorAll('.carousel-image');
    images.forEach((img) => {
        const currentPos = img.className.split(' ')[1];
        const positions = ['far-left', 'left', 'center', 'right', 'far-right'];
        const currentIndex = positions.indexOf(currentPos);
        const newIndex = (currentIndex + direction + 5) % 5;
        img.className = `carousel-image ${positions[newIndex]}`;
    });
    
    setTimeout(() => {
        currentSlide = (currentSlide - direction + slides.length) % slides.length;
        setCarouselImagesWithoutAnimation();
        isAnimating = false;
    }, 1000);
}

// Make changeSlide available globally
window.changeSlide = changeSlide;

// ============================================
// MISSION TEXT TYPING ANIMATION
// ============================================
const missionFullText = "Our mission is to challenge minds and spark creativity, helping players of all ages discover the joy of solving puzzles while building sharper thinking skills.";

function typeMissionText() {
    const missionElement = document.getElementById('mission-text');
    if (!missionElement) return;
    
    const words = missionFullText.split(' ');
    let wordIndex = 0;
    const interval = 2000 / words.length;
    
    const typingInterval = setInterval(() => {
        if (wordIndex < words.length) {
            missionElement.textContent += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
            wordIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, interval);
}

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

function showFeatureSlide(index) {
    const featureCards = document.querySelectorAll('.feature-card');
    const dots = document.querySelectorAll('.dot');
    
    featureCards.forEach(card => {
        card.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (featureCards[index]) {
        featureCards[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// GLOBAL function for onclick handlers
function changeFeatureSlide(direction) {
    const featureCards = document.querySelectorAll('.feature-card');
    currentFeatureSlide += direction;
    
    if (currentFeatureSlide >= featureCards.length) {
        currentFeatureSlide = 0;
    }
    if (currentFeatureSlide < 0) {
        currentFeatureSlide = featureCards.length - 1;
    }
    
    showFeatureSlide(currentFeatureSlide);
}

// GLOBAL function for onclick handlers
function goToFeatureSlide(index) {
    currentFeatureSlide = index;
    showFeatureSlide(currentFeatureSlide);
}

// Make functions available globally
window.changeFeatureSlide = changeFeatureSlide;
window.goToFeatureSlide = goToFeatureSlide;

// ============================================
// TESTIMONIALS AUTO-SCROLL
// ============================================
let testimonialAutoScroll;

function startTestimonialAutoScroll() {
    if (window.innerWidth <= 768) {
        testimonialAutoScroll = setInterval(() => {
            const grid = document.getElementById('testimonial-grid');
            if (grid) {
                const maxScroll = grid.scrollWidth - grid.clientWidth;
                
                if (grid.scrollLeft >= maxScroll - 10) {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    grid.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }, 3000);
    }
}

const testimonialGrid = document.getElementById('testimonial-grid');
if (testimonialGrid) {
    testimonialGrid.addEventListener('touchstart', () => {
        clearInterval(testimonialAutoScroll);
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    setCarouselImagesWithoutAnimation();
    
    // Initialize features carousel
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        showFeatureSlide(0);
    }
    
    // Start testimonial auto-scroll
    startTestimonialAutoScroll();
});

window.addEventListener('resize', () => {
    clearInterval(testimonialAutoScroll);
    startTestimonialAutoScroll();
});