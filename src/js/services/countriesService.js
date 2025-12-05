/**
 * onderstaand url kan niet meer up to date zijn
 controleer zelf de api
 */
const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";
/**
 * Haalt alle landen op via de REST Countries API.
 * @returns {Promise<Array>} array van landen
 */
export async function fetchAllCountries() {
    const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";

    /**
     * Haalt alle landen op via de REST Countries API.
     * @returns {Promise<Array>} array met landen
     */

        try {
            const response = await fetch(COUNTRIES_API_URL);

            if (!response.ok) {
                throw new Error(`Fout bij ophalen landen: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("API gaf onverwachte data terug.");
            }

            return data;
        } catch (error) {
            throw new Error("Kon landen niet laden: " + error.message);
        }
    }