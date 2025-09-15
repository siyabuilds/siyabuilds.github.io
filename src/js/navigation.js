// Navigation functionality
export const showSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar?.classList.add("show");
};

export const hideSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar?.classList.remove("show");
};

export const initNavigation = () => {
  // Expose functions globally for HTML onclick handlers
  window.showSidebar = showSidebar;
  window.hideSidebar = hideSidebar;
};