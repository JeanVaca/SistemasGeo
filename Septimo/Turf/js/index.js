'use strict';

const leafletMaps = [];
// Inicializa los mapas de ejemplo
for (const mapEl of document.getElementsByClassName('leaflet-map')) {
    leafletMaps.push(
        L.map(mapEl.id).setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL)
    );
}

for (const map of leafletMaps) {
    L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(map);
}