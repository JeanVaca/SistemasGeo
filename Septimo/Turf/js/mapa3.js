const map3 = leafletMaps[2];

// Crea polígono
L.polygon(polygonCoords, { color: 'red' }).addTo(map3);

// Operación along de TurfJS
const polygon2 = turf.polygon([polygonCoords]);

var area = turf.area(polygon2);

const txtarea = document.getElementById("area");
console.log(area);
txtarea.textContent = `El area del poligono es: ${area}km`;