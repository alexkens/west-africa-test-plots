import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
// import { whatis } from './plot.js'

const width = 975;
const height = 610;


var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("line")
        .attr("x1", 10)
        .attr("y1", 30)
        .attr("x2", 200)
        .attr("y2", 300)
        .attr("stroke", "green")
        .attr("stroke-width", 10);

const geo_file = "lil_africa.json"

var p = svg.append("path")
    .datum({type: "FeatureCollection", features: features})
    .attr("d", d3.geoPath());
console.log(p)


// var names = features.properties.name_en
// var coordinates = features.geometry.coordinates

