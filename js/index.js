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
