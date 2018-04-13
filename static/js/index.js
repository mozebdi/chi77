// map stuff
function getColor(d) {
        return d > 70 ? '#800026' :
               d > 60 ? '#BD0026' :
               d > 50  ? '#E31A1C' :
               d > 40  ? '#FC4E2A' :
               d > 30 ? '#FD8D3C' :
               d > 20  ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0' ;
    }
// change feature.properties.objectid to reflect what you want to measure
function style(feature) {
    return {
        fillColor: getColor(feature.properties.commarea_n),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.2
    };
}
//Change colors on hover & set popup
function highlightFeature(feature) {
    var layer = feature.target;
      layer.setStyle({
          fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }
}
function resetHighlight(e) {
        //this is the line that works
        censusTractData.resetStyle(e.target);
}

function Click(feature, layer) {
      if (feature.properties.namelsad10) {
        // console.log("feature", feature)
        population = feature.population;
        output = "<dl>" + feature.properties.namelsad10
           + "<dt>Population: " + population + "</dl>"
       
        layer.bindPopup(output)
        // layer.bindPopup('Population: '+ population)
      }
      else if (feature.properties.pri_neigh) {
        layer.bindPopup('Neighborhood: '+ feature.properties.pri_neigh)
      }
      else if (feature.properties.zip) {
        layer.bindPopup("Zip Code: " + feature.properties.zip) 
      }
      else if (feature.properties.precinct) {
        layer.bindPopup('Precinct: '+ feature.properties.precinct)
      }
      else if (feature.properties.ward) {
        layer.bindPopup('Ward: '+ feature.properties.ward)
      }

}

function onEachFeature(feature, layer) {
     if (feature.properties.name10) {
       // console.log("before", feature)
       // console.log("TRACT:", feature.properties.name10)
       // console.log("POPULATION", dict[feature.properties.name10])
       feature['population'] = dict[feature.properties.name10]
       // console.log("after", feature)
     }
     layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: Click(feature, layer),
    });
}

var dict = {}
var loadCensusTracts;
var wards;

function addToMap(map, data) {
    console.log("data", data)
    data.addTo(map)
}

function loadCensusTract() {
    var censusTractData;
    $.ajax({
    url: "api/population",
    dataType: "json",
    success: function(data) {
        for (key in data) {
            tract = data[key].census_tract;
            population = data[key].pop_100;
            dict[tract] = population
        }
    },
    error: function(error) {
        alert(error)
    }
    })
    .then(() => {
        // console.log(response)
            $.ajax({
            url: "api/domain/tracts",
            dataType: "json",
            success: function(data) {
                for (key in data.features) {
                  id = data.features[key].id
                  population = dict[id]
                  data.features[key]["population"] = population
                }
                censusTractData = L.geoJSON(data, {
                    style: style,
                    onEachFeature: onEachFeature,

                });
            }
        })
    })
    .then((data) => {
        console.log("censusTractData", censusTractData)
    })
}

// $.ajax({
//     url: "api/domain/wards",
//     dataType: "json",
//     success: function(data) {
//         wards = L.geoJSON(data, {
//                 style: style,
//                 onEachFeature: onEachFeature,
//             });
//     }
// })

loadCensusTract()
console.log("temp", temp)
$.when(loadCensusTract()).then(console.log(censusTractData))



var map = L.map('map', {
        center: [41.81, -87.6298],
        zoom: 11,
        layers: []
        });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">Together Chicago</a> contributors'
  }).addTo(map)

// var censusTractData;
// $.ajax({
// url: "api/population",
// dataType: "json",
// success: function(data) {
//     for (key in data) {
//         tract = data[key].census_tract;
//         population = data[key].pop_100;
//         dict[tract] = population
//     }
// },
// error: function(error) {
//     alert(error)
// }
// })
// .then(() => {
//     // console.log(response)
//     console.log("dict", dict)
//     $.ajax({
//         url: "api/domain/tracts",
//         dataType: "json",
//         success: function(data) {
//             console.log("data returned", data)
//             for (key in data.features) {
//               id = data.features[key].id
//               population = dict[id]
//               data.features[key]["population"] = population
//             }
//             // console.log(data.features)
//             console.log("data after population", data)
//             censusTractData = L.geoJSON(data, {
//                 style: style,
//                 onEachFeature: onEachFeature,
//             }).addTo(map);

//         }

//     })
// })

// var baseMaps = {
//     "Chicago": chicagoMap,
// };
// var overlayMaps = {
//     "Census Tracts": censusTractData,
//     // "Wards": wards
// };
// L.control.layers(baseMaps, overlayMaps).addTo(map);



// console.log(dict)
  /** Removes census data from each shape on the map and resets the UI. */
      function clearCensusData() {
        censusMin = Number.MAX_VALUE;
        censusMax = -Number.MAX_VALUE;
        map.data.forEach(function(row) {
          row.setProperty('census_variable', undefined);
        });
        document.getElementById('data-box').style.display = 'none';
        document.getElementById('data-caret').style.display = 'none';
      }
// change polygon color to reflect crime data intensity
// Show number of crimes in pop-up
// color of polygons based on intensity
