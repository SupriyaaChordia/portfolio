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
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
// let arc = arcGenerator({
//   startAngle: 0,
//   endAngle: 2 * Math.PI,
// });
// d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');
let data = [1, 2, 3, 4, 5, 5];
// let total = 0;
let colors = ['gold', 'purple'];

// for (let d of data) {
//   total += d;
// }
// let angle = 0;
// let arcData = [];

// for (let d of data) {
//   let endAngle = angle + (d / total) * 2 * Math.PI;
//   arcData.push({ startAngle: angle, endAngle });
//   angle = endAngle;
// }
// let arcs = arcData.map((d) => arcGenerator(d));
// arcs.forEach((arc, idx) => {
//   d3.select('svg')
//     .append('path')
//     .attr('d', arc)
//     .attr(...) // Fill in the attribute for fill color via indexing the colors variable
// })
let sliceGenerator = d3.pie();
let arcData = sliceGenerator(data);
let arcs = arcData.map((d) => arcGenerator(d));
arcs.forEach((arc, idx) => {
  d3.select('svg')
    .append('path')
    .attr('d', arc)
    .attr('fill', colors[idx]) // Fill in the attribute for fill color via indexing the colors variable
})