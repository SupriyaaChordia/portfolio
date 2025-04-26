import { fetchJSON, renderProjects } from './global.js';
async function loadProjects() {
    const projects = await fetchJSON('./lib/projects.json');
    const latestProjects = projects.slice(0, 3);
    const projectsContainer = document.querySelector('.projects');
    renderProjects(latestProjects, projectsContainer, 'h2');
}
// I was getting an error with just await, on researhcing I found that an async function is needed
// so I wrapped it in an async function
loadProjects();
