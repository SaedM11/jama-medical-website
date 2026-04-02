// Google Analytics 4 Tracking
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KZ73GY8NTH');

// Fallback to prevent errors if GTM fails to load
if (typeof window.gtag !== 'function') {
  window.gtag = function() {};
}

// GA4 Custom Event Tracking Functions
// These events track user interactions with key conversion points

/**
 * Track contact form interactions
 */
function trackContactFormStarted() {
  gtag('event', 'contact_form_started', {
    'event_category': 'form',
    'event_label': 'contact_form'
  });
}

function trackContactFormCompleted() {
  gtag('event', 'contact_form_completed', {
    'event_category': 'form',
    'event_label': 'contact_form'
  });
}

/**
 * Track phone click (call initiation)
 */
function trackPhoneClick() {
  gtag('event', 'phone_click', {
    'event_category': 'engagement',
    'event_label': 'phone_call'
  });
}

/**
 * Track equipment page views
 */
function trackEquipmentPageView(equipmentType) {
  gtag('event', 'equipment_page_viewed', {
    'event_category': 'content',
    'event_label': equipmentType,
    'equipment_type': equipmentType
  });
}

/**
 * Track consultation/booking CTA clicks
 */
function trackConsultationCTA(cta_location) {
  gtag('event', 'consultation_cta_clicked', {
    'event_category': 'engagement',
    'event_label': 'book_consultation',
    'cta_location': cta_location
  });
}

/**
 * Track service section visibility
 */
function trackServiceSectionScrolled() {
  gtag('event', 'service_section_scrolled', {
    'event_category': 'engagement',
    'event_label': 'scroll_to_services'
  });
}

/**
 * Track contact section visibility
 */
function trackContactSectionScrolled() {
  gtag('event', 'contact_section_scrolled', {
    'event_category': 'engagement',
    'event_label': 'scroll_to_contact'
  });
}

/**
 * Track service-specific page loads
 */
function trackServicePageViewed(serviceName) {
  gtag('event', 'service_page_viewed', {
    'event_category': 'content',
    'event_label': serviceName,
    'service_name': serviceName
  });
}

/**
 * Track FAQ/accordion interactions
 */
function trackFAQExpanded(faqTopic) {
  gtag('event', 'faq_expanded', {
    'event_category': 'engagement',
    'event_label': 'faq_accordion',
    'faq_topic': faqTopic
  });
}

/**
 * Track consultation form completion
 */
function trackConsultationFormCompleted() {
  gtag('event', 'contact_form_completed', {
    'event_category': 'form',
    'event_label': 'consultation_modal_form'
  });
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // Track service section scroll
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackServiceSectionScrolled();
          servicesObserver.unobserve(entry.target);
        }
      });
    });
    servicesObserver.observe(servicesSection);
  }

  // Track contact section scroll
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackContactSectionScrolled();
          contactObserver.unobserve(entry.target);
        }
      });
    });
    contactObserver.observe(contactSection);
  }

  // Track contact form interactions
  const contactForm = document.querySelector('form[name="contact"]') || document.querySelector('form');
  if (contactForm) {
    // Track when user starts interacting with form
    contactForm.addEventListener('focusin', trackContactFormStarted, { once: true });

    // Track form submission
    contactForm.addEventListener('submit', function(e) {
      trackContactFormCompleted();
    });
  }

  // Track phone clicks (all tel: links)
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackPhoneClick();
    });
  });

  // Track consultation CTAs (hero button + navigation links)
  // Track hero modal button
  const heroCtaBtn = document.getElementById('openConsultationModal');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', function() {
      trackConsultationCTA('hero_button');
    });
  }

  // Track "Book a Consultation" navigation links (Patient Resources dropdown)
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    const linkText = link.textContent.toLowerCase();
    if (linkText.includes('consultation') || linkText.includes('book')) {
      link.addEventListener('click', function() {
        trackConsultationCTA('navigation_dropdown');
      });
    }
  });

  // Track consultation modal form submission
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
      trackConsultationFormCompleted();
    });
  }

  // Track service page views on non-homepage pages
  const currentPage = window.location.pathname;
  if (currentPage.endsWith('ventilator.html')) {
    trackServicePageViewed('Ventilator Therapy');
  } else if (currentPage.endsWith('sleep-apnea.html')) {
    trackServicePageViewed('Sleep Apnea Therapy');
  } else if (currentPage.endsWith('oxygen.html')) {
    trackServicePageViewed('Oxygen Therapy');
  } else if (currentPage.endsWith('copd.html')) {
    trackServicePageViewed('COPD & Asthma Management');
  } else if (currentPage.endsWith('about.html')) {
    trackServicePageViewed('About & Blog');
  } else if (currentPage.endsWith('faqs.html')) {
    trackServicePageViewed('FAQs & Help');
  } else if (currentPage.endsWith('fast-delivery.html')) {
    trackServicePageViewed('Fast Delivery');
  } else if (currentPage.endsWith('sleep-info.html')) {
    trackServicePageViewed('Sleep Apnea Info');
  }

});
