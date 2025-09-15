// Main application entry point
import '@fortawesome/fontawesome-free/css/all.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

import { initNavigation } from './js/navigation.js';
import { initThemeToggle } from './js/theme.js';
import { initContactForm } from './js/contact.js';
import { initProjects } from './js/projects.js';
import { initActivityTimeline } from './js/github-activity.js';
import { updateYear } from './js/utils.js';
import './scss/main.scss';

// Make Swal globally available
window.Swal = Swal;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavigation();
  initThemeToggle();
  initContactForm();
  updateYear();
  
  // Initialize async modules
  initProjects();
  initActivityTimeline();
});