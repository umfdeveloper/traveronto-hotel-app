import { httpClient } from './httpClient';

export async function loginWithEmail({ email, password }) {
    return httpClient.post('/auth/login', { email, password ,hotel_app: true});
}

export async function registerWithEmail({ first_name, last_name, email, password, term }) {
    return httpClient.post('/auth/register', { first_name, last_name, email, password, term });
}

export async function updateProfile({ first_name, last_name, avatar }) {
    return httpClient.put('/auth/profile', { first_name, last_name, avatar });
}

