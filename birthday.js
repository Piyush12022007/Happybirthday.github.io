// Cinematic Birthday Website - Interactive Effects
document.addEventListener("DOMContentLoaded", function () {
  // Initialize video background switching
  initializeVideoBackground();

  // Initialize navigation
  initializeNavigation();

  // Add confetti effect on page load
  createConfetti();

  // Add click effects
  document.addEventListener("click", function (e) {
    createClickEffect(e.clientX, e.clientY);
  });

  // Add typing effect to the name
  typeWriter();

  // Add smooth scrolling for navigation
  initializeSmoothScrolling();

  // Add parallax effects
  initializeParallax();

  // Add gallery interactions
  initializeGallery();

  // Add wallpaper download functionality
  initializeWallpaperDownloads();
});

// Video Background Management
function initializeVideoBackground() {
  const videoElement = document.getElementById("bgVideo");
  const videoContainer = document.querySelector(".video-background");

  // Check if video element exists
  if (!videoElement) {
    console.log("Video element not found, using fallback background");
    setFallbackBackground();
    return;
  }

  const videoSources = [
    "bmw-video1.mp4",
    "bmw-video2.mp4",
    "bmw-video3.mp4",
    "bmw-video4.mp4",
  ];

  // Function to set fallback background
  function setFallbackBackground() {
    if (videoContainer) {
      videoContainer.style.background =
        "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)";
    }
    document.body.style.background =
      "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)";
  }

  // Try to load a video, but fallback gracefully
  let videoLoaded = false;

  // Try each video source
  for (let i = 0; i < videoSources.length; i++) {
    const testVideo = new Image();
    testVideo.onload = function () {
      if (!videoLoaded) {
        videoLoaded = true;
        videoElement.src = videoSources[i];
        console.log(`Video loaded: ${videoSources[i]}`);
      }
    };
    testVideo.onerror = function () {
      console.log(`Video not found: ${videoSources[i]}`);
      if (i === videoSources.length - 1 && !videoLoaded) {
        setFallbackBackground();
      }
    };
    testVideo.src = videoSources[i];
  }

  // Add video error handling
  videoElement.addEventListener("error", function () {
    console.log("Video failed to load, using fallback");
    setFallbackBackground();
  });

  // Add video load success
  videoElement.addEventListener("loadeddata", function () {
    console.log("Video loaded successfully");
    videoElement.style.display = "block";
  });
}

// Navigation Management
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Update active navigation on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Parallax Effects
function initializeParallax() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-item");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Gallery Interactions
function initializeGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
}

// Wallpaper Download Management
function initializeWallpaperDownloads() {
  // This function will be called by the download buttons
  window.downloadWallpaper = function (imageSrc, filename) {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show download confirmation
    showDownloadConfirmation(filename);
  };
}

// Download Confirmation
function showDownloadConfirmation(filename) {
  const confirmation = document.createElement("div");
  confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 102, 177, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    `;
  confirmation.textContent = `Downloading ${filename}...`;

  document.body.appendChild(confirmation);

  // Animate in
  setTimeout(() => {
    confirmation.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    confirmation.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(confirmation);
    }, 300);
  }, 3000);
}

// Enhanced Confetti Effect
function createConfetti() {
  const colors = ["#0066b1", "#00a0e9", "#ffd700", "#ff6b6b", "#4ecdc4"];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background-color: ${
                  colors[Math.floor(Math.random() * colors.length)]
                };
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0.8;
            `;

      document.body.appendChild(confetti);

      const animation = confetti.animate(
        [
          {
            transform: "translateY(0px) rotate(0deg)",
            opacity: 0.8,
          },
          {
            transform: `translateY(${
              window.innerHeight + 100
            }px) rotate(720deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 3000 + Math.random() * 2000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
      );

      animation.onfinish = () => {
        confetti.remove();
      };
    }, i * 50);
  }
}

// Enhanced Click Effect
function createClickEffect(x, y) {
  const effect = document.createElement("div");
  effect.style.cssText = `
        position: fixed;
        left: ${x - 25}px;
        top: ${y - 25}px;
        width: 50px;
        height: 50px;
        border: 3px solid #0066b1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.8;
    `;

  document.body.appendChild(effect);

  const animation = effect.animate(
    [
      { transform: "scale(0)", opacity: 0.8 },
      { transform: "scale(2)", opacity: 0 },
    ],
    {
      duration: 600,
      easing: "ease-out",
    }
  );

  animation.onfinish = () => {
    effect.remove();
  };
}

// Enhanced Typing Effect
function typeWriter() {
  const nameElement = document.querySelector(".hero-name");
  if (!nameElement) return;

  const originalText = nameElement.textContent;
  nameElement.textContent = "";

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < originalText.length) {
      nameElement.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      nameElement.style.animation =
        "nameGlow 2s ease-in-out infinite alternate";
    }
  }, 150);
}

// Keyboard Interactions
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    createConfetti();
  }

  // Navigation with arrow keys
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const currentSection = getCurrentSection();
    const nextSection = getNextSection(currentSection);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const currentSection = getCurrentSection();
    const prevSection = getPrevSection(currentSection);
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Helper functions for navigation
function getCurrentSection() {
  const sections = document.querySelectorAll("section");
  let current = sections[0];

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      current = section;
    }
  });

  return current;
}

function getNextSection(currentSection) {
  const sections = Array.from(document.querySelectorAll("section"));
  const currentIndex = sections.indexOf(currentSection);
  return sections[currentIndex + 1] || null;
}

function getPrevSection(currentSection) {
  const sections = Array.from(document.querySelectorAll("section"));
  const currentIndex = sections.indexOf(currentSection);
  return sections[currentIndex - 1] || null;
}

// Touch Effects for Mobile
let touchStartTime;
document.addEventListener("touchstart", function (e) {
  touchStartTime = Date.now();
});

document.addEventListener("touchend", function (e) {
  const touchEndTime = Date.now();
  const touchDuration = touchEndTime - touchStartTime;

  if (touchDuration < 200) {
    const touch = e.changedTouches[0];
    createClickEffect(touch.clientX, touch.clientY);
  }
});

// Special Birthday Message
setTimeout(() => {
  const specialMessage = document.createElement("div");
  specialMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 102, 177, 0.95);
        color: white;
        padding: 25px 35px;
        border-radius: 15px;
        font-size: 1.3rem;
        font-weight: bold;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.5s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
  specialMessage.textContent = "🎉 Happy Birthday Ansh! 🎉";

  document.body.appendChild(specialMessage);

  // Fade in
  setTimeout(() => {
    specialMessage.style.opacity = "1";
  }, 100);

  // Fade out and remove
  setTimeout(() => {
    specialMessage.style.opacity = "0";
    setTimeout(() => {
      specialMessage.remove();
    }, 500);
  }, 4000);
}, 2000);

// Performance optimization
window.addEventListener("scroll", function () {
  // Throttle scroll events for better performance
  if (!window.scrollTimeout) {
    window.scrollTimeout = setTimeout(() => {
      // Scroll-based effects here
      window.scrollTimeout = null;
    }, 16); // ~60fps
  }
});
