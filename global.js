console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
};
// navLinks = $$("nav a")
// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );
//   currentLink?.classList.add('current');

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/portfolio/";         // GitHub Pages repo name

let pages = [
{ url: '', title: 'Home' },
{ url: 'projects/', title: 'Projects' },
{ url: 'resume/', title: 'Resume' },
{ url: 'contact/', title: 'Contact' },
{ url: 'https://github.com/SupriyaaChordia/portfolio', title: 'GitHub' }
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    url = !url.startsWith('http') ? BASE_PATH + url : url;
    let title = p.title;
    // Create link and add it to nav
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname,
      );
    if (a.host !== location.host) {
        a.target = "_blank"; // opens in new tab ✅
        a.rel = "noopener noreferrer"; // security best practice ✅
      }
    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        Theme:
        <select>
                <option value="light dark">Automatic</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
        </select>
    </label>`,
  );
 const select = document.querySelector('.color-scheme select');

if ("colorScheme" in localStorage) {
    const saved = localStorage.colorScheme;
    select.value = saved;
    document.documentElement.style.setProperty("color-scheme", saved);
}

select.addEventListener("input", function (event) {
    const value = event.target.value;
    console.log("Color scheme changed to", value);
    localStorage.colorScheme = value;
    document.documentElement.style.setProperty("color-scheme", value);
  });

  export async function fetchJSON(url) {
    try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);
      console.log(response)
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      const data = await response.json();
    return data;  
    } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
    }
  }
  fetchJSON('/portfolio/lib/projects.json')

  export function renderProjects(project, containerElement, headingLevel = 'h2') {
    containerElement.innerHTML = '';
    for (const p of project) {
      const article = document.createElement('article');
      article.innerHTML = `
      <${headingLevel}>${p.title}</${headingLevel}>
      <img src="${p.image}" alt="${p.title}">
      <div>
      <p>${p.description}</p>
      <span class = "projectyear"${p.year}</span>
      </div>
      `;
      containerElement.appendChild(article);
    }
  }

  export async function fetchGitHubData(username) {
    // return statement here
    return fetchJSON(`https://api.github.com/users/${username}`);
  }
  