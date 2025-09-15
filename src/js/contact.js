// Contact form functionality
export const initContactForm = () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", handleFormSubmission);
};

function handleFormSubmission(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  submitForm(form.action, formData);
}

function submitForm(actionUrl, formData) {
  fetch(actionUrl, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  })
    .then(() => {
      showSuccessAlert();
    })
    .catch((error) => {
      showErrorAlert(error);
    });
}

function showSuccessAlert() {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: "Thank you!",
      text: "Your message has been sent successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
}

function showErrorAlert(error) {
  console.error("Error:", error);
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: "Oops!",
      text: "There was an error sending your message, but it might have been submitted. Please check your email for confirmation.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}