import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


const string = 'BRVM (Bourse Régionale des Valeurs Mobilières SA) Composite Historical Data';
const svg = d3.select("#title")
svg.append("text")
  .text(string)

const title_gdp = ""
const svg_gdp = d3.select("#title-gdp")
svg.append("text")
  .text(title_gdp)