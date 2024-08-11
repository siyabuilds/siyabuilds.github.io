const showSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.add("show");
};

const hideSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("show");
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentDate = new Date();
const month = monthNames[currentDate.getUTCMonth()];
const year = currentDate.getFullYear();
document.getElementById("current-date").innerText = `${month} ${year}`;

function showAlert() {
  Swal.fire({
    title: "Projects section not built yet",
    text: "I haven't finished all of my projects as of yet, but you can view the work in progress on my GitHub dashboard.",
    icon: "info",
    confirmButtonText: "OK",
    footer:
      '<a href="https://github.com/markuptitan" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> View my GitHub Dashboard</a>',
  });
  return false;
}

function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);

  submitForm(form.action, formData);
}

function submitForm(actionUrl, formData) {
  fetch(actionUrl, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      showSuccessAlert();
    })
    .catch((error) => {
      showErrorAlert(error);
    });
}

function showSuccessAlert() {
  Swal.fire({
    title: "Thank you!",
    text: "Your message has been sent successfully.",
    icon: "success",
    confirmButtonText: "OK",
  });
}

function showErrorAlert(error) {
  console.error("Error:", error); // Log the error for debugging
  Swal.fire({
    title: "Oops!",
    text: "There was an error sending your message, but it might have been submitted. Please check your email for confirmation.",
    icon: "error",
    confirmButtonText: "OK",
  });
}

// Attach the submit event to the form
document
  .getElementById("contactForm")
  .addEventListener("submit", handleFormSubmission);
