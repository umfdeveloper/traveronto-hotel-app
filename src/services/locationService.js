import { httpClient } from './httpClient';

export async function searchLocations(query) {
    return httpClient.get(`/locations/hotel?query=${encodeURIComponent(query)}`);
}

