const EXCHANGE_API_BASE = "https://open.er-api.com/v6/latest";
/**
 * Haal wisselkoers op van EUR naar currencyCode.
 * @param {string} currencyCode bijv. "USD"
 * @returns {Promise<number|null>} wisselkoers of null bij fout
 */
export async function fetchRateToEuro(currencyCode) {
    if (!currencyCode) return null;

    const url = `${EXCHANGE_API_BASE}?base=EUR&symbols=${encodeURIComponent(currencyCode)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) return null;

        const data = await res.json();
        if (!data?.rates?.[currencyCode]) return null;

        return data.rates[currencyCode];
    } catch {
        return null;
    }

}
export function calculateStats(countries, favorites) {

    // Aantal favorieten
    const totalCountries = favorites.length;

    // Gemiddelde populatie van favorieten
    let averagePopulation = 0;
    if (favorites.length > 0) {
        const sum = favorites.reduce(
            (acc, c) => acc + (typeof c.population === "number" ? c.population : 0),
            0
        );
        averagePopulation = Math.round(sum / favorites.length);
    }

    // Totale populatie van favorieten
    const favoritesPopulation = favorites.reduce(
        (acc, f) => acc + f.population, 0
    );

    return {
        totalCountries,
        averagePopulation,
        favoritesPopulation
    };
}

