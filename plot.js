import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function whatis (value) {
  return Object.prototype.toString.call(value)
    .replace(/^\[object\s+([a-z]+)\]$/i, '$1')
    .toLowerCase();
}




// Declare the chart dimensions and margins.
const margin = { top: 70, bottom: 40, right: 30, left: 80 }
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .range([0, width]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .range([height, 0]);


const svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

svg.append("text")
    .text("BRVM (Bourse Régionale des Valeurs Mobilières SA) Composite Historical Data")


// parse data
const string = 'BRVM Composite Historical Data.csv';

const data = await d3.csv(string, d => {
  return {
    date: new Date(d["Date"]),
    price: +d["Price"],
  };
});
console.log(data)

// define domains, d3.extent(data, d => d.date)
x.domain(d3.extent(data, d => d.date));
y.domain([0, d3.max(data, d => d.price)]);


svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x)
    .ticks(d3.timeMonth.every(15)) 
    .tickFormat(d3.timeFormat("%b %Y")));


// Add the y-axis

svg.append("g")
  .call(d3.axisLeft(y))
// y.ticks()

// line
const line = d3.line()
    .x((data) => x(data.date))
    .y((data) => y(data.price))

// Add the line path to the SVG element
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", line);