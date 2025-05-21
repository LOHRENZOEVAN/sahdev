document.addEventListener("DOMContentLoaded", function() {
    // Card animation effects with better performance
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease-in-out";
        });
        card.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1)";
        });
    });
    
    // Smooth scrolling for navigation with improved targeting - FIXED to only affect anchor links
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Account for any fixed headers with a configurable offset
                const headerOffset = 50;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Main slider functionality with improved transitions and controls
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    let index = 0;
    const totalSlides = slides.length;
    let sliderInterval;
    
    function updateSlider() {
        if (slider) {
            slider.style.transition = "transform 0.8s ease-in-out";
            slider.style.transform = `translateX(-${index * 100}%)`;
        }
    }
    
    function moveSlide(direction = 1) {
        index = (index + direction) % totalSlides;
        if (index < 0) index = totalSlides - 1;
        updateSlider();
    }
    
    function startSliderAutoplay() {
        stopSliderAutoplay(); // Clear any existing interval first
        sliderInterval = setInterval(() => moveSlide(1), 5000);
    }
    
    function stopSliderAutoplay() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
    }
    
    // Add slider controls (optional)
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            moveSlide(-1);
            stopSliderAutoplay();
            startSliderAutoplay();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            moveSlide(1);
            stopSliderAutoplay();
            startSliderAutoplay();
        });
    }
    
    // Initialize slider if it exists
    if (slider && slides.length > 0) {
        // Pause on hover
        slider.addEventListener('mouseenter', stopSliderAutoplay);
        slider.addEventListener('mouseleave', startSliderAutoplay);
        
        // Initialize slider
        updateSlider();
        startSliderAutoplay();
    }
    
    // Gallery slider functionality with improved state management
    const gallerySlider = document.querySelector('.gallery-slider');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    
    if (gallerySlider && gallerySlides.length > 0) {
        let currentGallerySlide = 0;
        const gallerySlideCount = gallerySlides.length;
        let gallerySlideInterval;
        
        // Function to show a specific gallery slide with fade effect
        function showGallerySlide(index) {
            // Hide all slides first
            gallerySlides.forEach(slide => {
                slide.style.opacity = '0';
                slide.style.display = 'none';
            });
            
            // Show the current slide with fade-in effect
            gallerySlides[index].style.display = 'block';
            setTimeout(() => {
                gallerySlides[index].style.opacity = '1';
                gallerySlides[index].style.transition = 'opacity 0.5s ease-in-out';
            }, 50);
        }
        
        // Function to move to the next gallery slide
        function nextGallerySlide() {
            currentGallerySlide = (currentGallerySlide + 1) % gallerySlideCount;
            showGallerySlide(currentGallerySlide);
        }
        
        // Function to move to the previous gallery slide
        function prevGallerySlide() {
            currentGallerySlide = (currentGallerySlide - 1 + gallerySlideCount) % gallerySlideCount;
            showGallerySlide(currentGallerySlide);
        }
        
        // Functions to control gallery autoplay
        function startGalleryAutoplay() {
            stopGalleryAutoplay(); // Clear any existing interval first
            gallerySlideInterval = setInterval(nextGallerySlide, 5000);
        }
        
        function stopGalleryAutoplay() {
            if (gallerySlideInterval) {
                clearInterval(gallerySlideInterval);
                gallerySlideInterval = null;
            }
        }
        
        // Add gallery navigation controls (optional)
        const galleryPrev = document.querySelector('.gallery-prev');
        const galleryNext = document.querySelector('.gallery-next');
        
        if (galleryPrev) {
            galleryPrev.addEventListener('click', () => {
                prevGallerySlide();
                stopGalleryAutoplay();
                startGalleryAutoplay();
            });
        }
        
        if (galleryNext) {
            galleryNext.addEventListener('click', () => {
                nextGallerySlide();
                stopGalleryAutoplay();
                startGalleryAutoplay();
            });
        }
        
        // Pause slideshow when hovering over the gallery
        gallerySlider.addEventListener('mouseenter', stopGalleryAutoplay);
        
        // Resume slideshow when mouse leaves the gallery
        gallerySlider.addEventListener('mouseleave', startGalleryAutoplay);
        
        // Initialize the gallery
        showGallerySlide(0);
        startGalleryAutoplay();
        
        // Add touch support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        gallerySlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopGalleryAutoplay();
        }, {passive: true});
        
        gallerySlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextGallerySlide(); // Swipe left
            } else if (touchEndX - touchStartX > 50) {
                prevGallerySlide(); // Swipe right
            }
            startGalleryAutoplay();
        }, {passive: true});
    }
    
    // Add accessibility support
    document.querySelectorAll('.slide, .gallery-slide').forEach(slide => {
        if (!slide.hasAttribute('aria-hidden')) {
            slide.setAttribute('aria-hidden', 'true');
        }
        if (!slide.hasAttribute('tabindex')) {
            slide.setAttribute('tabindex', '-1');
        }
    });
});