$("div#legend").hide();

// Toggles between different API routes i.e. pulls data based on side-nav selection
$('#census-variable').change(function () {
    if ($(this).children(':selected').attr('id') == 'census_pop_heat') {
      $("div#legend").show();
      for (layer in map._layers) {
        if (map._layers[layer].feature != undefined) {
          // map._layers[layer].options.fillColor = '#FFFFFF'//getColorPopulation(map._layers[layer].feature.population)
          map._layers[layer].setStyle({
            fillColor: getColorPopulation(map._layers[layer].feature.population),
            weight: 2,
            opacity: .5,
            color: 'white',
            fillOpacity: 0.5,
          });
        }
      }
    } else if ($(this).children(':selected').attr('id') == 'none'){
      $("div#legend").hide();
      for (layer in map._layers) {
        if (map._layers[layer].feature != undefined) {
          loadCensusTracts.resetStyle(map._layers[layer]);
        }
      }
    }
  });
  