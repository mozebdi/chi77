/** Removes census data from each shape on the map and resets the UI. */
function clearCensusData() {
    censusMin = Number.MAX_VALUE;
    censusMax = -Number.MAX_VALUE;
    map.data.forEach((row) => {
      row.setProperty('census_variable', undefined);
    });
    document.getElementById('data-box').style.display = 'none';
    document.getElementById('data-caret').style.display = 'none';
  }
  // change polygon color to reflect crime data intensity
  // Show number of crimes in pop-up
  // color of polygons based on intensity
  function getColor(d) {
    return d > 70 ? '#800026' :
      d > 60 ? '#BD0026' :
        d > 50 ? '#E31A1C' :
          d > 40 ? '#FC4E2A' :
            d > 30 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  }
  
  function getColorPopulation(d) {
    return d > 8000 ? '#800026' :
      d > 7000 ? '#BD0026' :
        d > 6000 ? '#E31A1C' :
          d > 5000 ? '#FC4E2A' :
            d > 4000 ? '#FD8D3C' :
              d > 3000 ? '#FEB24C' :
                d > 2000 ? '#FED976' :
                  '#FFEDA0';
  }