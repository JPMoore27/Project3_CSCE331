// D3.js logic

// Mock data
let totalTasks = 13; // Total tasks for the sprint
let doneTasks = 5; // Done by 2nd Nov
let idealTasksPerDay = totalTasks / 7; // This is for the "Estimated Effort"

let data = [
    { day: 1, estimated: totalTasks, actual: totalTasks },
    { day: 2, estimated: totalTasks * 5/6, actual: totalTasks - doneTasks },
    { day: 3, estimated: totalTasks * 4/6, actual: totalTasks - doneTasks - 2 },
    { day: 4, estimated: totalTasks * 3/6, actual: totalTasks - doneTasks - 4 },
    { day: 5, estimated: totalTasks * 2/6, actual: totalTasks - doneTasks - 6 },
    { day: 6, estimated: totalTasks * 1/6, actual: totalTasks - doneTasks - 8 },
    { day: 7, estimated: 0, actual: 0 }  // On the last day, both should be zero.
];



const width = 600, height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

const x = d3.scaleLinear().range([margin.left, width - margin.right]).domain([1, 7]);
const y = d3.scaleLinear().range([height - margin.bottom, margin.top]).domain([0, totalTasks]);

const xAxis = d3.axisBottom(x).tickValues(d3.range(1, 8)).tickFormat(d => `Day ${d}`);
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
