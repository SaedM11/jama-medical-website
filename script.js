// ===================== JAVASCRIPT FUNCTIONALITY =====================

// --------------------- NAVIGATION BAR LOGIC ---------------------

// Toggle nav on small screens (hamburger menu)
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Custom scroll offset for Services link (for sticky navbar)
document.querySelector('a[href="#services"]').addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector('#services');
  const offset = target.getBoundingClientRect().top + window.pageYOffset - 25;
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  });
});

// --------------------- CONSULTATION MODAL LOGIC ---------------------

document.addEventListener('DOMContentLoaded', function() {
  // Modal and form elements
  const openModalBtn = document.getElementById('openConsultationModal');
  const modalOverlay = document.getElementById('consultationModal');
  const closeModalBtn = document.getElementById('closeConsultationModal');
  const consultationForm = document.getElementById('consultationForm');
  const confirmationMessage = document.getElementById('confirmation-message');

  // Only run if all modal elements exist
  if (openModalBtn && modalOverlay && closeModalBtn && consultationForm && confirmationMessage) {
    // Open modal on button click
    openModalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
    // Close modal on close button click
    closeModalBtn.addEventListener('click', function() {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    });
    // Close modal when clicking outside modal content
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    // Handle consultation form submission
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state on submit button
      const submitButton = consultationForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;

      // Simulate successful submission
      setTimeout(() => {
        // Show confirmation message
        confirmationMessage.classList.add('show');
        
        // Reset form
        consultationForm.reset();
        
        // Revert button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Auto-close modal after 2.5 seconds
        setTimeout(() => {
          confirmationMessage.classList.remove('show');
          closeModalBtn.click();
        }, 2500);
      }, 1000);
    });
  }
});

