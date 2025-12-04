import { clearElement, createElement } from "../utils/dom.js";
/**
 * Render de lijst van landen in #country_list.
 *
 * @param {Object} config
 * @param {Array} config.countries
 * @param {Array} config.favorites
 * @param {Function} config.onCountryClick (country) => void
 * @param {Function} config.onFavoriteToggle (country) => void
 */
export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);

    const countLabel = document.querySelector("#countries_count");
    if (countLabel) {
        countLabel.textContent = `${countries?.length ?? 0} landen`;
    }

    if (!countries || countries.length === 0) {
        const empty = createElement(
            "div",
            "col-12 alert alert-light border text-center mb-0",
            "Geen landen gevonden voor deze filter."
        );
        container.appendChild(empty);
        return;
    }

    countries.forEach((country) => {
        const col = createElement("div", "col");
        const card = createElement("div", "card h-100 shadow-sm border-0");
        const body = createElement("div", "card-body d-flex flex-column");

        // Flag
        const flagUrl = country.flags?.png ?? "";
        const flag = createElement("img", "img-fluid mb-2 border");
        flag.src = flagUrl;
        flag.alt = `Vlag van ${country?.name?.common ?? "Onbekend"}`;

        // Name
        const name = createElement("h5", "card-title", country.name?.common ?? "Onbekend");

        // Region
        const region = createElement("p", "text-muted small mb-1", `Regio: ${country.region ?? "-"}`);

        // Population
        const population = createElement(
            "p",
            "small",
            `Populatie: ${country.population?.toLocaleString("nl-BE") ?? "?"}`
        );

        // Details button
        const btnDetails = createElement("button", "btn btn-primary btn-sm mt-auto", "Details");
        btnDetails.addEventListener("click", () => onCountryClick(country));

        // Favourite button
        const isFav = favorites.some((f) => f.cca3 === country.cca3);
        const favBtn = createElement(
            "button",
            `btn btn-sm ms-2 ${isFav ? "btn-warning" : "btn-outline-warning"}`,
            "★"
        );
        favBtn.addEventListener("click", () => onFavoriteToggle(country));

        // Action area
        const actions = createElement("div", "d-flex justify-content-between align-items-center mt-2");
        actions.appendChild(btnDetails);
        actions.appendChild(favBtn);

        body.appendChild(flag);
        body.appendChild(name);
        body.appendChild(region);
        body.appendChild(population);
        body.appendChild(actions);

        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}