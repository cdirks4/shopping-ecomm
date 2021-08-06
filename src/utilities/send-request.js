import { getToken } from './users-service';

export default async function sendRequest(
	url,
	method = 'GET',
	payload = null,
	payloadIsFormData = false
) {
	const options = { method };
	if (payload) {
		options.headers = { 'Content-Type': 'application/json' };
		options.body = payloadIsFormData ? payload : JSON.stringify(payload);
	}
	// if I have a token, I will have to add it to the headers with Authorization
	const token = getToken();
	if (token) {
		// Ensure the headers object exists
		options.headers = options.headers || {};
		// Add token to an Authorization header
		// Prefacing with 'Bearer' is recommended in the HTTP specification
		options.headers.Authorization = `Bearer ${token}`;
	}
	const res = await fetch(url, options);
	if (res.ok) return res.json();
	throw new Error('Bad Request');
}
