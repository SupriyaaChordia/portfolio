import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';
async function loadProjects() {
    const projects = await fetchJSON('./lib/projects.json');
    const latestProjects = projects.slice(0, 3);
    const projectsContainer = document.querySelector('.projects');
    renderProjects(latestProjects, projectsContainer, 'h2');
}
// I was getting an error with just await, on researhcing I found that an async function is needed
// so I wrapped it in an async function
loadProjects();

async function loadGitHubProfile() {
    const githubData = await fetchGitHubData('SupriyaaChordia');
    const profileStats = document.querySelector('#profile-stats');
    if (profileStats) {
        profileStats.innerHTML = `
            <dl>
                <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
                <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
                <dt>Followers:</dt><dd>${githubData.followers}</dd>
                <dt>Following:</dt><dd>${githubData.following}</dd>
            </dl>
        `;
    }
}
loadGitHubProfile();
