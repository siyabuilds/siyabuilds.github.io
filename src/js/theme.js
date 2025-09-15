// Theme toggle functionality
export const initThemeToggle = () => {
  const toggleButton = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");

  if (!toggleButton || !themeIcon) return;

  const savedTheme = localStorage.getItem("theme") || "light";
  
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.classList = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";

  toggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeIcon.classList = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  });
};