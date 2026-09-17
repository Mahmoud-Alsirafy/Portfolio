/**
 * Mahmoud Wael — Portfolio Scripts
 * Vanilla JavaScript (ES6+)
 * English LTR Support
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Navigation & Header Scroll State
     -------------------------------------------------------------------------- */
  const header = document.querySelector('.header');
  const backToTopBtn = document.querySelector('.back-to-top');

  const handleScrollState = () => {
    const currentScrollY = window.scrollY;

    // Sticky Navbar elevation
    if (currentScrollY > 30) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }

    // Back to top visibility
    if (currentScrollY > 400) {
      backToTopBtn?.classList.add('is-visible');
    } else {
      backToTopBtn?.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState(); // Initial check

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* --------------------------------------------------------------------------
     2. Mobile Drawer Menu & Overlay
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileCloseBtn = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    hamburgerBtn?.classList.add('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    mobileNav?.classList.add('is-open');
    mobileBackdrop?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    hamburgerBtn?.classList.remove('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('is-open');
    mobileBackdrop?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     3. Active Navigation Link on Scroll (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop links
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });

        // Update mobile links
        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));

  /* --------------------------------------------------------------------------
     4. Scroll Reveal Animations (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  /* --------------------------------------------------------------------------
     5. Animated Number Counters
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedCounters = false;

  const animateCounters = () => {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count') || '0', 10);
      const prefix = stat.getAttribute('data-prefix') || '+';
      const duration = 1400; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = `${prefix}${target}`;
          clearInterval(timer);
        } else {
          stat.textContent = `${prefix}${Math.floor(current)}`;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedCounters) {
          hasAnimatedCounters = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  /* --------------------------------------------------------------------------
     6. Projects Filtering System
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. Project Details Modal
     -------------------------------------------------------------------------- */
  const projectModal = document.querySelector('#projectModal');
  const modalCloseBtn = projectModal?.querySelector('.modal-close-btn');
  const modalCloseFooterBtn = projectModal?.querySelector('.modal-close-footer');
  const modalImage = projectModal?.querySelector('#modalImage');
  const modalTitle = projectModal?.querySelector('#modalTitle');
  const modalDescription = projectModal?.querySelector('#modalDescription');
  const modalFeatures = projectModal?.querySelector('#modalFeatures');
  const modalTags = projectModal?.querySelector('#modalTags');
  const modalGithubLink = projectModal?.querySelector('#modalGithubLink');
  const modalLiveLink = projectModal?.querySelector('#modalLiveLink');

  // Database of project details in English
  const projectsData = {
    medlink: {
      title: 'MedLink / HealthHub — Electronic Health Records System',
      image: 'assets/images/projects/medlink.svg',
      description: 'A comprehensive digital healthcare management platform engineered to streamline electronic medical records (EMR/EHR). Architected with modular Laravel services and precise Role-Based Access Control (RBAC), enabling doctors, patients, and clinic administrators to securely interact with medical data while adhering to privacy standards.',
      features: [
        'Multi-role authentication (Doctor, Patient, Clinic Admin) with granular permission guards.',
        'Digital prescription management and automated PDF medical report generation.',
        'Interactive real-time clinical dashboard displaying appointment queues and patient histories.',
        'RESTful APIs ready for cross-platform integration with mobile apps and lab instruments.'
      ],
      tags: ['PHP 8.2', 'Laravel', 'MySQL', 'RESTful APIs', 'RBAC', 'JavaScript'],
      github: 'https://github.com/Mahmoud-Alsirafy/HealthHub',
      demo: 'https://medlink.example.com'
    },
    petcare: {
      title: 'PetCare — Veterinary Clinic & Pet Services Platform',
      image: 'assets/images/projects/petcare.svg',
      description: 'An all-in-one web application for veterinary hospitals and pet care facilities. Allows pet owners to seamlessly schedule clinic appointments, view vaccine logs, and track wellness plans, while giving veterinarians full control over clinical scheduling.',
      features: [
        'Real-time appointment booking engine with automatic doctor slot availability checks.',
        'Pet medical history & vaccination records timeline with automated email reminders.',
        'Administrative dashboard for clinic financial analytics and high-demand service tracking.',
        'Fully responsive, clean interface tailored for effortless mobile navigation.'
      ],
      tags: ['Laravel', 'PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
      github: 'https://github.com/Mahmoud-Alsirafy',
      demo: 'https://petcare.example.com'
    },
    ecommerce: {
      title: 'ShopFlow — Enterprise E-Commerce System',
      image: 'assets/images/projects/ecommerce.svg',
      description: 'A robust e-commerce architecture built with performance, security, and scalability at its core. Features structured relational databases for catalog hierarchy, customer order lifecycles, inventory auditing, and fast checkout flows.',
      features: [
        'Multi-tier product catalog with instant search and category/price filtering.',
        'Advanced stock and inventory tracking with automatic out-of-stock guards.',
        'Dynamic AJAX shopping cart supporting instant quantity adjustments without page reload.',
        'RESTful API foundation engineered for payment gateway webhooks and shipping logistics.'
      ],
      tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Eloquent'],
      github: 'https://github.com/Mahmoud-Alsirafy/online-store',
      demo: 'https://shopflow.example.com'
    },
    portfolio: {
      title: 'Mahmoud Wael — Senior Developer Portfolio',
      image: 'assets/images/projects/portfolio.svg',
      description: 'A clean, high-performance personal portfolio showcasing full-stack capabilities with an emphasis on backend architecture, Laravel excellence, and database engineering. Built from scratch with zero framework overhead.',
      features: [
        'Pure Vanilla stack with zero external library overhead for blazingly fast load speeds.',
        'Harmonious, calm aesthetic adhering to WCAG accessibility and responsive design standards.',
        'Interactive project filtering engine and accessible detail dialog modal.',
        'Custom touch-friendly testimonials carousel and comprehensive form validation.'
      ],
      tags: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Web Performance', 'SEO'],
      github: 'https://github.com/Mahmoud-Alsirafy/Portfolio',
      demo: 'https://mahmoud-wael.dev'
    }
  };

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    if (modalImage) modalImage.src = data.image;
    if (modalImage) modalImage.alt = data.title;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDescription) modalDescription.textContent = data.description;

    // Render features
    if (modalFeatures) {
      modalFeatures.innerHTML = data.features
        .map(
          (feature) => `
          <div class="modal-feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${feature}</span>
          </div>`
        )
        .join('');
    }

    // Render tags
    if (modalTags) {
      modalTags.innerHTML = data.tags
        .map((tag) => `<span class="project-tag">${tag}</span>`)
        .join('');
    }

    // Links
    if (modalGithubLink) modalGithubLink.href = data.github;
    if (modalLiveLink) modalLiveLink.href = data.demo;

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      if (projectId) openModal(projectId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalCloseFooterBtn?.addEventListener('click', closeModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     8. Testimonials Carousel (Vanilla JS with Autoplay & Swipe)
     -------------------------------------------------------------------------- */
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval = null;

    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Navigate to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    const updateCarousel = () => {
      // In LTR, translateX moves negative for subsequent slides
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      updateCarousel();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    nextBtn?.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });

    prevBtn?.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });

    // Autoplay
    const startAutoplay = () => {
      if (!autoplayInterval) {
        autoplayInterval = setInterval(nextSlide, 5500);
      }
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    const carouselWrapper = document.querySelector('.testimonials-wrapper');
    carouselWrapper?.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper?.addEventListener('mouseleave', startAutoplay);
    carouselWrapper?.addEventListener('focusin', stopAutoplay);
    carouselWrapper?.addEventListener('focusout', startAutoplay);

    // Touch Swipe Support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      // In LTR, swiping left (negative diff) advances to the next slide
      if (Math.abs(diffX) > 45) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    }, { passive: true });

    startAutoplay();
    updateCarousel();
  }

  /* --------------------------------------------------------------------------
     9. Contact Form Validation (English)
     -------------------------------------------------------------------------- */
  const contactForm = document.querySelector('#contactForm');
  const formFeedback = document.querySelector('#formFeedback');

  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const subjectInput = contactForm.querySelector('#subject');
    const messageInput = contactForm.querySelector('#message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setFieldError = (input, message) => {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      const errorElem = input.nextElementSibling;
      if (errorElem && errorElem.classList.contains('form-error')) {
        errorElem.textContent = message;
      }
    };

    const clearFieldError = (input) => {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      const errorElem = input.nextElementSibling;
      if (errorElem && errorElem.classList.contains('form-error')) {
        errorElem.textContent = '';
      }
    };

    const validateName = () => {
      const val = nameInput.value.trim();
      if (!val) {
        setFieldError(nameInput, 'This field is required.');
        return false;
      }
      if (val.length < 3) {
        setFieldError(nameInput, 'Name must be at least 3 characters.');
        return false;
      }
      clearFieldError(nameInput);
      return true;
    };

    const validateEmail = () => {
      const val = emailInput.value.trim();
      if (!val) {
        setFieldError(emailInput, 'This field is required.');
        return false;
      }
      if (!emailRegex.test(val)) {
        setFieldError(emailInput, 'Please enter a valid email address.');
        return false;
      }
      clearFieldError(emailInput);
      return true;
    };

    const validateSubject = () => {
      const val = subjectInput.value.trim();
      if (!val) {
        setFieldError(subjectInput, 'This field is required.');
        return false;
      }
      clearFieldError(subjectInput);
      return true;
    };

    const validateMessage = () => {
      const val = messageInput.value.trim();
      if (!val) {
        setFieldError(messageInput, 'This field is required.');
        return false;
      }
      if (val.length < 10) {
        setFieldError(messageInput, 'Message is too short (min 10 characters).');
        return false;
      }
      clearFieldError(messageInput);
      return true;
    };

    nameInput?.addEventListener('blur', validateName);
    emailInput?.addEventListener('blur', validateEmail);
    subjectInput?.addEventListener('blur', validateSubject);
    messageInput?.addEventListener('blur', validateMessage);

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"></circle>
          </svg>
          Sending...
        `;

        setTimeout(() => {
          if (formFeedback) {
            formFeedback.className = 'form-feedback is-success';
            formFeedback.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Thank you, ${nameInput.value}! Your message has been received successfully (Client-side simulation). I will get back to you shortly.</span>
            `;
          }

          contactForm.reset();
          [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
            input.classList.remove('is-valid');
          });

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          formFeedback?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 750);
      }
    });
  }
});
