// Projects display functionality
export const initProjects = async () => {
  const filterDropdown = document.querySelector("#filter-dropdown");
  const projectsContainer = document.querySelector(".projects-container");
  const spinner = document.querySelector(".spinner");

  if (!filterDropdown || !projectsContainer || !spinner) return;

  const showSpinner = () => (spinner.style.display = "block");
  const hideSpinner = () => (spinner.style.display = "none");

  try {
    const response = await fetch("/js/projects.json");
    const projects = await response.json();
    
    renderProjects(projects);
    
    filterDropdown.addEventListener("change", (event) => {
      showSpinner();
      const selectedTechnology = event.target.value;
      setTimeout(() => {
        const filteredProjects = filterProjects(selectedTechnology, projects);
        renderProjects(filteredProjects);
        hideSpinner();
      }, 1000);
    });
  } catch (error) {
    console.error("Error loading the projects:", error);
  }
};

const renderProjects = (projects) => {
  const projectsContainer = document.querySelector(".projects-container");
  if (!projectsContainer) return;

  projectsContainer.innerHTML = "";
  
  if (projects.length === 0) {
    projectsContainer.innerHTML = "<p class='no-results'>No projects found</p>";
    return;
  }

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>
        ${project.description}
        <br />
        You can view the original task 
        <a href="${project.repo}" target="_blank">here</a>.
      </p>
      <a href="${project.link}" target="_blank">
        <button>Visit Live Project</button>
      </a>
    `;
    projectsContainer.appendChild(projectCard);
  });
};

const filterProjects = (selectedTechnology, projects) => {
  if (selectedTechnology === "All") return projects;
  return projects.filter((project) =>
    project.technologies.includes(selectedTechnology)
  );
};