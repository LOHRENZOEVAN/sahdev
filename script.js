document.addEventListener("DOMContentLoaded", function() {
    // Card animation effects
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease-in-out";
        });
        card.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1)";
        });
    });
 
    // Smooth scrolling for navigation
    let navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Action slider functionality
    let slider = document.querySelector(".slider");
    let slides = document.querySelectorAll(".slide");
    let index = 0;
    let totalSlides = slides.length;

    function updateSlider() {
        slider.style.transition = "transform 0.8s ease-in-out";
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function moveSlide() {
        index++;
        if (index >= totalSlides) {
            index = 0;
            slider.style.transition = "none"; // Reset transition for smooth looping
            slider.style.transform = "translateX(0)";
            setTimeout(() => {
                slider.style.transition = "transform 0.8s ease-in-out";
            }, 50);
        }
        updateSlider();
    }

    setInterval(moveSlide, 5000);
    updateSlider();

    // Gallery slider functionality
    const gallerySlider = document.querySelector('.gallery-slider');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    
    if (gallerySlider && gallerySlides.length > 0) {
        let currentGallerySlide = 0;
        const gallerySlideCount = gallerySlides.length;
        
        // Function to show a specific gallery slide
        function showGallerySlide(index) {
            // Hide all slides first
            gallerySlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Show the current slide
            gallerySlides[index].style.display = 'block';
        }
        
        // Function to move to the next gallery slide
        function nextGallerySlide() {
            currentGallerySlide = (currentGallerySlide + 1) % gallerySlideCount;
            showGallerySlide(currentGallerySlide);
        }
        
        // Initialize the gallery by showing the first slide
        showGallerySlide(0);
        
        // Set interval to change gallery slides every 3 seconds
        const gallerySlideInterval = setInterval(nextGallerySlide, 5000);
        
        // Optional: Pause slideshow when hovering over the gallery
        gallerySlider.addEventListener('mouseenter', function() {
            clearInterval(gallerySlideInterval);
        });
        
        // Optional: Resume slideshow when mouse leaves the gallery
        gallerySlider.addEventListener('mouseleave', function() {
            clearInterval(gallerySlideInterval);
        });
    }
});