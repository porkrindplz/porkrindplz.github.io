/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Gallery system - supports multiple galleries
const galleries = {};

function setupGallery(galleryId) {
  const galleryElement = document.getElementById(galleryId);
  if (galleryElement) {
    const galleryItems = galleryElement.querySelectorAll('.gallery__item');
    if (galleryItems.length > 0) {
      galleries[galleryId] = {
        items: galleryItems,
        index: 0
      };
      renderGallery(galleryId);
    }
  }
}

function renderGallery(galleryId) {
  const gallery = galleries[galleryId];
  if (!gallery) return;

  gallery.items.forEach((item, index) => {
    item.style.display = index === gallery.index ? 'block' : 'none';
  });
}

function galleryNext(galleryId) {
  const gallery = galleries[galleryId];
  if (!gallery) return;
  gallery.index = (gallery.index + 1) % gallery.items.length;
  renderGallery(galleryId);
}

function galleryPrev(galleryId) {
  const gallery = galleries[galleryId];
  if (!gallery) return;
  gallery.index = (gallery.index - 1 + gallery.items.length) % gallery.items.length;
  renderGallery(galleryId);
}

// Initialize galleries
document.addEventListener('DOMContentLoaded', () => {
  setupGallery('mochiGallery');
  setupGallery('TLEGallery');
  setupGallery('AdditionalJamMentions');
  setupGallery('SST');
  setupGallery('DLD');
  setupGallery('HG');
  setupGallery('BE');
  setupGallery('DiveProto');
  setupGallery('ZH');
  setupLightbox();
});

/* --------------------------------------- */
/* ----- Lightbox Functionality ----- */
/* --------------------------------------- */

let lightboxImages = [];
let currentLightboxIndex = 0;

function setupLightbox() {
  // Add click listeners to individual work images (non-gallery images)
  const workImages = document.querySelectorAll('.work__image');
  workImages.forEach((img) => {
    // Only add listener if it's NOT inside a gallery
    if (!img.closest('.gallery')) {
      img.addEventListener('click', () => {
        // For individual work images, create a single-image lightbox
        lightboxImages = [img];
        currentLightboxIndex = 0;
        openLightbox();
      });
    }
  });

  // Add click listeners to gallery images
  const galleryImages = document.querySelectorAll('.gallery__item img');
  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      // Find which gallery this image belongs to
      const galleryElement = img.closest('.gallery');
      const galleryId = galleryElement.id;
      const galleryImgs = galleryElement.querySelectorAll('.gallery__item img');

      // Only include images from THIS specific gallery
      lightboxImages = Array.from(galleryImgs);
      currentLightboxIndex = Array.from(galleryImgs).indexOf(img);
      openLightbox();
    });
  });

  // Add keyboard support
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        lightboxPrev();
      } else if (e.key === 'ArrowRight') {
        lightboxNext();
      }
    }
  });

  // Close lightbox when clicking outside the image
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
      closeLightbox();
    }
  });

  // Add touch swipe support for mobile
  setupLightboxSwipe();
}

function openLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (lightboxImages.length > 0) {
    const currentImage = lightboxImages[currentLightboxIndex];
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;

    // Update counter
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;

    // Show/hide navigation buttons based on array length
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    if (lightboxImages.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

function lightboxNext() {
  if (lightboxImages.length > 1) {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  }
}

function lightboxPrev() {
  if (lightboxImages.length > 1) {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  }
}

function updateLightboxImage() {
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCounter = document.getElementById('lightboxCounter');

  const currentImage = lightboxImages[currentLightboxIndex];
  lightboxImage.src = currentImage.src;
  lightboxImage.alt = currentImage.alt;

  // Update counter
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
}

/* ----- Touch Swipe Functionality ----- */
/* --------------------------------------- */

function setupLightboxSwipe() {
  const lightboxContent = document.querySelector('.lightbox__content');
  let touchStartX = 0;
  let touchEndX = 0;
  let minSwipeDistance = 50; // Minimum distance in pixels to register a swipe

  lightboxContent.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxContent.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    // Check if the swipe distance is significant
    if (Math.abs(swipeDistance) >= minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right - show previous image
        lightboxPrev();
      } else {
        // Swiped left - show next image
        lightboxNext();
      }
    }
  }
}
