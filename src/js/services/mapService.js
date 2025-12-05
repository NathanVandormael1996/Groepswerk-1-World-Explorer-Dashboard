import L from "leaflet";
import "leaflet/dist/leaflet.css";
let map;
let marker;
/**
 * Initialiseert de Leaflet-kaart in #country_map.
 */
export function initMap() {
    const mapContainer = document.querySelector("#country_map");
    if (!mapContainer) return;
    if (map) return;

    map = L.map(mapContainer).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}
export function focusCountry(lat, lng, name) {
    if (!map) return;

    map.setView([lat, lng], 5);

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lng]).addTo(map);

    if (name) {
        marker.bindPopup(String(name)).openPopup();
    }
}