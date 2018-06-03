$.getScript('static/js/triggers.js');
$.getScript('static/js/helper.js');


// map stuff
const dict = {};
fetch('api/population', { credentials: 'same-origin' })
  .then((response) => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  })
  .then((data) => {
    for (key in data) {
      tract = data[key].census_tract;
      population = data[key].pop_100;
      dict[tract] = population;
    }
  })
  .catch(error => console.log(error));// eslint-disable-line no-console


const loadCensusTracts = new L.GeoJSON.AJAX('data/censustracts.geojson', { onEachFeature, style });
const neighborhoods = new L.GeoJSON.AJAX('data/neighborhoods.geojson', { onEachFeature, style });
const precincts = new L.GeoJSON.AJAX('data/precincts.geojson', { onEachFeature, style });
const wards = new L.GeoJSON.AJAX('data/wards.geojson', { onEachFeature, style });
const zipcodes = new L.GeoJSON.AJAX('data/zipcodes.geojson', { onEachFeature, style });

const map = L.map('map', {
  center: [41.81, -87.6298],
  zoom: 11,
  layers: [loadCensusTracts],
});

// from there, similar to the example:
// specify the basemap and overlays to put in the layers control
const baseMaps = {
  'Census Tracts': loadCensusTracts,
  Neighborhoods: neighborhoods,
  Precincts: precincts,
  Wards: wards,
  'Zip Codes': zipcodes,
};
const overlayMaps = {

};

// initialize up the L.control.layers
L.control.layers(baseMaps, overlayMaps).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">Together Chicago</a> contributors',
}).addTo(map);


// // get the data on the map
//     var censusMin = Number.MAX_VALUE, censusMax = -Number.MAX_VALUE;
// neighborhoods
// var loadCensusTracts = new L.GeoJSON.AJAX("staticfiles/data/Neighborhoods_2012b.geojson", {onEachFeature:onEachFeature, style:style});
// loadCensusTracts.addTo(map);
// census-tracts


// change feature.properties.objectid to reflect what you want to measure
function style(feature) {
  // console.log("style", feature)
  return {
    fillColor: getColor(feature.properties.commarea_n),
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.2,
  };
}
// Change colors on hover & set popup
function highlightFeature(feature) {
  const layer = feature.target;

  const idx = document.getElementById('census-variable').options.selectedIndex;
  if (document.getElementById('census-variable').options[idx].id === 'census_pop_heat') {
    layer.setStyle({
      fillOpacity: 1,
    });
  } else {
    layer.setStyle({
      fillOpacity: 0.7,
    });
  }
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function resetHighlight(e) {
  const idx = document.getElementById('census-variable').options.selectedIndex;

  // console.log(document.getElementById('census-variable').options[idx]);
  if (document.getElementById('census-variable').options[idx].id === 'census_pop_heat') {
    for (layer in map._layers) {
      if (map._layers[layer].feature != undefined) {
        // map._layers[layer].options.fillColor = '#FFFFFF'//getColorPopulation(map._layers[layer].feature.population)
        map._layers[layer].setStyle({
          fillColor: getColorPopulation(map._layers[layer].feature.population),
          weight: 2,
          opacity: 0.5,
          color: 'white',
          fillOpacity: 0.5,
        });
      }
    }
  } else {
    loadCensusTracts.resetStyle(e.target);
  }
}

function Click(feature, layer) {
  if (feature.properties.namelsad10) {
    output = `<dl>${  feature.properties.namelsad10
         }<dt>Population: ${  feature.population  }</dl>`;

    layer.bindPopup(output);
    // layer.bindPopup('Population: '+ population)
  } else if (feature.properties.pri_neigh) {
    layer.bindPopup(`Neighborhood: ${feature.properties.pri_neigh}`);
  } else if (feature.properties.zip) {
    layer.bindPopup(`Zip Code: ${  feature.properties.zip}`);
  } else if (feature.properties.precinct) {
    layer.bindPopup(`Precinct: ${feature.properties.precinct}`);
  } else if (feature.properties.ward) {
    layer.bindPopup(`Ward: ${feature.properties.ward}`);
  }
}

function onEachFeature(feature, layer) {
  feature.population = dict[feature.properties.name10];

  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: Click(feature, layer),
  });
}

