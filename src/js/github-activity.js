// GitHub activity timeline functionality
export const initActivityTimeline = async () => {
  const userName = "markuptitan";
  const repoCardsContainer = document.getElementById("repo-cards");
  const activityTimeline = document.querySelector(".activity-timeline");

  if (!repoCardsContainer || !activityTimeline) return;

  activityTimeline.style.display = "none";

  try {
    const reposResponse = await fetch(`https://api.github.com/users/${userName}/repos`);
    let repos = await reposResponse.json();

    if (!Array.isArray(repos)) {
      console.warn('GitHub API returned unexpected data format');
      return;
    }

    repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    let topRepos = repos.slice(0, 4);
    let validRepos = [];

    for (const repo of topRepos) {
      const commits = await fetchCommits(repo.name, userName);
      if (commits.length >= 2) {
        validRepos.push({ repo, commits });
      }
    }

    let index = 4 - validRepos.length;

    if (index > 0) {
      const remainingRepos = repos.slice(4);
      for (const repo of remainingRepos) {
        if (validRepos.length >= 4) break;
        const commits = await fetchCommits(repo.name, userName);
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
  } catch (error) {
    console.error('Error fetching repository data:', error);
  }
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

const fetchCommits = async (repoName, userName) => {
  try {
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${userName}/${repoName}/commits`
    );
    const commits = await commitsResponse.json();
    return Array.isArray(commits) ? commits : [];
  } catch (error) {
    console.error(`Error fetching commits for ${repoName}:`, error);
    return [];
  }
};