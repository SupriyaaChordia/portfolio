import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
console.log('Fetched projects:', projects);
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');
const titleElement = document.querySelector('h1');
if (titleElement) {
  titleElement.textContent = `${projects.length} Projects`;
}