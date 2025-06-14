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
  const consultationSuccess = document.getElementById('consultationSuccess');

  // Only run if all modal elements exist
  if (openModalBtn && modalOverlay && closeModalBtn && consultationForm && consultationSuccess) {
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

      // Collect form data
      const data = {
        firstName: consultationForm.firstName.value.trim(),
        lastName: consultationForm.lastName.value.trim(),
        phone: consultationForm.phone.value.trim(),
        dob: consultationForm.dob.value,
        appointmentDate: consultationForm.appointmentDate.value,
        appointmentTime: consultationForm.appointmentTime.value
      };

      // Google Sheets integration endpoint (Google Apps Script Web App)
      const SHEETS_URL = "https://script.google.com/macros/s/AKfycbyevTy9fAKgK-LVVNrA3jY5qBPsXtrgaXbVgK96xppnLyW2J0BT2AqRyUp1byveT0YvA/exec";
      
      // Send data to Google Sheets
      fetch(SHEETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        // Show success message if submission is successful
        if (result.result === 'success') {
          consultationForm.style.display = 'none';
          consultationSuccess.style.display = 'block';
          setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
            consultationForm.reset();
            consultationForm.style.display = 'flex';
            consultationSuccess.style.display = 'none';
          }, 2500);
        } else {
          throw new Error(result.error || 'Submission failed');
        }
      })
      .catch(error => {
        // Show error alert if submission fails
        console.error('Error:', error);
        alert("There was an error submitting your appointment. Please try again.");
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
    });
  }
});

