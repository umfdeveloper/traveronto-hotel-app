import { API_BASE_URL } from '../config/api';
import { getToken, getUser } from './session';

export class HttpClient {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async request(path, { method = 'GET', headers = {}, body, timeoutMs = 50000 } = {}) {
        const url = `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        const finalHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        };
        const token = await getToken();
        if (token && !finalHeaders['Authorization']) {
            finalHeaders['Authorization'] = `Bearer ${token}`;
        }
        try {
            const user = await getUser();
            const apiKey = user?.api_key;
            if (apiKey && !finalHeaders['X-API-KEY']) {
                finalHeaders['X-API-KEY'] = apiKey;
            }
        } catch (_) {}
        console.log(finalHeaders);
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        let response;
        try {
            response = await fetch(url, {
                method,
                headers: finalHeaders,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
            
            if (err.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw err;
        } finally {
            clearTimeout(timer);
        }
        // console.log(response);
        const text = await response.text();
        let data;
        try { data = text ? JSON.parse(text) : null; } catch (_) { data = text; }

        if (!response.ok) {
            const error = new Error((data && data.message) || 'Request failed');
            error.status = response.status;
            error.data = data;
            throw error;
        }
        console.log(data);
        return data;
    }

    get(path, options) { return this.request(path, { method: 'GET', ...(options || {}) }); }
    post(path, body, options) { return this.request(path, { method: 'POST', body, ...(options || {}) }); }
    put(path, body, options) { return this.request(path, { method: 'PUT', body, ...(options || {}) }); }
}

export const httpClient = new HttpClient();

