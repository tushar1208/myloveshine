// ---------------------------
// 🎵 Background Music Player
// ---------------------------
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      bgMusic.play().catch(e => console.log("Audio play failed:", e));
      isPlaying = true;
      musicBtn.textContent = "⏸️ Pause Music";
    } else {
      bgMusic.pause();
      isPlaying = false;
      musicBtn.textContent = "🎵 Play Music";
    }
  });
}

// ---------------------------
// ❤️ Days Counter
// ---------------------------
const startDate = new Date("2023-08-01"); // 🔸 Change to your relationship start date
const today = new Date();
const diffTime = Math.abs(today - startDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const daysEl = document.getElementById("days");
if (daysEl) daysEl.innerText = diffDays;

// ---------------------------
// 💖 Floating Hearts Animation
// ---------------------------
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 800);

// ---------------------------
// ✨ Fade-in on Scroll Animation
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

// ---------------------------
// 💌 Letter Functions
// ---------------------------
function openLetter() {
  const modal = document.getElementById("letterModal");
  const envelope = document.querySelector('.envelope');
  
  // Open the envelope
  envelope.classList.add('opened');
  
  // Show modal after envelope animation
  setTimeout(() => {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
    
    // Add show class for animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }, 1000);
}

function closeLetter() {
  const modal = document.getElementById("letterModal");
  const envelope = document.querySelector('.envelope');
  
  // Close the envelope
  envelope.classList.remove('opened');
  
  // Hide modal
  modal.classList.remove('show');
  document.body.classList.remove("modal-open");
  
  // Remove display after animation
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// ---------------------------
// 🖼️ Image Carousel
// ---------------------------
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.dynamic-carousel-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const currentImageEl = document.getElementById('current-image');
  const totalImagesEl = document.getElementById('total-images');
  const carouselContainer = document.querySelector('.dynamic-carousel-container');
  
  let currentSlide = 0;
  let carouselInterval;
  const slideInterval = 3000; // 3 seconds
  
  // Image data - replace with your actual image paths
  const imageData = [
    { src: 'images/1.jpg', alt: '1' },
    { src: 'images/2.jpg', alt: '2' },
    { src: 'images/3.jpg', alt: '3' },
    { src: 'images/4.jpg', alt: '4' },
    { src: 'images/5.jpg', alt: '5' },
    { src: 'images/6.jpg', alt: '6' },
    { src: 'images/7.jpg', alt: '7' },
    { src: 'images/8.jpg', alt: '8' },
    { src: 'images/9.jpg', alt: '9' },
    { src: 'images/10.jpeg', alt: '10' },
    { src: 'images/11.jpeg', alt: '11' },
    { src: 'images/12.jpg', alt: '12' },
    { src: 'images/13.jpeg', alt: '13' },
    { src: 'images/14.jpeg', alt: '14' },
    { src: 'images/15.jpeg', alt: '15' },
    { src: 'images/16.jpeg', alt: '16' },
    { src: 'images/17.jpeg', alt: '17' },
    { src: 'images/18.jpeg', alt: '18' },
    { src: 'images/19.jpeg', alt: '19' },
    { src: 'images/20.jpeg', alt: '20' },
    { src: 'images/21.jpeg', alt: '21' },
    { src: 'images/22.jpeg', alt: '22' },
    { src: 'images/23.jpeg', alt: '23' },
    { src: 'images/24.jpeg', alt: '24' },
    { src: 'images/25.jpeg', alt: '25' },
    { src: 'images/26.jpeg', alt: '26' },
    { src: 'images/27.jpeg', alt: '27' }
  ];
  
  let slides = [];
  let indicators = [];
  
  // Function to load images and initialize carousel
  function initializeCarousel() {
    // Clear existing content
    carouselTrack.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Create slides for each image
    imageData.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      if (index === 0) slide.classList.add('active');
      
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.loading = 'lazy';
      
      // When image loads, adjust container size if needed
      img.onload = function() {
        if (index === 0) {
          adjustContainerSize(this);
        }
      };
      
      slide.appendChild(img);
      carouselTrack.appendChild(slide);
      slides.push(slide);
      
      // Create indicator
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
      indicators.push(indicator);
    });
    
    // Update total images count
    totalImagesEl.textContent = imageData.length;
    currentImageEl.textContent = '1';
    
    // Start auto sliding
    startCarousel();
  }
  
  // Function to adjust container size based on image dimensions
  function adjustContainerSize(imgElement) {
    const container = carouselContainer;
    const imgWidth = imgElement.naturalWidth;
    const imgHeight = imgElement.naturalHeight;
    const aspectRatio = imgWidth / imgHeight;
    
    // Set maximum dimensions
    const maxWidth = 1200;
    const maxHeight = 800;
    
    let newWidth, newHeight;
    
    if (imgWidth > imgHeight) {
      // Landscape image
      newWidth = Math.min(imgWidth, maxWidth);
      newHeight = newWidth / aspectRatio;
    } else {
      // Portrait image
      newHeight = Math.min(imgHeight, maxHeight);
      newWidth = newHeight * aspectRatio;
    }
    
    // Apply responsive constraints
    if (newWidth > window.innerWidth * 0.9) {
      newWidth = window.innerWidth * 0.9;
      newHeight = newWidth / aspectRatio;
    }
    
    if (newHeight > window.innerHeight * 0.7) {
      newHeight = window.innerHeight * 0.7;
      newWidth = newHeight * aspectRatio;
    }
    
    // Set container dimensions
    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
  }
  
  // Function to go to specific slide
  function goToSlide(slideIndex) {
    // Remove active classes
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Add active classes
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Update image counter
    currentImageEl.textContent = (currentSlide + 1).toString();
    
    // Adjust container size for the new image
    const activeImg = slides[currentSlide].querySelector('img');
    if (activeImg.complete) {
      adjustContainerSize(activeImg);
    } else {
      activeImg.onload = function() {
        adjustContainerSize(this);
      };
    }
    
    // Reset auto slide timer
    resetCarouselInterval();
  }
  
  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }
  
  // Function to go to previous slide
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }
  
  // Function to start auto sliding
  function startCarousel() {
    carouselInterval = setInterval(nextSlide, slideInterval);
  }
  
  // Function to reset auto slide timer
  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarousel();
  }
  
  // Event listeners for manual controls
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetCarouselInterval();
  });
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetCarouselInterval();
  });
  
  // Pause auto-slide when user interacts with carousel
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      startCarousel();
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startCarousel();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
      }
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const activeImg = slides[currentSlide].querySelector('img');
    if (activeImg && activeImg.complete) {
      adjustContainerSize(activeImg);
    }
  });
  
  // Initialize carousel
  initializeCarousel();
});

