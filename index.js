import { fetchJSON, renderProjects } from './global.js';

console.log('index.js loaded ✅');

async function loadProjects() {
    const projects = await fetchJSON('./lib/projects.json');
    console.log('Fetched projects:', projects);

    const latestProjects = projects.slice(0, 3);
    console.log('Latest 3 projects:', latestProjects);

    const projectsContainer = document.querySelector('.projects');
    console.log('Projects container:', projectsContainer);

    renderProjects(latestProjects, projectsContainer, 'h2');
}

// Call the async function
loadProjects();
