/**
 * Om Kushwaha - Portfolio Interactive Scripts
 * Pure Vanilla JavaScript for high performance & micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navigation & Scroll Spy ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    // Add scrolled class when page is scrolled down
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for highlighting current section
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. Mobile Menu Toggle & Side Drawer ---
  const navBackdrop = document.getElementById('navBackdrop');
  const navDrawerClose = document.getElementById('navDrawerClose');

  const openMenu = () => {
    mobileToggle.classList.add('active');
    navLinksContainer.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileToggle.classList.remove('active');
    navLinksContainer.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
  };

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinksContainer.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navDrawerClose) {
      navDrawerClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside the nav drawer
    document.addEventListener('click', (e) => {
      if (
        navLinksContainer.classList.contains('open') &&
        !navLinksContainer.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Auto-close when resized back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  // --- 3. Interactive Project Modal Data & Controller ---
  const projectData = {
    food_donation: {
      title: 'Leftover Food Donation Platform',
      category: 'Mobile & Full Stack (React Native + Django + SQLite)',
      image: 'assets/images/food_donation.jpg',
      tags: ['React Native', 'Django', 'SQLite', 'JWT Auth', 'Multi-role', 'RESTful API'],
      desc: 'Full-stack mobile platform connecting food donors with NGOs, including donation posting, requests, fulfillment tracking, multi-role users, dashboards, authentication, and access control.',
      architecture: [
        'Decoupled architecture: React Native mobile client communicating with a Django REST Framework API.',
        'Multi-role authentication & authorization: separate flows for Food Donors vs. NGO Volunteers.',
        'Normalized SQLite database schemas with indexed queries for efficient donor-to-NGO matching.',
        'Full donation lifecycle: Listed → Claimed → En Route → Verified Pickup.'
      ],
      impact: [
        'Eliminated manual phone call coordination through direct in-app claiming workflows.',
        'Optimized API endpoints to minimize redundant network calls.',
        'Full lifecycle ownership: UI wireframing, database modeling, backend, testing.'
      ],
      github: 'https://github.com/omkushw02',
      demo: '#contact'
    },
    appointmate: {
      title: 'AppointMate – Personal Appointment Manager',
      category: 'Full Stack Web App (React + Vite + Firebase)',
      image: 'assets/images/appointment_mgr.jpg',
      tags: ['React', 'Vite', 'Firebase', 'Firestore', 'Firebase Auth', 'Firebase Hosting'],
      desc: 'Appointment management web application with client management, calendar, reminders, CRUD operations, conflict detection, rescheduling, Firebase Authentication, Firestore security rules, responsive UI, and Firebase Hosting deployment.',
      architecture: [
        'React + Vite frontend with responsive calendar and appointment timeline components.',
        'Firebase Authentication with Firestore Security Rules for role-based access control.',
        'Real-time conflict detection algorithm preventing double-booking across calendar slots.',
        'CRUD operations for clients and appointments with rescheduling and reminder support.'
      ],
      impact: [
        'Zero schedule overlap with automated slot validation and conflict detection.',
        'Secure data access enforced via Firestore Security Rules at the database level.',
        'Responsive UI deployed on Firebase Hosting — accessible on mobile and desktop.'
      ],
      github: 'https://github.com/omkushw02',
      demo: '#contact'
    },
    studymate_ai: {
      title: 'StudyMate AI – Your Personal AI Study Companion',
      category: 'AI Study Platform (Next.js + Supabase + Gemini AI)',
      image: 'assets/images/studymate_ai.jpg',
      tags: ['Next.js', 'Supabase', 'Gemini AI', 'PostgreSQL', 'pgvector', 'RAG', 'Supabase Auth'],
      desc: 'AI study platform for uploading study materials with AI Tutor conversations, quizzes, and flashcards — powered by RAG, document chunking, Gemini embeddings, PostgreSQL/pgvector, Supabase Auth, and Row Level Security.',
      architecture: [
        'RAG pipeline: document chunking → Gemini embeddings → pgvector semantic retrieval in PostgreSQL.',
        'AI Tutor powered by Gemini AI with context-grounded responses from uploaded study materials.',
        'Supabase Auth with Row Level Security ensuring each user only accesses their own data.',
        'Automated quiz and flashcard generation from uploaded PDFs and study notes.'
      ],
      impact: [
        'Reduced study preparation time by automating quiz and flashcard creation from raw materials.',
        'Semantic search via pgvector enables highly relevant AI Tutor answers grounded in user content.',
        'Row Level Security at database level ensures zero cross-user data leakage.'
      ],
      github: 'https://github.com/omkushw02',
      demo: '#contact'
    },
    coal_iot: {
      title: 'Coal Transportation Monitoring & Weight Tracking System',
      category: 'IoT System (ESP32 + Firebase + Web Dashboard)',
      image: 'assets/images/ai_agent.jpg',
      tags: ['ESP32', 'Load Cell (HX711)', 'NEO-6M GPS', 'Wi-Fi', 'Firebase Realtime DB', 'Web Dashboard'],
      desc: 'IoT system for monitoring coal transportation vehicle weight and GPS location — featuring weight calibration/filtering, GPS data collection, Wi-Fi communication, Firebase Realtime Database, and a live web dashboard.',
      architecture: [
        'ESP32 microcontroller interfacing with HX711 load cell amplifier for precise weight measurement.',
        'Weight calibration and noise filtering algorithms for accurate coal load readings.',
        'NEO-6M GPS module providing real-time vehicle location coordinates transmitted via Wi-Fi.',
        'Firebase Realtime Database as the backend; web dashboard visualizes live weight and GPS data.'
      ],
      impact: [
        'Real-time monitoring of vehicle weight and GPS location accessible via web dashboard.',
        'Calibration algorithms ensure consistent and accurate weight measurements under variable conditions.',
        'Wi-Fi + Firebase architecture enables remote access to transportation data from any browser.'
      ],
      github: 'https://github.com/omkushw02',
      demo: '#contact'
    }
  };

  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalHeroImg = document.getElementById('modalHeroImg');
  const modalTags = document.getElementById('modalTags');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalArchitecture = document.getElementById('modalArchitecture');
  const modalImpact = document.getElementById('modalImpact');
  const modalGithubLink = document.getElementById('modalGithubLink');

  // Track trigger element for safe focus restoration
  let projectModalLastActive = null;

  // Ensure modal starts hidden & inert
  if (modalOverlay) {
    modalOverlay.setAttribute('aria-hidden', 'true');
    modalOverlay.setAttribute('inert', '');
  }

  // Open Project Modal
  document.querySelectorAll('[data-project-id]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = trigger.getAttribute('data-project-id');
      const data = projectData[projId];

      if (!data) return;

      // Remember what opened the modal so we can restore focus on close
      projectModalLastActive = document.activeElement !== document.body ? document.activeElement : trigger;

      modalHeroImg.src = data.image;
      modalHeroImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDesc.textContent = data.desc;

      // Populate tags
      modalTags.innerHTML = data.tags
        .map((tag) => `<span class="project-tag">${tag}</span>`)
        .join('');

      // Populate architecture points
      modalArchitecture.innerHTML = data.architecture
        .map((item) => `<li>${item}</li>`)
        .join('');

      // Populate impact points
      modalImpact.innerHTML = data.impact
        .map((item) => `<li>${item}</li>`)
        .join('');

      modalGithubLink.href = data.github;

      // 1. Remove inert and set aria-hidden="false" BEFORE focusing any child
      modalOverlay.removeAttribute('inert');
      modalOverlay.setAttribute('aria-hidden', 'false');
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // 2. Move focus into the modal safely
      if (modalCloseBtn) {
        try { modalCloseBtn.focus({ preventScroll: true }); } catch (_) {}
        requestAnimationFrame(() => {
          try { modalCloseBtn.focus({ preventScroll: true }); } catch (_) {}
        });
      }
    });
  });

  // Close Project Modal — safe focus order
  function closeModal() {
    if (!modalOverlay) return;

    // 1. Blur any focused descendant BEFORE setting aria-hidden
    if (modalOverlay.contains(document.activeElement) && document.activeElement) {
      try { document.activeElement.blur(); } catch (_) {}
    }

    // 2. Restore focus to the element that opened the modal
    if (projectModalLastActive &&
        typeof projectModalLastActive.focus === 'function' &&
        document.contains(projectModalLastActive)) {
      try { projectModalLastActive.focus({ preventScroll: true }); } catch (_) {}
    }

    // 3. Confirm no descendant still has focus
    if (modalOverlay.contains(document.activeElement) && document.activeElement) {
      try { document.activeElement.blur(); } catch (_) {}
    }

    // 4. Safe to hide now — no child element has focus
    modalOverlay.setAttribute('aria-hidden', 'true');
    modalOverlay.setAttribute('inert', '');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Escape key closes project modal; Tab is trapped inside
  document.addEventListener('keydown', (e) => {
    if (!modalOverlay || !modalOverlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = modalOverlay.querySelectorAll(
        'button:not([disabled]), a[href]:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    }
  });

  // --- 5. Toast Notification System ---
  function showToast(message, icon = '✓') {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // --- 6. Quick Copy Email Functionality ---
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'omkushw01@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Om Kushwaha: omkushw01@gmail.com');
      });
    });
  });

  // --- 7. Interactive Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const subject = document.getElementById('subjectInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', '⚠');
        return;
      }

      // Simulate sending with user feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast('Thank you, ' + name + '! Your message has been prepared.', '✓');
        // Trigger mailto fallback so user can send immediately
        const mailtoUrl = `mailto:omkushw01@gmail.com?subject=${encodeURIComponent(
          subject || 'Portfolio Inquiry from ' + name
        )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

        window.location.href = mailtoUrl;

        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 700);
    });
  }

  // --- 8. Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

/* ==========================================================================
   Certificate Image Lightbox Modal (Zoom, Pan & High-Quality Fullscreen View)
   ========================================================================== */

