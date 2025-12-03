document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('commit-dropdown-button');
    const content = document.getElementById('commit-dropdown-content');
    const searchBar = document.getElementById('commit-search');
    const commitList = document.getElementById('commit-list');
    let allCommits = [];

    // Function to render the list of commits
    function renderCommits(commits) {
        commitList.innerHTML = '';
        if (commits.length === 0) {
            commitList.innerHTML = '<li>No commits found.</li>';
            return;
        }
        commits.forEach(commit => {
            const li = document.createElement('li');
            // Format for display
            li.innerHTML = `
                <strong style="color: #0077aa;">${commit.short_sha}</strong>
                (${commit.date.substring(0, 10)}):
                ${commit.message}
            `;
            commitList.appendChild(li);
        });
    }

    // Function to load the static JSON data
    function loadCommitData() {
        // Fetch the file generated during the Sphinx build
        fetch('commits.json')
            .then(response => response.json())
            .then(data => {
                allCommits = data;
                renderCommits(allCommits);
            })
            .catch(error => {
                commitList.innerHTML = '<li>Error loading static commit data. Check build process.</li>';
                console.error('Error loading static commits.json:', error);
            });
    }

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

        if (searchTerm === "") {
            renderCommits(allCommits); // Show all if search is empty
            return;
        }

        const filteredCommits = allCommits.filter(commit =>
            commit.message.toLowerCase().includes(searchTerm) ||
            commit.sha.toLowerCase().includes(searchTerm)
        );
        renderCommits(filteredCommits);
    });
});
