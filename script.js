document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  const map = L.map('map', {
    center: [20, 10],
    zoom: 2.5,
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: false,
    maxBoundsViscosity: 1.0
  });

  // Prevent wrap-around
  map.setMaxBounds([
    [-85, -180],
    [85, 180]
  ]);

  // Add ESRI World Imagery tile layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, etc.',
    maxZoom: 18
  }).addTo(map);

  // Store references to country layers for search
  const countryLayers = {};

  // Load GeoJSON data
  fetch("https://dronerules.github.io/Global-Regs/countries.geo.json")
    .then(response => response.json())
    .then(data => {
      const geojsonLayer = L.geoJSON(data, {
        style: {
          color: "#000000",
          weight: 1.5,
          fillColor: "#e0e0e0",
          fillOpacity: 0.4
        },
        onEachFeature: function (feature, layer) {
          const countryName = feature.properties.name || "Unknown Country";
          countryLayers[countryName.toLowerCase()] = layer;

          layer.on({
            mouseover: function (e) {
              const l = e.target;
              l.setStyle({
                weight: 2,
                color: '#003366',
                fillColor: '#add8e6',
                fillOpacity: 0.75
              });
              l.bringToFront();
              l.bindTooltip(countryName, {
                direction: "center",
                className: 'country-label',
                sticky: false,
                permanent: false,
                offset: [0, 0]
              }).openTooltip();
            },
            mouseout: function (e) {
              geojsonLayer.resetStyle(e.target);
              e.target.closeTooltip();
            },
            click: function () {
              if (regulations[countryName]) {
                showRegulations(countryName);
              }
            }
          });
        }
      }).addTo(map);
    })
    .catch(error => {
      console.error('Error loading GeoJSON:', error);
    });

  // Show popup with regulation info
  function showRegulations(countryName) {
    const content = document.getElementById('popup-content');
    const popup = document.getElementById('regulation-popup');

    if (regulations[countryName]) {
      content.innerHTML = regulations[countryName];
    } else {
      content.innerHTML = `<h2>${countryName}</h2><p>No data available.</p>`;
    }
    popup.classList.remove('hidden');
  }

  // Close popup
  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('regulation-popup').classList.add('hidden');
    });
  }

  // Search functionality
  document.getElementById("country-search").addEventListener("input", function (e) {
    const query = e.target.value.trim().toLowerCase();
    const layer = countryLayers[query];
    if (layer) {
      const bounds = layer.getBounds();
      map.fitBounds(bounds, { maxZoom: 6 });
      layer.fire("mouseover");
      setTimeout(() => layer.fire("mouseout"), 3000);
    }
  });
});
