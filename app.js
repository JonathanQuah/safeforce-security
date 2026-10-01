// 0. Immediate Theme Initialization (prevents flash)
const savedTheme = localStorage.getItem('safeforce-theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Button Handler
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('safeforce-theme', newTheme);

      // Feedback Toast
      showToast(
        `${newTheme === 'light' ? 'Light' : 'Dark'} Mode Activated`,
        `Display preference saved for your session.`,
        2500
      );
    });
  });

  // 1. Dynamic Year
  const yearEls = document.querySelectorAll('.currentYear, #currentYear');
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.contains('mobile-open');
      if (isExpanded) {
        navMenu.classList.remove('mobile-open');
        navMenu.style.display = 'none';
      } else {
        navMenu.classList.add('mobile-open');
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#0b0d11';
        navMenu.style.padding = '24px';
        navMenu.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
        navMenu.style.zIndex = '9999';
      }
    });
  }

  // 4. Solution Ecosystem Tab Switching (for services page and home preview)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.solution-panel');

  if (tabBtns.length > 0 && panels.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 5. Client Portfolio Filter (for clients page and home preview)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clientCards = document.querySelectorAll('.client-card');

  if (filterBtns.length > 0 && clientCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        clientCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // 6. Security Audit Form Handler (contact.html and index.html)
  const auditForm = document.getElementById('securityAuditForm');
  const toast = document.getElementById('toastNotice');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMessage');

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const orgName = document.getElementById('orgName')?.value.trim() || '';
      const contactName = document.getElementById('contactName')?.value.trim() || '';
      const contactEmail = document.getElementById('contactEmail')?.value.trim() || '';
      const contactPhone = document.getElementById('contactPhone')?.value.trim() || '';
      const serviceType = document.getElementById('serviceType')?.value || '';
      const facilityType = document.getElementById('facilityType')?.value || '';
      const locationScope = document.getElementById('locationScope')?.value.trim() || '';
      const specificReqs = document.getElementById('specificReqs')?.value.trim() || '';

      if (!orgName || !contactName || !contactEmail || !contactPhone || !serviceType || !facilityType || !locationScope) {
        showToast('Please Complete Required Fields', 'All fields marked with an asterisk are mandatory.', 4000);
        return;
      }

      // Display success toast
      showToast(
        'Audit Request Registered',
        `Thank you ${contactName} from ${orgName}. Designated Advisor Mr. A. Karunan (+6019-2283014) has received your request and will contact you promptly.`,
        6000
      );

      // Offer immediate WhatsApp transmission
      const waText = encodeURIComponent(
        `*SAFE FORCE SECURITY AUDIT REQUEST*\n\n` +
        `*Organization:* ${orgName}\n` +
        `*Contact Person:* ${contactName}\n` +
        `*Email:* ${contactEmail}\n` +
        `*Phone:* ${contactPhone}\n` +
        `*Service:* ${serviceType}\n` +
        `*Facility:* ${facilityType}\n` +
        `*Location:* ${locationScope}\n` +
        `*Standing Instructions / Notes:* ${specificReqs || 'Standard Assessment'}`
      );

      const openWhatsApp = confirm('Would you also like to transmit this request directly to Security Advisor Mr. A. Karunan via WhatsApp now?');
      if (openWhatsApp) {
        window.open(`https://wa.me/60192283014?text=${waText}`, '_blank');
      }

      auditForm.reset();
    });
  }

  function showToast(title, message, duration = 4000) {
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
});
