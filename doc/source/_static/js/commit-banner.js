document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('commit-dropdown-button');
  const content = document.getElementById('commit-dropdown-content');
  const searchBar = document.getElementById('commit-search');
  const commitList = document.getElementById('commit-list');
  let allCommits = [];

  // Define the base URL for your GitHub repository
  const GITHUB_REPO_URL = 'https://github.com/64-shades/64-shades.github.io';

  // Base commit URL (used for short_sha link)
  const GITHUB_COMMIT_URL = `${GITHUB_REPO_URL}/commit/`;

  // Regex to find '#<number>' at the end of a commit message
  const prRegex = /\((#\d+)\)\s*$/;

  /**
   * Processes the commit message to convert a trailing PR number
   * (e.g., "#241") into an HTML link to the GitHub Pull Request page.
   * @param {string} message - The original commit message.
   * @returns {string} The formatted message with a linked PR number, if found.
   */
  function formatCommitMessage(message) {
    let formattedMessage = message;
    const match = formattedMessage.match(prRegex);

    if (match) {
      const prTag = match[1]; // e.g., "#241"
      const prNumber = prTag.substring(1); // e.g., "241"
      const prUrl = `${GITHUB_REPO_URL}/pull/${prNumber}`;

      // Replace the matched text with the HTML anchor tag
      formattedMessage = formattedMessage.replace(
        prRegex,
        // Insert a space before the link for better readability
        ` (<a
                    href="${prUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="color: #0077aa; font-weight: bold; text-decoration: underline;"
                >${prTag}</a>)`,
      );
    }
    return formattedMessage;
  }

  // Function to render the list of commits
  function renderCommits(commits) {
    commitList.innerHTML = '';
    if (commits.length === 0) {
      commitList.innerHTML = '<li>No commits found.</li>';
      return;
    }
    commits.forEach((commit) => {
      const li = document.createElement('li');

      // Apply the new formatting function to the commit message
      const formattedMessage = formatCommitMessage(commit.message);

      // Format for display
      // Use the full 'commit.sha' for the link URL
      // Use 'commit.short_sha' for the visible text
      li.innerHTML = `
                <a
                    href="${GITHUB_COMMIT_URL}${commit.sha}"
                    target="_blank"
                    style="color: #0077aa; font-weight: bold; text-decoration: none;"
                >
                    ${commit.short_sha}
                </a>
                (<span style="color: red;">${commit.date}</span>):
                ${formattedMessage}
            `;
      commitList.appendChild(li);
    });
  }

  // Function to load the static JSON data
  function loadCommitData() {
    // Fetch the file generated during the Sphinx build
    fetch('commits.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        allCommits = data;
        renderCommits(allCommits);
      })
      .catch((error) => {
        commitList.innerHTML =
          '<li>Error loading static commit data. Check build process and file path.</li>';
        console.error('Error loading static commits.json:', error);
      });
  }

  // --- Event Listeners ---

  // 1. Toggle Dropdown and Load Data
  button.addEventListener('click', () => {
    const isVisible = content.style.display === 'block';
    content.style.display = isVisible ? 'none' : 'block';

    // Load data only on the first click
    if (!isVisible && allCommits.length === 0) {
      loadCommitData();
    }
  });

  // 2. Search and Filter Functionality
  searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      renderCommits(allCommits); // Show all if search is empty
      return;
    }

    const filteredCommits = allCommits.filter(
      (commit) =>
        commit.message.toLowerCase().includes(searchTerm) ||
        commit.sha.toLowerCase().includes(searchTerm),
    );
    renderCommits(filteredCommits);
  });
});
