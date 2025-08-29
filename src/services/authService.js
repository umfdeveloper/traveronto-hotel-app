import { httpClient } from './httpClient';

export async function loginWithEmail({ email, password }) {
    return httpClient.post('/auth/login', { email, password });
}

export async function registerWithEmail({ first_name, last_name, email, password, term }) {
    return httpClient.post('/auth/register', { first_name, last_name, email, password, term });
}

