function initParallax() {
  const parallaxBg = document.querySelector(".parallax-bg");
  if (!parallaxBg) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      parallaxBg.style.transform = `translateY(${rate}px)`;
    },
    { passive: true }
  );
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
        header.style.backdropFilter = "blur(15px)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
        header.style.backdropFilter = "blur(10px)";
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
}

function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(
    ".problem-card, .step, .modalidade-card, .beneficio-card, .solution-content, .beneficio-main"
  );
  elements.forEach((el) => observer.observe(el));
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-image");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}

function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (counter) => {
    const targetText = counter.textContent;
    const isPercentage = targetText.includes("%");
    const isCurrency = targetText.includes("R$");
    const isNumber = targetText.includes("M+");

    let finalValue;
    if (isPercentage) finalValue = parseInt(targetText, 10);
    else if (isCurrency) finalValue = 200;
    else if (isNumber) finalValue = 1.5;
    else return;

    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      const current = finalValue * progress;

      if (isPercentage) {
        counter.textContent = Math.floor(current) + "%";
      } else if (isCurrency) {
        counter.textContent = "R$ " + Math.floor(current) + "B";
      } else if (isNumber) {
        counter.textContent = current.toFixed(1) + "M+";
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function initLoadingAnimation() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    const elements = document.querySelectorAll(".loading");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transitionDelay = `${index * 150}ms`;
      }, 0);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initParallax();
  initSmoothScrolling();
  initHeaderScroll();
  initMobileMenu();
  initScrollAnimations();
  initLazyLoading();
  initCounterAnimation();
  initLoadingAnimation();
});
