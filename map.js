import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


const width = 975;
const height = 610;

const svg = d3.select("#map")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;")

const geo_file = "africa.json"

