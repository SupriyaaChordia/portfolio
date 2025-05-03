import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
console.log('Fetched projects:', projects);
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');
const titleElement = document.querySelector('h1');
if (titleElement) {
  titleElement.textContent = `${projects.length} Projects`;
}

import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
let colors = d3.scaleOrdinal(d3.schemeSet3);
let searchInput = document.querySelector('.searchBar');
let selectedIndex = -1;
let query = '';

function renderPieChart(projectsGiven) {
  // re-calculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  // re-calculate data
  let newData = newRolledData.map(([year, count]) => {
    return { value: count, label: year }; // TODO
  });
  // re-calculate slice generator, arc data, arc, etc.
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let newArcs = newArcData.map((d) => newArcGenerator(d));

  // TODO: clear up paths and legends
  let svg = d3.select('svg');
  svg.selectAll('path').remove();
  let newLegend = d3.select('.legend');
  newLegend.selectAll('li').remove();

  // update paths and legends, refer to steps 1.4 and 2.2
  newArcs.forEach((arc, i) => {
    svg
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;
  
        svg
          .selectAll('path')
          .attr('class', (_, idx) => (
          idx === selectedIndex ? 'selected' : null
        ));
        newLegend
        .selectAll('li')
        .attr('class', (_, idx) => (
          idx === selectedIndex ? 'legend-item selected' : 'legend-item'
        ));
        let searchProjects = projects.filter((project) => Object.values(project).join('\n').toLowerCase().includes(query))
        if (selectedIndex === -1) {
          renderProjects(searchProjects, projectsContainer, 'h2');
        } else {
          // TODO: filter projects and project them onto webpage
          // Hint: `.label` might be useful
          let selectedYear = newData[selectedIndex].label;
          let filteredProjects = searchProjects.filter(
            (project) => project.year === selectedYear
          );
          renderProjects(filteredProjects, projectsContainer, 'h2');
        }
      });
  });
  
  newData.forEach((d, idx) => {
    newLegend
      .append('li')
      .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`) // set the inner html of <li>
      .attr('class', 'legend-item');
  });
  }

searchInput.addEventListener('change', (event) => {
  query = event.target.value.toLowerCase();
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query);
  });
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});

renderPieChart(projects);