let certCurrentZoom = 1;
const certMinZoom = 1;
const certMaxZoom = 3.5;
let certPanX = 0;
let certPanY = 0;
let isCertDragging = false;
let certDragStartX = 0;
let certDragStartY = 0;
let initialPinchDistance = null;
let initialPinchZoom = 1;

function updateCertTransform(smooth) {
  const viewport = document.getElementById('certModalViewport');
  const levelEl = document.getElementById('certZoomLevel');
  const body = document.getElementById('certModalBody');
  if (!viewport) return;

  viewport.style.transition = smooth ? 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';

  if (certCurrentZoom <= 1) {
    certPanX = 0;
    certPanY = 0;
    certCurrentZoom = 1;
    if (body) body.style.cursor = 'default';
  } else {
    if (body) body.style.cursor = isCertDragging ? 'grabbing' : 'grab';
  }

  viewport.style.transform = `translate(${certPanX}px, ${certPanY}px) scale(${certCurrentZoom})`;

  if (levelEl) {
    levelEl.textContent = `${Math.round(certCurrentZoom * 100)}%`;
  }
}

function setCertZoom(newZoom, smooth) {
  const clamped = Math.min(certMaxZoom, Math.max(certMinZoom, Number(newZoom.toFixed(2))));
  certCurrentZoom = clamped;
  if (certCurrentZoom === 1) {
    certPanX = 0;
    certPanY = 0;
  }
  updateCertTransform(smooth);
}

