// GitHub activity timeline functionality - Modern Implementation

// Language color mapping
const languageMap = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#1572B6",
  SCSS: "#c6538c",
  Dockerfile: "#384d54",
  SQL: "#e38c00",
  Shell: "#89e051",
};

export const initActivityTimeline = async () => {
  const userName = "siyabuilds";
  const repoCardsContainer = document.getElementById("repo-cards");
  const activityTimeline = document.querySelector(".activity-timeline");

  if (!repoCardsContainer || !activityTimeline) return;

  activityTimeline.style.display = "none";

  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${userName}/repos`
    );
    let repos = await reposResponse.json();

    if (!Array.isArray(repos)) {
      console.warn("GitHub API returned unexpected data format");
      return;
    }

    // Filter out forks, specific repositories, and sort by last updated
    const excludedRepos = [
      "siyabuilds",
      "siyabuilds.github.io",
      "carbon-footprint-logger",
    ];
    repos = repos.filter(
      (repo) => !repo.fork && !excludedRepos.includes(repo.name)
    );
    repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    let topRepos = repos.slice(0, 6); // Get 6 repos after filtering exclusions
    let validRepos = [];

    for (const repo of topRepos) {
      const commits = await fetchCommits(repo.name, userName);
      if (
        commits.length >= 1 &&
        repo.description &&
        repo.description.trim() !== ""
      ) {
        // Reduced requirement to show more repos + must have description
        validRepos.push({ repo, commits });
      }
    }

    // Fill remaining slots if needed - ensure we get 6 repos total
    if (validRepos.length < 6) {
      const remainingRepos = repos.slice(6);
      for (const repo of remainingRepos) {
        if (validRepos.length >= 6) break;
        const commits = await fetchCommits(repo.name, userName);
        if (
          commits.length >= 1 &&
          repo.description &&
          repo.description.trim() !== ""
        ) {
          validRepos.push({ repo, commits });
        }
      }
    }

    if (validRepos.length > 0) {
      activityTimeline.style.display = "flex";
    }

    validRepos.slice(0, 6).forEach(({ repo, commits }) => {
      const repoCard = createRepoCard(repo, commits);
      repoCardsContainer.appendChild(repoCard);
    });
  } catch (error) {
    console.error("Error fetching repository data:", error);
  }
};

const createRepoCard = (repo, commits) => {
  const card = document.createElement("div");
  card.classList.add("repo-card");

  // Repository title
  const title = document.createElement("h3");
  title.classList.add("repo-title");
  title.textContent = repo.name;
  card.appendChild(title);

  // Repository description
  if (repo.description) {
    const description = document.createElement("p");
    description.style.color = "var(--primary-dimmed-color)";
    description.style.fontSize = "var(--font-size-sm)";
    description.style.marginBottom = "16px";
    description.style.lineHeight = "1.5";
    description.textContent = truncateMessage(repo.description, 50);
    card.appendChild(description);
  }

  // Modern activity feed instead of timeline
  const activityFeed = document.createElement("div");
  activityFeed.classList.add("activity-feed");

  commits.sort(
    (a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date)
  );

  commits.slice(0, 3).forEach((commit, index) => {
    const activityItem = document.createElement("div");
    activityItem.classList.add("activity-item");
    if (index > 0) activityItem.classList.add("dimmed");

    const commitMessage = document.createElement("div");
    commitMessage.classList.add("commit-message");

    const commitDate = new Date(commit.commit.author.date);
    const timeAgo = getTimeAgo(commitDate);

    // Extract commit hash (first 7 characters)
    const commitHash = commit.sha.substring(0, 7);

    commitMessage.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <span class="commit-hash">${commitHash}</span>
        <span class="commit-date">${timeAgo}</span>
      </div>
      <div style="margin-bottom: 4px;">
        ${truncateMessage(commit.commit.message, 25)}
      </div>
      <div class="commit-author">by ${commit.commit.author.name}</div>
    `;

    activityItem.appendChild(commitMessage);
    activityFeed.appendChild(activityItem);
  });

  card.appendChild(activityFeed);

  // Repository stats
  const stats = document.createElement("div");
  stats.classList.add("repo-stats");

  if (repo.language) {
    const langStat = document.createElement("span");
    langStat.classList.add("stat", "language");
    const languageColor = languageMap[repo.language] || "#6e7681"; // Default color if language not found
    langStat.innerHTML = `<span style="color: ${languageColor};">●</span> ${repo.language}`;
    stats.appendChild(langStat);
  }

  const updatedStat = document.createElement("span");
  updatedStat.classList.add("stat", "updated");
  updatedStat.textContent = `Updated ${getTimeAgo(new Date(repo.pushed_at))}`;
  stats.appendChild(updatedStat);

  if (repo.stargazers_count > 0) {
    const starsStat = document.createElement("span");
    starsStat.classList.add("stat");
    starsStat.innerHTML = `⭐ ${repo.stargazers_count}`;
    stats.appendChild(starsStat);
  }

  card.appendChild(stats);

  // View repository link
  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View Repository →";
  link.style.cssText = `
    display: inline-block;
    margin-top: 16px;
    padding: 8px 16px;
    background: var(--accent-color);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: background-color var(--transition-fast);
  `;
  link.addEventListener("mouseenter", () => {
    link.style.backgroundColor = "var(--accent-hover)";
  });
  link.addEventListener("mouseleave", () => {
    link.style.backgroundColor = "var(--accent-color)";
  });

  card.appendChild(link);

  return card;
};

const fetchCommits = async (repoName, userName) => {
  try {
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${userName}/${repoName}/commits?per_page=10`
    );
    const commits = await commitsResponse.json();
    return Array.isArray(commits) ? commits : [];
  } catch (error) {
    console.error(`Error fetching commits for ${repoName}:`, error);
    return [];
  }
};

// Utility functions
const getTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 30) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } else if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
  } else {
    return "just now";
  }
};

const truncateMessage = (message, maxLength) => {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength).trim() + "...";
};
