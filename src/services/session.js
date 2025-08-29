let AsyncStorage;
try {
    // Prefer real persistent storage when available
    AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
    // Fallback in-memory storage so app still runs without the package
    const memoryStore = new Map();
    AsyncStorage = {
        async setItem(key, value) { memoryStore.set(key, value); },
        async getItem(key) { return memoryStore.has(key) ? memoryStore.get(key) : null; },
        async multiRemove(keys) { keys.forEach((k)=> memoryStore.delete(k)); },
    };
    if (typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn('[session] @react-native-async-storage/async-storage not installed. Using in-memory fallback.');
    }
}

const STORAGE_KEYS = {
    token: 'auth_token',
    user: 'auth_user',
};

let inMemoryToken = null;
let inMemoryUser = null;

export async function setSession({ token, user }) {
    if (typeof token !== 'undefined') {
        inMemoryToken = token;
        try { await AsyncStorage.setItem(STORAGE_KEYS.token, String(token)); } catch (_) {}
    }
    if (typeof user !== 'undefined') {
        inMemoryUser = user;
        try { await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user)); } catch (_) {}
    }
}

export async function getToken() {
    if (inMemoryToken) return inMemoryToken;
    try {
        const v = await AsyncStorage.getItem(STORAGE_KEYS.token);
        inMemoryToken = v;
        return v;
    } catch (_) { return null; }
}

export async function getUser() {
    if (inMemoryUser) return inMemoryUser;
    try {
        const v = await AsyncStorage.getItem(STORAGE_KEYS.user);
        inMemoryUser = v ? JSON.parse(v) : null;
        return inMemoryUser;
    } catch (_) { return null; }
}

export async function clearSession() {
    inMemoryToken = null;
    inMemoryUser = null;
    try {
        await AsyncStorage.multiRemove([STORAGE_KEYS.token, STORAGE_KEYS.user]);
    } catch (_) {}
}

