// Carousel data
const slides = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-1TEd9riHbifLKH6pfxB4rktYTwLqgU.jpg",
    caption: "Dashboard - Acompanhe o progresso e gerencie as atividades",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-LwZsseuGCDlCUlo2R6Y5M5IgBN2XjZ.jpg",
    caption: "Gestão de Crianças - Gerencie as crianças cadastradas no sistema",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-RJ2JUTiRcqWpj5rWSLa3M0EiTcwEiO.jpg",
    caption: "Recursos que Fazem a Diferença",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-VbQmRk8YhIvMImDN1WpftVdBkoZcUo.jpg",
    caption: "Funcionalidades Principais do Sistema",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-GOeYq8MnUTgy3pTaUbBHt7Ne6mLHqf.jpg",
    caption: "Pronto para Transformar Vidas?",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WHKzsaY0v0MvENy3m1bMuVHVOP6D5x.jpg",
    caption: "Tela de Cadastro - Crie sua conta",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-Uy6KGotM8DBktDRAQuGcg605QKXS9m.jpg",
    caption: "Crianças Recentes e Metas em Andamento",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5VFNynbJRWknvOfenz4EZfeDsFsm0w.jpg",
    caption: "Progresso - Visualize a evolução das crianças e metas",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2lvc658InCQkhmHn8RQ368XupVPTUy.jpg",
    caption:
      "Gráficos de Progresso - Análise detalhada por criança e categoria",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-OcUTaPbmlAP0sGfE8sNAmPPylHJsS9.jpg",
    caption: "Atualizações Recentes - Acompanhe as últimas evoluções",
  },
];

// State
let currentSlide = 0;

// Load click data from localStorage or use defaults
function loadClickData() {
  const savedFeatures = localStorage.getItem("conectatea-feature-clicks");
  const savedPricing = localStorage.getItem("conectatea-pricing-clicks");

  return {
    features: savedFeatures
      ? JSON.parse(savedFeatures)
      : {
          metas: 0,
          comunicacao: 0,
          relatorios: 0,
          ia: 0,
        },
    pricing: savedPricing
      ? JSON.parse(savedPricing)
      : {
          essencial: 0,
          profissional: 0,
        },
  };
}

// Save click data to localStorage
function saveClickData() {
  localStorage.setItem(
    "conectatea-feature-clicks",
    JSON.stringify(clickedFeatures)
  );
  localStorage.setItem(
    "conectatea-pricing-clicks",
    JSON.stringify(clickedPricing)
  );
}

// Clear click data from localStorage (utility function)
function clearClickData() {
  localStorage.removeItem("conectatea-feature-clicks");
  localStorage.removeItem("conectatea-pricing-clicks");

  // Reset counters
  Object.keys(clickedFeatures).forEach((key) => (clickedFeatures[key] = 0));
  Object.keys(clickedPricing).forEach((key) => (clickedPricing[key] = 0));

  // Update UI
  updateClickCountsUI();
}

// Initialize click data
const clickData = loadClickData();
const clickedFeatures = clickData.features;
const clickedPricing = clickData.pricing;

// Touch handling for carousel
let touchStartX = 0;
let touchEndX = 0;
let isTouch = false;

// Initialize carousel
function initCarousel() {
  updateCarousel();
  createDots();
  setupTouchEvents();
}

// Update carousel display
function updateCarousel() {
  const image = document.getElementById("carousel-image");
  const caption = document.getElementById("carousel-caption");
  const current = document.getElementById("carousel-current");
  const total = document.getElementById("carousel-total");

  image.src = slides[currentSlide].url;
  image.alt = slides[currentSlide].caption;
  caption.textContent = slides[currentSlide].caption;
  current.textContent = currentSlide + 1;
  total.textContent = slides.length;

  updateDots();
}

// Create carousel dots
function createDots() {
  const dotsContainer = document.getElementById("carousel-dots");
  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
    dot.onclick = () => goToSlideEnhanced(index);
    dotsContainer.appendChild(dot);
  });

  updateDots();
}

// Update dots active state
function updateDots() {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Navigate to specific slide
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Handle feature click
function handleFeatureClick(feature) {
  clickedFeatures[feature]++;
  document.getElementById(`click-${feature}`).textContent =
    clickedFeatures[feature];

  // Save to localStorage
  saveClickData();

  // Send to backend (non-blocking)
  sendClickToBackend(feature, 'feature');
}

// Handle pricing click
function handlePricingClick(plan) {
  clickedPricing[plan]++;
  document.getElementById(`click-${plan}`).textContent = clickedPricing[plan];

  // Save to localStorage
  saveClickData();

  // Send to backend (non-blocking)
  sendClickToBackend(plan, 'pricing');
}

// Send click data to backend
async function sendClickToBackend(key, type) {
  try {
    const response = await fetch('/api/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, type })
    });

    if (!response.ok) {
      console.warn('Failed to send click to backend:', response.statusText);
    }
  } catch (error) {
    console.warn('Error sending click to backend:', error);
    // Não bloqueia a UI - continua funcionando com localStorage
  }
}

// Scroll to form
function scrollToForm() {
  const formSection = document.getElementById("registration-form");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    age: formData.get("age"),
    tools: formData.get("tools"),
    toolsOther: formData.get("tools-other"),
    features: formData.getAll("features"),
    featuresOther: formData.get("features-other"),
    price: formData.get("price"),
    beta: formData.get("beta"),
  };

  alert("Obrigado por se inscrever! Entraremos em contato em breve.");
  event.target.reset();
  updateFormVisibility(); // Reset form visibility after submit
}

