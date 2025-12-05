import * as bootstrap from "bootstrap";
import { clearElement, createElement } from "../utils/dom.js";
import { focusCountry } from "../services/mapService.js";
import { fetchRateToEuro } from "../services/statsService.js";

let modalInstance = null;
let currentCountry = null;
let toggleFavorite = null;

export function initCountryModal(onFavoriteToggle) {
    toggleFavorite = onFavoriteToggle;

    const modalElement = document.querySelector("#country_modal");
    if (!modalElement) return;

    modalInstance = new bootstrap.Modal(modalElement);

    const favBtn = document.querySelector("#favorite_toggle_btn");
    favBtn.addEventListener("click", () => {
        if (currentCountry) toggleFavorite(currentCountry);
    });
}

export async function showCountryDetail(country, isFavorite) {
    if (!modalInstance || !country) return;
    currentCountry = country;

    const title = document.querySelector("#country_modal_label");
    const flagImg = document.querySelector("#country_flag");
    const detailsDl = document.querySelector("#country_details");
    const alertBox = document.querySelector("#country_modal_alert");
    const currencyInfo = document.querySelector("#currency_info");
    const favBtn = document.querySelector("#favorite_toggle_btn");

    clearElement(detailsDl);
    clearElement(currencyInfo);

    // Basic
    title.textContent = country.name?.common ?? "Onbekend";
    flagImg.src = country.flags?.png ?? "";

    const add = (label, value) => {
        detailsDl.appendChild(createElement("dt", "col-4 fw-bold small", label));
        detailsDl.appendChild(createElement("dd", "col-8 small", value));
    };

    add("Hoofdstad", country.capital?.[0] ?? "Onbekend");
    add("Regio", country.region ?? "Onbekend");
    add("Populatie", country.population?.toLocaleString("nl-BE") ?? "Onbekend");

    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "Onbekend";
    add("Talen", languages);

    const currencies = country.currencies || {};
    const code = Object.keys(currencies)[0];
    const curName = code ? currencies[code].name : "Onbekend";
    add("Valuta", `${code ?? "-"} – ${curName}`);

    // Map
    const [lat, lng] = country.latlng ?? [];
    if (lat && lng) {
        alertBox.classList.add("d-none");
        focusCountry(lat, lng, country.name.common);
    } else {
        alertBox.textContent = "Locatiegegevens niet beschikbaar.";
        alertBox.classList.remove("d-none");
    }

    // Exchange
    if (code) {
        const rate = await fetchRateToEuro(code);
        currencyInfo.textContent = rate
            ? `1 EUR ≈ ${rate.toFixed(2)} ${code}`
            : "Geen wisselkoers beschikbaar.";
    } else {
        currencyInfo.textContent = "Geen valuta-informatie beschikbaar.";
    }
    const hasLatLng =
        Array.isArray(country.latlng) &&
        country.latlng.length >= 2 &&
        typeof country.latlng[0] === "number" &&
        typeof country.latlng[1] === "number";

    if (hasLatLng) {
        alertBox.classList.add("d-none");
        focusCountry(country.latlng[0], country.latlng[1], country.name?.common);
    } else {
        alertBox.classList.remove("d-none");
        alertBox.textContent = "Locatiegegevens niet beschikbaar.";
    }

    // Favourite button
    favBtn.textContent = isFavorite
        ? "★ Verwijderen uit favorieten"
        : "★ Toevoegen aan favorieten";

    modalInstance.show();
}