// ---------------------------
// 🖼️ Gallery Carousel
// ---------------------------
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const galleryContainer = document.querySelector('.gallery-container');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const indicatorsContainer = document.querySelector('.gallery-indicators');
  const currentItemEl = document.getElementById('current-gallery-item');
  const totalItemsEl = document.getElementById('total-gallery-items');
  const loader = document.querySelector('.gallery-loader');
  
  // Carousel state
  let currentIndex = 0;
  let carouselInterval;
  const slideInterval = 4000; // 4 seconds
  let isAnimating = false;
  
  // Initialize gallery
  function initializeGallery() {
    // Set total items count
    totalItemsEl.textContent = galleryItems.length;
    
    // Create indicators
    createIndicators();
    
    // Load first image and adjust container
    loadAndAdjustImage(0);
    
    // Start auto rotation
    startCarousel();
    
    // Add event listeners
    setupEventListeners();
  }
  
  // Create indicator dots
  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    
    galleryItems.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('gallery-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }
  
  // Load image and adjust container size
  function loadAndAdjustImage(index) {
    if (isAnimating) return;
    
    isAnimating = true;
    const item = galleryItems[index];
    const media = item.querySelector('img, video');
    
    // Show loader for images (not videos)
    if (media.tagName === 'IMG' && !media.complete) {
      loader.classList.add('active');
    }
    
    // Handle media load
    const handleMediaLoad = () => {
      adjustContainerSize(media);
      loader.classList.remove('active');
      isAnimating = false;
    };
    
    // If media is already loaded
    if ((media.tagName === 'IMG' && media.complete) || media.tagName === 'VIDEO') {
      setTimeout(handleMediaLoad, 100);
    } else {
      media.addEventListener('load', handleMediaLoad);
      media.addEventListener('error', () => {
        console.error('Failed to load media:', media.src);
        loader.classList.remove('active');
        isAnimating = false;
      });
    }
    
    // Set timeout fallback
    setTimeout(() => {
      loader.classList.remove('active');
      isAnimating = false;
    }, 5000);
  }
  
  // Adjust container size based on media dimensions
  function adjustContainerSize(media) {
    let mediaWidth, mediaHeight, aspectRatio;
    
    if (media.tagName === 'IMG') {
      mediaWidth = media.naturalWidth;
      mediaHeight = media.naturalHeight;
    } else if (media.tagName === 'VIDEO') {
      mediaWidth = media.videoWidth || 16;
      mediaHeight = media.videoHeight || 9;
    }
    
    aspectRatio = mediaWidth / mediaHeight;
    
    // Calculate maximum dimensions based on viewport
    const maxWidth = Math.min(1400, window.innerWidth * 0.9);
    const maxHeight = Math.min(800, window.innerHeight * 0.7);
    
    let newWidth, newHeight;
    
    if (mediaWidth > mediaHeight) {
      // Landscape orientation
      newWidth = Math.min(mediaWidth, maxWidth);
      newHeight = newWidth / aspectRatio;
      
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }
    } else {
      // Portrait orientation
      newHeight = Math.min(mediaHeight, maxHeight);
      newWidth = newHeight * aspectRatio;
      
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
      }
    }
    
    // Apply minimum dimensions
    newWidth = Math.max(newWidth, 300);
    newHeight = Math.max(newHeight, 200);
    
    // Set container dimensions with smooth transition
    galleryContainer.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    galleryContainer.style.width = `${newWidth}px`;
    galleryContainer.style.height = `${newHeight}px`;
  }
  
  // Go to specific slide
  function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    
    // Remove active classes
    galleryItems.forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.gallery-indicator').forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Add transition animation
    const direction = index > currentIndex ? 'next' : 'prev';
    galleryItems[index].classList.add('active', direction === 'next' ? 'zoom-in' : 'zoom-out');
    
    // Remove animation class after transition
    setTimeout(() => {
      galleryItems[index].classList.remove('zoom-in', 'zoom-out');
    }, 500);
    
    // Update current index
    currentIndex = index;
    
    // Update active indicator
    document.querySelectorAll('.gallery-indicator')[currentIndex].classList.add('active');
    
    // Update counter
    currentItemEl.textContent = (currentIndex + 1).toString();
    
    // Load and adjust image
    loadAndAdjustImage(currentIndex);
    
    // Reset auto rotation
    resetCarouselInterval();
  }
  
  // Go to next slide
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    goToSlide(nextIndex);
  }
  
  // Go to previous slide
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    goToSlide(prevIndex);
  }
  
  // Start auto rotation
  function startCarousel() {
    carouselInterval = setInterval(nextSlide, slideInterval);
  }
  
  // Reset auto rotation timer
  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarousel();
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetCarouselInterval();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetCarouselInterval();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetCarouselInterval();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetCarouselInterval();
      }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(carouselInterval);
    }, { passive: true });
    
    galleryContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startCarousel();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
      }
    }
    
    // Pause on hover
    galleryContainer.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', () => {
      startCarousel();
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const activeMedia = galleryItems[currentIndex].querySelector('img, video');
        if (activeMedia) {
          adjustContainerSize(activeMedia);
        }
      }, 250);
    });
    
    // Video play/pause handling
    galleryItems.forEach(item => {
      const video = item.querySelector('video');
      if (video) {
        video.addEventListener('play', () => {
          clearInterval(carouselInterval);
        });
        
        video.addEventListener('pause', () => {
          startCarousel();
        });
        
        video.addEventListener('ended', () => {
          startCarousel();
        });
      }
    });
  }
  
  // Preload next few images for better performance
  function preloadImages() {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    const nextItem = galleryItems[nextIndex];
    const nextMedia = nextItem.querySelector('img');
    
    if (nextMedia && nextMedia.tagName === 'IMG') {
      const preloadImg = new Image();
      preloadImg.src = nextMedia.src;
    }
  }
  
  // Initialize the gallery
  initializeGallery();
  
  // Export functions for potential external use
  window.gallery = {
    nextSlide,
    prevSlide,
    goToSlide,
    currentIndex: () => currentIndex
  };
});

// ---------------------------
// 🎵 Utility Functions
// ---------------------------

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}