function certZoomIn() {
  setCertZoom(certCurrentZoom + 0.35, true);
}

function certZoomOut() {
  setCertZoom(certCurrentZoom - 0.35, true);
}

function certZoomReset() {
  setCertZoom(1, true);
}

function handleCertDoubleClick() {
  if (certCurrentZoom > 1.2) {
    setCertZoom(1, true);
  } else {
    setCertZoom(2, true);
  }
}

function handleCertWheel(e) {
  const overlay = document.getElementById('certModal');
  if (!overlay || !overlay.classList.contains('is-open')) return;
  e.preventDefault();
  const delta = e.deltaY < 0 ? 0.25 : -0.25;
  setCertZoom(certCurrentZoom + delta, false);
}

let certLastActiveElement = null;

function openCertModal(imgSrc, title, triggerBtn) {
  const overlay     = document.getElementById('certModal');
  const img         = document.getElementById('certModalImg');
  const titleEl     = document.getElementById('certModalTitle');
  const downloadBtn = document.getElementById('certDownloadBtn');
  const closeBtn    = document.getElementById('certModalClose');
  if (!overlay || !img) return;

  // Track the triggering element to safely restore focus on close
  certLastActiveElement = triggerBtn || (document.activeElement && document.activeElement !== document.body ? document.activeElement : null);

  img.src = imgSrc;
  img.alt = title || 'Certificate';
  if (titleEl) titleEl.textContent = title || 'Certificate';

  if (downloadBtn) {
    downloadBtn.href = imgSrc;
    const ext = imgSrc.substring(imgSrc.lastIndexOf('.'));
    const safeName = (title || 'certificate').toLowerCase().replace(/[^a-z0-9_-]+/g, '_');
    downloadBtn.setAttribute('download', safeName + ext);
  }

  certCurrentZoom = 1;
  certPanX = 0;
  certPanY = 0;
  updateCertTransform(false);

  // 1. Remove inert and set aria-hidden="false" before focusing any child element
  overlay.removeAttribute('inert');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // 2. Move focus into the modal safely
  if (closeBtn) {
    try { closeBtn.focus({ preventScroll: true }); } catch (e) {}
    requestAnimationFrame(() => {
      try { closeBtn.focus({ preventScroll: true }); } catch (e) {}
    });
  }
}

