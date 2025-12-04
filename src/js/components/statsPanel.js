import { clearElement, createElement } from "../utils/dom.js";

/**
 * Render statistieken in #stats_panel.
 * @param {Object} stats
 * @param {number} stats.totalCountries
 * @param {number} stats.averagePopulation
 * @param {number} stats.favoritesPopulation
 */
export function renderStats(stats) {
    const panel = document.querySelector("#stats_panel");
    if (!panel) return;
    clearElement(panel);

    const { totalCountries, averagePopulation, favoritesPopulation } = stats;

    // Kaarten met cijfers
    const cardsRow = createElement("div", "row gy-3 mb-3");

    const card1 = createStatCard("Aantal landen", totalCountries.toString());
    const card2 = createStatCard(
        "Gemiddelde populatie",
        averagePopulation.toLocaleString("nl-BE")
    );
    const card3 = createStatCard(
        "Totale populatie favorieten",
        favoritesPopulation.toLocaleString("nl-BE")
    );

    cardsRow.appendChild(card1);
    cardsRow.appendChild(card2);
    cardsRow.appendChild(card3);
    panel.appendChild(cardsRow);

    // ------------------------------------
    // BAR CHART IMPLEMENTATION (your TODO)
    // ------------------------------------

    const barRow = createElement("div", "row bar-chart-row");

    const max = Math.max(averagePopulation, favoritesPopulation, 1); // avoid division by 0

    // Helper to create a bar
    const createBar = (label, value, colorClass) => {
        const col = createElement("div", "col-md-6 d-flex flex-column");

        const labelEl = createElement("div", "small fw-bold mb-1", label);

        const barContainer = createElement(
            "div",
            "bg-light border rounded flex-grow-1 d-flex align-items-end",
        );

        const bar = createElement("div", `bar ${colorClass}`);
        bar.style.height = `${(value / max) * 100}%`;

        barContainer.appendChild(bar);

        const valueEl = createElement(
            "div",
            "small mt-1",
            value.toLocaleString("nl-BE")
        );

        col.appendChild(labelEl);
        col.appendChild(barContainer);
        col.appendChild(valueEl);

        return col;
    };

    const barAvg = createBar("Gemiddelde populatie", averagePopulation, "bg-primary");
    const barFav = createBar("Populatie favorieten", favoritesPopulation, "bg-warning");

    barRow.appendChild(barAvg);
    barRow.appendChild(barFav);

    panel.appendChild(barRow);
}

/**
 * Kaartcomponent voor bovenaan.
 */
function createStatCard(label, valueText) {
    const col = createElement("div", "col-md-4");
    const card = createElement("div", "border rounded p-3 h-100");

    const labelEl = createElement("div", "small text-muted mb-1", label);
    const valueEl = createElement("div", "h5 mb-0", valueText);

    card.appendChild(labelEl);
    card.appendChild(valueEl);
    col.appendChild(card);

    return col;
}
