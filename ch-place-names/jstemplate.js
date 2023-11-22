// Geojson with the map outline.
const geojsonLocation = 'https://raw.githubusercontent.com/srobotta/moodle-database-presets/master/assets/ch_outline.geojson';

function showMapOutline(places) {
  // The map is a path in a svg, set with and height of the svg.
  var svg = d3.select('#map-svg').attr('width', 600).attr('height', 400);

  // Projection of this data is mercator, check this with the geo data that you will use.
  var projection = d3.geo.mercator()
    .scale(7000)            // reasonable scale that the map fits into 600x400
    .center([8.23, 46.8])   // center of Switzerland
    .translate([300, 200]); // half of width and height
  // Set the projection to the path
  var path = d3.geo.path().projection(projection);
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
    // For each item from the data add a red circle at the defined location.
    for(let i = 0; i < places.length; i++) {
      let coordinates = projection([places[i].lon, places[i].lat]);
      svg.append("circle")
        .attr('cx', coordinates[0])
        .attr('cy', coordinates[1])
        .attr('r', 2)
        .attr('fill', 'red');
    }
    // Here the svg is complete, therefore fill the href attr of the anchor element
    // with the complete data from the svg as a base64 encoded string.
    d3.select('#map-svg-dl').attr('href', "data:image/svg+xml;base64,\n" + btoa(d3.select('svg').node().outerHTML));

    // Create an QR code with the URL to reproduce the same output.
    var qrc = new QRCode(document.getElementById("qrc"), {
      text: window.location.href,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      // QRCode.CorrectLevel.L | QRCode.CorrectLevel.M | QRCode.CorrectLevel.H
      correctLevel : QRCode.CorrectLevel.H
    });
  }).catch((error) => {
    console.log(error);
  });

};