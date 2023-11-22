// Geojson with the map outline.
const geojsonLocation = 'https://raw.githubusercontent.com/srobotta/moodle-database-presets/master/assets/ch_outline.geojson';
// The classification of the tags. Change/add colors and tags here.
// You may also use hexadecimal notation as in html/css.
function getColor4Tag(tag) {
  tag = tag.toLowerCase();
  const colors = {
    "settlement": "red",
    "waters": "blue",
    "road": "orange",
  };
  return colors.hasOwnProperty(tag) ? colors[tag] : 'black';
};

// Tooltip container
function showTlp(evt, text) {
  d3.select('#map-tlp')
    .html(text)
    .style('display', 'inline-block');
  return;
  let p = evt.target.getBoundingClientRect();
  d3.select('#map-tlp')
    .html(text)
    .style({
      "display": "block",
      "position": "absolute",
      "left": (evt.pageX - 270) + 'px',
      "top": (500 + p.top) + 'px'
    });
};

// Hide the tooltip when moving the cursor away from a point.
function hideTlp() {
  d3.select('#map-tlp').style('display', 'none');
};

function getMapProjection() {
  // Projection of this data is mercator, check this with the geo data that you will use.
  return d3.geo.mercator()
    .scale(7000)            // reasonable scale that the map fits into 600x400
    .center([8.23, 46.8])   // center of Switzerland
    .translate([300, 200]); // half of width and height
};

function showMapOutline() {
  // The map is a path in a svg, set with and height of the svg.
  var svg = d3.select('#map-svg').attr('width', 600).attr('height', 400);
  // Set the projection to the path
  var path = d3.geo.path().projection(getMapProjection());
  // Append a graph path and give it some styling, there are no paths yet.
  var mapLayer = svg.append('g').attr('stroke', '#aaa').attr('fill', 'none');

  function loadMap() {
    return new Promise((resolve, reject) => {
      // Load the json with the german border.
      d3.json(geojsonLocation, function (error, data) {
        if (error) reject(error);
        else resolve(data);
      });
    })
  }

  loadMap().then((data) => {
    // In the data each feature data point is part of the border and
    // appended to the path connected by a line to the previous point.
    mapLayer.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke');
  }).catch((error) => {
    console.log(error);
  });
};

// Add a single data set (i.e. a point on the map) to the SVG.
// Paint a circle with radius 4 at the location given by latitude
// And longitude. Provide the fist tag as a string.
function addPlace(name, lat, lon, tag) {
  let projection = getMapProjection();
  let coordinates = projection([lon, lat]);
  name = name.replace(/<[^>]*>/g, '').replace('"', '\\"');
  d3.select('#map-svg')
    .append("circle")
    .attr('cx', coordinates[0])
    .attr('cy', coordinates[1])
    .attr('r', 4)
    .attr('fill', getColor4Tag(tag))
    .attr('onmousemove', 'showTlp(evt,"' + name + '");')
    .attr('onmouseout', 'hideTlp();');
}