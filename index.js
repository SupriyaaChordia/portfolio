import { fetchJSON, renderProjects } from './global.js'; // (no fetchGithubData needed)

console.log('index.js loaded ✅'); // 🛠 added

const projects = await fetchJSON('./lib/projects.json');
console.log('Fetched projects:', projects); // 🛠 added

const latestProjects = projects.slice(0, 3);
console.log('Latest 3 projects:', latestProjects); // 🛠 added

const projectsContainer = document.querySelector('.projects');
console.log('Projects container:', projectsContainer); // 🛠 added

renderProjects(latestProjects, projectsContainer, 'h2');
