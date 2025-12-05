const STORAGE_KEY = "world-explorer-favorites";

/**
 * Leest favorieten uit localStorage.
 * @returns {Array}
 */
export function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) return [];

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Fout bij lezen van localStorage favoris: ", error);
        return [];
    }
}

/**
 * Slaat favorieten op in localStorage.
 * @param {Array} favorites
 */
export function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Kon favorieten niet opslaan: ", error);
    }

}