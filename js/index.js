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

// Update the year automatically
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

// Dark Mode Toggle Logic
const toggleButton = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");

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

// Activity display section
document.addEventListener("DOMContentLoaded", () => {
  const userName = "markuptitan";
  const repoCardsContainer = document.getElementById("repo-cards");
  const activityTimeline = document.querySelector(".activity-timeline");

  activityTimeline.style.display = "none";

  const fetchRepoData = async () => {
    const reposResponse = await fetch(
      `https://api.github.com/users/${userName}/repos`
    );
    let repos = await reposResponse.json();

    repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    let topRepos = repos.slice(0, 4);
    let validRepos = [];

    for (const repo of topRepos) {
      const commits = await fetchCommits(repo.name);
      if (commits.length >= 2) {
        validRepos.push({ repo, commits });
      }
    }

    let index = 4 - validRepos.length;

    if (index > 0) {
      const remainingRepos = repos.slice(4);
      for (const repo of remainingRepos) {
        if (validRepos.length >= 4) break;
        const commits = await fetchCommits(repo.name);
        if (commits.length >= 2) {
          validRepos.push({ repo, commits });
        }
      }
    }

    if (validRepos.length > 1) {
      activityTimeline.style.display = "flex";
    }

    validRepos.forEach(({ repo, commits }) => {
      const repoCard = createRepoCard(repo, commits);
      repoCardsContainer.appendChild(repoCard);
    });
  };

  const createRepoCard = (repo, commits) => {
    const card = document.createElement("div");
    card.classList.add("repo-card");

    const title = document.createElement("h3");
    title.classList.add("repo-title");
    title.textContent = repo.name;
    card.appendChild(title);

    const timeline = document.createElement("div");
    timeline.classList.add("timeline");

    commits.sort(
      (a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date)
    );

    commits.slice(0, 2).forEach((commit, index) => {
      const event = document.createElement("div");
      event.classList.add("event");

      const eventMarker = document.createElement("div");
      eventMarker.classList.add("event-marker");
      event.appendChild(eventMarker);

      const eventContent = document.createElement("div");
      eventContent.classList.add("event-content");

      const commitMessage = document.createElement("p");
      commitMessage.classList.add("commit-message");
      if (index === 1) commitMessage.classList.add("dimmed");

      commitMessage.innerHTML = `${new Date(
        commit.commit.author.date
      ).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}: <br /> 
      <span>${commit.commit.message}</span>`;

      eventContent.appendChild(commitMessage);
      event.appendChild(eventContent);
      timeline.appendChild(event);
    });

    card.appendChild(timeline);

    const button = document.createElement("button");
    const repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.target = "_blank";
    repoLink.textContent = "View Repository";
    button.appendChild(repoLink);
    card.appendChild(button);

    return card;
  };

  const fetchCommits = async (repoName) => {
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${userName}/${repoName}/commits`
    );
    const commits = await commitsResponse.json();
    return commits;
  };

  fetchRepoData();
});

// Projects display using json
document.addEventListener("DOMContentLoaded", () => {
  fetch("./js/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const projectsContainer = document.querySelector(".projects-container");

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
    })
    .catch((error) => console.error("Error loading the projects:", error));
});