// Update form visibility based on role selection
function updateFormVisibility() {
  const roleInputs = document.querySelectorAll('input[name="role"]');
  const ageGroup = document.getElementById("age-group");
  const pricingGroup = document.getElementById("pricing-group");

  let selectedRole = "";
  roleInputs.forEach((input) => {
    if (input.checked) {
      selectedRole = input.value;
    }
  });

  // Show/hide age field based on role
  if (ageGroup) {
    if (selectedRole === "pai") {
      ageGroup.style.display = "block";
    } else {
      ageGroup.style.display = "none";
    }
  }

  // Show/hide pricing field based on role
  if (pricingGroup) {
    if (selectedRole === "profissional") {
      pricingGroup.style.display = "block";
    } else {
      pricingGroup.style.display = "none";
    }
  }
}

// Handle "other" options visibility
function updateOtherFieldsVisibility() {
  // Tools other field
  const toolsInputs = document.querySelectorAll('input[name="tools"]');
  const toolsOtherField = document.getElementById("tools-other");

  toolsInputs.forEach((input) => {
    if (input.checked && input.value === "outro") {
      if (toolsOtherField) toolsOtherField.style.display = "block";
    } else if (input.checked) {
      if (toolsOtherField) toolsOtherField.style.display = "none";
    }
  });

  // Features other field
  const featuresOtherCheckbox = document.querySelector(
    'input[name="features"][value="outro"]'
  );
  const featuresOtherField = document.getElementById("features-other");

  if (featuresOtherCheckbox && featuresOtherField) {
    if (featuresOtherCheckbox.checked) {
      featuresOtherField.style.display = "block";
    } else {
      featuresOtherField.style.display = "none";
    }
  }
}

// Show notification function
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notif) => notif.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Setup touch events for carousel
function setupTouchEvents() {
  const carouselContainer = document.querySelector(".carousel-container");

  if (carouselContainer) {
    carouselContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    carouselContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
    carouselContainer.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
  }
}

// Handle touch start
function handleTouchStart(event) {
  isTouch = true;
  touchStartX = event.touches[0].clientX;
}

// Handle touch move (prevent default scrolling when swiping horizontally)
function handleTouchMove(event) {
  if (!isTouch) return;

  const touchCurrentX = event.touches[0].clientX;
  const diffX = Math.abs(touchCurrentX - touchStartX);
  const diffY = Math.abs(
    event.touches[0].clientY - (event.touches[0].clientY || 0)
  );

  // If horizontal movement is greater than vertical, prevent default scrolling
  if (diffX > diffY && diffX > 10) {
    event.preventDefault();
  }
}

// Handle touch end
function handleTouchEnd(event) {
  if (!isTouch) return;

  isTouch = false;
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
}

// Handle swipe gesture
function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchStartX - touchEndX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swipe left - next slide
      nextSlide();
    } else {
      // Swipe right - previous slide
      prevSlide();
    }
  }
}

// Auto-play carousel (optional - can be enabled/disabled)
let autoPlayInterval = null;
const autoPlayDelay = 5000; // 5 seconds

function startAutoPlay() {
  if (autoPlayInterval) return;

  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, autoPlayDelay);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

// Pause auto-play when user interacts
function pauseAutoPlayTemporarily() {
  stopAutoPlay();
  setTimeout(startAutoPlay, autoPlayDelay * 2); // Resume after double delay
}

// Enhanced navigation functions with auto-play handling
function nextSlideEnhanced() {
  pauseAutoPlayTemporarily();
  nextSlide();
}

function prevSlideEnhanced() {
  pauseAutoPlayTemporarily();
  prevSlide();
}

function goToSlideEnhanced(index) {
  pauseAutoPlayTemporarily();
  goToSlide(index);
}

// Update UI with saved click counts
function updateClickCountsUI() {
  // Update feature clicks
  Object.keys(clickedFeatures).forEach((feature) => {
    const element = document.getElementById(`click-${feature}`);
    if (element) {
      element.textContent = clickedFeatures[feature];
    }
  });

  // Update pricing clicks
  Object.keys(clickedPricing).forEach((plan) => {
    const element = document.getElementById(`click-${plan}`);
    if (element) {
      element.textContent = clickedPricing[plan];
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  updateClickCountsUI(); // Load saved click counts

  // Initialize form visibility
  updateFormVisibility();
  updateOtherFieldsVisibility();

  // Add event listeners for form interactions
  const roleInputs = document.querySelectorAll('input[name="role"]');
  roleInputs.forEach((input) => {
    input.addEventListener("change", updateFormVisibility);
  });

  const toolsInputs = document.querySelectorAll('input[name="tools"]');
  toolsInputs.forEach((input) => {
    input.addEventListener("change", updateOtherFieldsVisibility);
  });

  const featuresOtherCheckbox = document.querySelector(
    'input[name="features"][value="outro"]'
  );
  if (featuresOtherCheckbox) {
    featuresOtherCheckbox.addEventListener(
      "change",
      updateOtherFieldsVisibility
    );
  }

  // Optional: Start auto-play (uncomment to enable)
  // startAutoPlay()

  // Pause auto-play when page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      // Restart auto-play when page becomes visible again (if it was enabled)
      // startAutoPlay()
    }
  });
});
