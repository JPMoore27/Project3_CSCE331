// D3.js logic

// Mock data
let totalTasks = 34; // Total tasks now includes all tasks up to day 7
let doneTasks = 25; // All tasks are completed by day 7
let totalDays = 40; // Extend the sprint to 30 days
let idealTasksPerDay = (totalTasks - doneTasks) / (totalDays - 7); // New ideal tasks per day

let data = [];
for (let day = 1; day <= totalDays; day++) {
    let estimated = totalTasks - (idealTasksPerDay * (day - 7));
    let actual = day <= 21 ? 0 : doneTasks; // All tasks done by day 7, so actual remains 'doneTasks' after day 7
    data.push({ day: day, estimated: estimated, actual: actual });
}

const width = 600, height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// Adjust the x scale and x-axis
const x = d3.scaleLinear().range([margin.left, width - margin.right]).domain([1, totalDays]);
const y = d3.scaleLinear().range([height - margin.bottom, margin.top]).domain([0, totalTasks]);

const xAxis = d3.axisBottom(x).tickFormat(d => `Day ${d}`);
const yAxis = d3.axisLeft(y);

const line = d3.line()
    .defined(d => !isNaN(d.estimated))
    .x(d => x(d.day))
    .y(d => y(d.estimated));

const line2 = d3.line()
    .defined(d => !isNaN(d.actual))
    .x(d => x(d.day))
    .y(d => y(d.actual));

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);

svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('d', line);

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('d', line2);
