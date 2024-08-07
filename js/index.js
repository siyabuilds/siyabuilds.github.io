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
