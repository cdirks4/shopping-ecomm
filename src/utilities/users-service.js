import * as usersAPI from './user-api';

export async function signup(userData) {
	try {
		const token = await usersAPI.signup(userData);
		localStorage.setItem('token', token);
		return getUser();
	} catch (err) {
		return err;
	}
}
export async function login(credentials) {
	try {
		const token = await usersAPI.login(credentials);
		localStorage.setItem('token', token);
		return getUser();
	} catch (err) {
		return err;
	}
}
export async function getToken() {
	// getItem returns null if there's no string
	const token = await localStorage.getItem('token');
	if (!token) return null;
	// Obtain the payload of the token
	const payload = await JSON.parse(atob(token.split('.')[1]));
	// A JWT's exp is expressed in seconds, not milliseconds, so convert
	if (payload.exp < Date.now() / 1000) {
		// 	// Token has expired - remove it from localStorage
		localStorage.removeItem('token');
		return null;
	}
	return token;
}

export async function getUser() {
	const token = await getToken();
	// If there's a token, return the user in the payload, otherwise return null
	console.log(token);
	return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}
