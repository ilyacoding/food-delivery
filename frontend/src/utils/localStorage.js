export const localStorageFactory = key => ({
    get: () => localStorage.getItem(key),
    set: data => localStorage.setItem(key, data),
    remove: () => localStorage.removeItem(key)
});