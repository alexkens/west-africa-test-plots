import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


function whatis (value) {
  return Object.prototype.toString.call(value)
    .replace(/^\[object\s+([a-z]+)\]$/i, '$1')
    .toLowerCase();
}

async function plot_country(country) {

    

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


    const svg = d3.select("#plot-gdp")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .text("Gross Domestic Product of " + country);

    // parse data
    const string = "gdp_total_annual_data.csv";
    var mali_values;
    const data = await d3.csv(string).then(data => {
        const mali = data.find(d => d["Country Name"] === country);
        mali_values = Object.keys(mali).filter(key => /^\d{4}$/.test(key));

        mali_values = mali_values.map(year => ({
            year: +year,
            value: +mali[year]
        }));
    });
    // console.log(mali_values);


    // define domains, d3.extent(data, d => d.date)
    x.domain(d3.extent(mali_values, d => d.year));
    y.domain([0, d3.max(mali_values.map(d => d.value))]);


    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
    .call(d3.axisLeft(y));


    const line = d3.line()
        .x(mali_values => x(mali_values.year))
        .y(mali_values => y(mali_values.value))

    svg.append("path")
    .datum(mali_values)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("d", line);
}


const country_array = ["Mali", "Burkina Faso", "Niger", "Gabon", "Guinea"]
country_array.forEach(plot_country)