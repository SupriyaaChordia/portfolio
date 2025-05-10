import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
// async function loadData() {
//   const data = await d3.csv('loc.csv', (row) => ({
//     ...row,
//     line: Number(row.line), // or just +row.line
//     depth: Number(row.depth),
//     length: Number(row.length),
//     date: new Date(row.date + 'T00:00' + row.timezone),
//     datetime: new Date(row.datetime),
//   }));

//   return data;
// }
// let commits = d3.groups(data, (d) => d.commit);
// function processCommits(data) {
//   return d3
//     .groups(data, (d) => d.commit)
//     .map(([commit, lines]) => {
//       // Each 'lines' array contains all lines modified in this commit
//       // All lines in a commit have the same author, date, etc.
//       // So we can get this information from the first line
//       let first = lines[0];

//       // What information should we return about this commit?
//       return {
//         id: commit,
//         // ... what else?
//       };
//     });
// }

// let data = await loadData();
// let commits = processCommits(data);

// function processCommits(data) {
//   return d3
//     .groups(data, (d) => d.commit)
//     .map(([commit, lines]) => {
//       let first = lines[0];
//       let { author, date, time, timezone, datetime } = first;
//       let ret = {
//         id: commit,
//         url: 'https://github.com/vis-society/lab-7/commit/' + commit,
//         author,
//         date,
//         time,
//         timezone,
//         datetime,
//         hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
//         totalLines: lines.length,
//       };

//       Object.defineProperty(ret, 'lines', {
//         value: lines,
//         enumerable: false,
//         writable: false,
//         configurable: false
//       });
//       return ret;
//     });
// }

// let data = await loadData();
// let commits = processCommits(data);
// console.log(commits);

async function loadData() {
  const data = await d3.csv('loc.csv', (row) => ({
    ...row,
    line: Number(row.line), // or just +row.line
    depth: Number(row.depth),
    length: Number(row.length),
    date: new Date(row.date + 'T00:00' + row.timezone),
    datetime: new Date(row.datetime),
  }));

  return data;
}

let data = await loadData();
console.log(data);