// ==================== Auto Year ====================
document.getElementById("year").textContent = new Date().getFullYear();

// ==================== Side Menu ====================
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

// ==================== Sticky Navbar ====================
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ==================== Typed Text Effect ====================
const typedElement = document.getElementById("typedText");
const roles = [
  "Full-Stack Developer",
  "Problem Solver",
  "Laravel Expert",
  "React Developer",
  "Team Player",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // pause before next word
  }

  setTimeout(typeText, typingSpeed);
}

typeText();

// ==================== Scroll Animations ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// ==================== Back to Top ====================
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==================== Dark/Light Mode ====================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check saved preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ==================== Mobile Tap-to-Flip ====================
const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  document.querySelectorAll(".work").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't flip if clicking on a link or button
      if (e.target.closest("a") || e.target.closest("button")) return;

      // Close other flipped cards
      document.querySelectorAll(".work.flipped").forEach((other) => {
        if (other !== card) other.classList.remove("flipped");
      });

      card.classList.toggle("flipped");
    });
  });
}

// ==================== Toggle Tech Tags ====================
function toggleTechTags(element) {
  const techOverlap = element.closest(".tech-overlap");
  techOverlap.classList.toggle("expanded");

  if (techOverlap.classList.contains("expanded")) {
    element.textContent = "Less";
  } else {
    element.textContent = "+7";
  }
}

// ==================== Contact Form (Formspree) ====================
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formMessage.className = "form-message";
    formMessage.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formMessage.textContent =
          "✓ Message sent successfully! I'll get back to you soon.";
        formMessage.className = "form-message success";
        form.reset();
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      formMessage.textContent =
        "✗ Something went wrong. Please try again or email me directly.";
      formMessage.className = "form-message error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}