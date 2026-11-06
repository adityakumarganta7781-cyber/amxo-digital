/**
 * AMXO DIGITAL — "We Build Digital Experiences."
 * Modern Modular Vanilla JavaScript Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Global State & DOM Cache ---
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const spotlight = document.querySelector('.ambient-spotlight');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  const utcClockElements = document.querySelectorAll('.live-utc-clock');
  const contactForm = document.getElementById('contactForm');
  const formStatusAlert = document.getElementById('formStatusAlert');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // --- 2. Live Global Agency Time Clock (UTC) ---
  const updateUtcClock = () => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    const timeString = `${utcHours}:${utcMinutes}:${utcSeconds} UTC`;

    utcClockElements.forEach(el => {
      el.textContent = timeString;
    });
  };
  setInterval(updateUtcClock, 1000);
  updateUtcClock();

  // --- 3. Ambient Cursor Spotlight (Desktop Only) ---
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateSpotlight = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateSpotlight);
    };
    requestAnimationFrame(animateSpotlight);
  } else if (spotlight) {
    spotlight.style.display = 'none';
  }

  // --- 4. Header Scroll State & Sticky Elevation ---
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 5. Mobile Navigation Drawer ---
  if (menuToggle && mobileNav) {
    const toggleMenu = () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        menuToggle.classList.add('is-active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  }

  // --- 6. Active Navigation Link Spy ---
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
    }
  );

  sections.forEach((section) => spyObserver.observe(section));

  // --- 7. Back To Top Smooth Scroll ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // --- 8. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- 9. Portfolio Filter Tabs ---
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const cardCategories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- 10. Concept Projects Case Study Data & Modal ---
  const projectsData = {
    aura: {
      title: 'Aura Haute Horlogerie',
      badge: 'Concept Project — Architectural Case Study',
      category: 'E-commerce & Bespoke Web Development',
      year: '2026',
      clientType: 'Luxury Swiss Horology Brand',
      duration: '8 Weeks Architectural Sprint',
      deliverables: 'Headless E-commerce, 3D WebGL Configurator, Micro-interactions, Global Checkout',
      image: 'assets/images/project-horology.svg',
      overview:
        'A bespoke luxury digital flagship designed for a premier Swiss horology house. The experience pairs monumental editorial typography with a low-latency WebGL custom watch configurator, allowing prospective collectors to customize bezels, dials, and precious metal bracelets in real time before reserving an allocation.',
      architecture:
        'Constructed on an ultra-lightweight headless architecture with client-side state synchronisation, sub-second route transitions, and multi-currency global checkout integration.',
      results:
        'Engineered to achieve a 99/100 Google Lighthouse performance score and sub-0.8s time-to-interactive, proving that extreme luxury aesthetics and lightning-fast speed can coexist seamlessly.',
    },
    verdant: {
      title: 'Verdant Capital Partners',
      badge: 'Concept Project — Architectural Case Study',
      category: 'Website Development & Redesign',
      year: '2026',
      clientType: 'Global Climate & Industrial VC Fund',
      duration: '6 Weeks Strategic Sprint',
      deliverables: 'Brand Elevation, Interactive Portfolio Matrix, LP Data Room Portal, ESG Telemetry UI',
      image: 'assets/images/project-capital.svg',
      overview:
        'A comprehensive digital overhaul for an institutional sustainable venture firm managing over $1.8B in deployed capital. The redesign re-architected complex LP financial reporting into an intuitive, high-touch portal with interactive sparkline charts and live ESG metric feeds.',
      architecture:
        'Features encrypted static data feeds, SVG vector telemetry graphs, responsive data tables, and an institutional typography system balancing classical serif authority with modern clarity.',
      results:
        'Reduced investor document retrieval time by 65% in usability prototypes and eliminated legacy code bloat with a 78% reduction in total page weight.',
    },
    nexus: {
      title: 'Nexus Intelligence',
      badge: 'Concept Project — Architectural Case Study',
      category: 'AI-Powered Solutions & Landing Page',
      year: '2026',
      clientType: 'Enterprise AI Governance Platform',
      duration: '5 Weeks Rapid Deployment',
      deliverables: 'Interactive Agent Sandbox, Multimodal Telemetry UI, High-Conversion Landing Experience',
      image: 'assets/images/project-nexus.svg',
      overview:
        'A striking, authoritative product launch and enterprise acquisition interface for an autonomous agent governance system. Designed to demystify complex neural consensus protocols and demonstrate zero-latency inference safety guardrails for Fortune 500 CTOs.',
      architecture:
        'Engineered with reactive SVG neural visualizers, interactive safety scenario testing controls, and clean lead routing pipeline integrations without third-party tracking scripts.',
      results:
        'Achieved zero external script dependencies, total privacy-first analytics, and a conversion-focused narrative structure designed for enterprise decision-makers.',
    },
    atelier: {
      title: 'Atelier Monochrome',
      badge: 'Concept Project — Architectural Case Study',
      category: 'Website Development & Portfolio',
      year: '2026',
      clientType: 'High-End Architectural Studio & Archive',
      duration: '7 Weeks Design & Development',
      deliverables: 'Spatial BIM Archive, Golden-Ratio Grid System, Virtual 360° Walkthrough UI',
      image: 'assets/images/project-atelier.svg',
      overview:
        'An architectural monograph and digital archive celebrating monolithic residential structures across Southern Europe. Built with extreme attention to structural proportions, negative space, and typographic cadence based on the golden ratio.',
      architecture:
        'Custom lightweight masonry layout with progressive WebP image loading, responsive architectural drawings, and fluid cursor-guided spatial navigation.',
      results:
        'Delivers a serene gallery-grade experience that honors the architects physical craftsmanship without cumbersome loading screens or visual distractions.',
    },
    solaris: {
      title: 'Solaris Mobility',
      badge: 'Concept Project — Architectural Case Study',
      category: 'Landing Pages & High-Ticket Acquisition',
      year: '2026',
      clientType: 'Electric Aviation & Hypersonic Transport',
      duration: '4 Weeks Concept Sprint',
      deliverables: 'Aero HUD Simulator, Route Reservation Engine, Interactive Flight Deck Preview',
      image: 'assets/images/project-solaris.svg',
      overview:
        'A high-ticket acquisition landing page engineered for the unveiling of an all-electric hypersonic eVTOL aircraft. Bridges aerodynamic telemetry visuals with a frictionless private flight route reservation engine.',
      architecture:
        'Features CSS-driven radar sweep simulations, vector flight trajectory calculators, and custom luxury form controls for private membership applications.',
      results:
        'Built with ultra-lean semantics, achieving a 100% SEO audit rating and instantaneous mobile responsiveness across all device viewports.',
    },
    kinetic: {
      title: 'Kinetic Longevity Lab',
      badge: 'Concept Project — Architectural Case Study',
      category: 'AI-Powered Solutions & Web Application',
      year: '2026',
      clientType: 'Precision Epigenetic Diagnostics Portal',
      duration: '6 Weeks Engineering Sprint',
      deliverables: 'Biomarker Synthesis UI, DNA Waveform Modeling, HIPAA-Ready Client Dashboard Concept',
      image: 'assets/images/project-kinetic.svg',
      overview:
        'A clinical-grade, highly sophisticated web interface for an AI-powered longevity clinic. Translates complex epigenetic biomarkers and genomic sequencing telemetry into an empowering, serene member dashboard.',
      architecture:
        'Constructed with modular CSS grid architecture, dynamic vector biomarker gauges, and a calm midnight teal & champagne gold color hierarchy designed to convey trust and clinical prestige.',
      results:
        'Demonstrates how complex biomedical intelligence can be formatted into an intuitive, elegant executive-tier digital product.',
    },
  };

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    document.getElementById('modalProjectBadge').textContent = data.badge;
    document.getElementById('modalProjectCategory').textContent = data.category;
    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalClientType').textContent = data.clientType;
    document.getElementById('modalDuration').textContent = data.duration;
    document.getElementById('modalDeliverables').textContent = data.deliverables;
    document.getElementById('modalOverview').textContent = data.overview;
    document.getElementById('modalArchitecture').textContent = data.architecture;
    document.getElementById('modalResults').textContent = data.results;

    const modalImg = document.getElementById('modalProjectImg');
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = `${data.title} Case Study Preview`;
    }

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on an actual external link inside card
      if (e.target.tagName.toLowerCase() === 'a') return;
      const projectId = card.getAttribute('data-project-id');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // --- 11. Service Card Inquiries (Pre-select in contact form) ---
  const serviceInquireLinks = document.querySelectorAll('.service-action-link');
  serviceInquireLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceTarget = link.getAttribute('data-service-select');
      if (serviceTarget) {
        const checkbox = document.querySelector(`input[name="services"][value="${serviceTarget}"]`);
        if (checkbox) {
          checkbox.checked = true;
        }
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- 12. Copy Email to Clipboard ---
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = 'amxodigital@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const toast = btn.parentElement.querySelector('.copy-toast');
        if (toast) {
          toast.style.display = 'block';
          toast.textContent = '✓ Email address copied to clipboard';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 3500);
        } else {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>✓ Copied</span>';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 3000);
        }
      }).catch(() => {
        // Fallback for older browsers
        window.location.href = `mailto:${email}`;
      });
    });
  });

  // --- 13. Functional Contact Form Submission ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const companyInput = document.getElementById('clientCompany');
      const budgetInput = document.getElementById('clientBudget');
      const messageInput = document.getElementById('clientMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const budget = budgetInput ? budgetInput.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        showFormAlert('error', 'Please fulfill all required fields: Name, Work Email, and Project Brief.');
        return;
      }

      if (!emailRegex.test(email)) {
        showFormAlert('error', 'Please provide a valid corporate or personal email address.');
        return;
      }

      // Collect selected services
      const selectedServices = [];
      document.querySelectorAll('input[name="services"]:checked').forEach((cb) => {
        selectedServices.push(cb.value);
      });

      const servicesString = selectedServices.length > 0 ? selectedServices.join(', ') : 'Not specified';

      // Build structured email payload
      const mailtoSubject = encodeURIComponent(`Project Inquiry: ${name} (${company || 'Direct Client'}) — AMXO DIGITAL`);
      const mailtoBody = encodeURIComponent(
        `Dear AMXO Digital Team,\n\n` +
        `I would like to initiate a digital project inquiry.\n\n` +
        `CLIENT DETAILS:\n` +
        `- Full Name: ${name}\n` +
        `- Work Email: ${email}\n` +
        `- Organization: ${company || 'N/A'}\n` +
        `- Targeted Services: ${servicesString}\n` +
        `- Estimated Investment Range: ${budget || 'To be discussed'}\n\n` +
        `PROJECT BRIEF & VISION:\n` +
        `${message}\n\n` +
        `Best regards,\n${name}`
      );

      const mailtoUrl = `mailto:amxodigital@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Show immediate success confirmation
      showFormAlert(
        'success',
        `Thank you, ${name}. Your project parameters have been formatted. Launching your email client to send directly to amxodigital@gmail.com...`
      );

      // Trigger user's mail client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      // Reset form fields
      contactForm.reset();
    });
  }

  const showFormAlert = (type, message) => {
    if (!formStatusAlert) return;
    formStatusAlert.className = `form-status-alert ${type}`;
    formStatusAlert.textContent = message;
    formStatusAlert.style.display = 'block';

    if (type === 'error') {
      setTimeout(() => {
        formStatusAlert.style.display = 'none';
      }, 6000);
    }
  };
});

