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
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const googleScriptUrl =
    "https://script.google.com/macros/s/AKfycbxpMGwHB1tLhVmgLyE_cCMXvxdMY-0sDeu_yc0p6NLKb7e8HytVTt4Z6o0D8CVtoT_a/exec";

  submitForm(googleScriptUrl, formData);
}

function submitForm(actionUrl, formData) {
  const formDataString = new URLSearchParams(formData).toString();

  fetch(actionUrl, {
    method: "POST",
    body: formDataString,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Data saved successfully!") {
        showSuccessAlert();
      } else {
        showErrorAlert();
      }
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
  console.error("Error:", error);
  Swal.fire({
    title: "Oops!",
    text: "There was an error sending your message, but it might have been submitted. Please check your email for confirmation.",
    icon: "error",
    confirmButtonText: "OK",
  });
}

// Attach the submit event listener to the form
document
  .getElementById("contactForm")
  .addEventListener("submit", handleFormSubmission);

// Update the year automatically
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();