function closeCertModal(event, force) {
  const overlay = document.getElementById('certModal');
  if (!overlay) return;
  if (force || (event && event.target === overlay)) {
    // 1. Remove focus from any element inside the modal BEFORE applying aria-hidden="true"
    if (overlay.contains(document.activeElement) && document.activeElement) {
      if (typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }

    // 2. Return focus to the original triggering button outside the modal
    if (certLastActiveElement && typeof certLastActiveElement.focus === 'function' && document.contains(certLastActiveElement)) {
      certLastActiveElement.focus({ preventScroll: true });
    }

    // 3. Double-check that no descendant retained focus
    if (overlay.contains(document.activeElement) && document.activeElement) {
      document.activeElement.blur();
    }

    // 4. Safe to apply aria-hidden="true" and inert now that no descendant has focus
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('inert', '');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';

    setTimeout(() => {
      setCertZoom(1, false);
      const img = document.getElementById('certModalImg');
      if (img) img.src = '';
    }, 250);
  }
}

// Global initialization for modal controls & gestures
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn  = document.getElementById('certModalClose');
  const overlay   = document.getElementById('certModal');
  const zoomInBtn = document.getElementById('certZoomIn');
  const zoomOutBtn = document.getElementById('certZoomOut');
  const zoomResetBtn = document.getElementById('certZoomReset');
  const modalBody = document.getElementById('certModalBody');

  if (closeBtn) closeBtn.addEventListener('click', () => closeCertModal(null, true));
  if (overlay) overlay.addEventListener('click', (e) => closeCertModal(e));

  if (zoomInBtn) zoomInBtn.addEventListener('click', certZoomIn);
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', certZoomOut);
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', certZoomReset);

  if (modalBody) {
    // Double click / tap to toggle zoom
    modalBody.addEventListener('dblclick', handleCertDoubleClick);

    // Mouse wheel zoom
    modalBody.addEventListener('wheel', handleCertWheel, { passive: false });

    // Mouse drag pan
    modalBody.addEventListener('mousedown', (e) => {
      if (e.button !== 0 || certCurrentZoom <= 1) return;
      isCertDragging = true;
      certDragStartX = e.clientX - certPanX;
      certDragStartY = e.clientY - certPanY;
      modalBody.classList.add('is-panning');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isCertDragging || certCurrentZoom <= 1) return;
      certPanX = e.clientX - certDragStartX;
      certPanY = e.clientY - certDragStartY;
      updateCertTransform(false);
    });

    window.addEventListener('mouseup', () => {
      if (isCertDragging) {
        isCertDragging = false;
        if (modalBody) modalBody.classList.remove('is-panning');
        updateCertTransform(false);
      }
    });

    // Touch gestures for mobile (Pinch-to-zoom + 1-finger pan)
    modalBody.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        if (certCurrentZoom > 1) {
          isCertDragging = true;
          certDragStartX = e.touches[0].clientX - certPanX;
          certDragStartY = e.touches[0].clientY - certPanY;
        }
      } else if (e.touches.length === 2) {
        isCertDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.hypot(dx, dy);
        initialPinchZoom = certCurrentZoom;
      }
    }, { passive: false });

    modalBody.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isCertDragging && certCurrentZoom > 1) {
        e.preventDefault();
        certPanX = e.touches[0].clientX - certDragStartX;
        certPanY = e.touches[0].clientY - certDragStartY;
        updateCertTransform(false);
      } else if (e.touches.length === 2 && initialPinchDistance) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        const scale = currentDistance / initialPinchDistance;
        setCertZoom(initialPinchZoom * scale, false);
      }
    }, { passive: false });

    modalBody.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        isCertDragging = false;
        initialPinchDistance = null;
        updateCertTransform(true);
      } else if (e.touches.length === 1) {
        initialPinchDistance = null;
        if (certCurrentZoom > 1) {
          isCertDragging = true;
          certDragStartX = e.touches[0].clientX - certPanX;
          certDragStartY = e.touches[0].clientY - certPanY;
        }
      }
    });
  }
});

// Keyboard shortcuts and focus trap for certificate lightbox
document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('certModal');
  if (!overlay || !overlay.classList.contains('is-open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeCertModal(null, true);
    return;
  }

  if (e.key === 'Tab') {
    const focusable = overlay.querySelectorAll('button:not([disabled]), a[href]:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  } else if (e.key === '+' || e.key === '=') {
    certZoomIn();
  } else if (e.key === '-' || e.key === '_') {
    certZoomOut();
  } else if (e.key === '0') {
    certZoomReset();
  }
});
