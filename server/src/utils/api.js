import { HEADERS } from '../constants/headers';
import { METHODS } from '../constants/methods';
import { fetchData } from './fetchData';

// Realiza una solicitud GET
export const getData = async (url) => {
	try {
		const data = await fetchData(url, { method: METHODS.GET });
		return data;
	} catch (error) {
		console.error('Error in getData:', error);
		throw error;
	}
};

// Realiza una solicitud POST
export const postData = async (url, body) => {
	try {
		const data = await fetchData(url, {
			method: METHODS.POST,
			body: JSON.stringify(body),
			headers: HEADERS
		});
		return data;
	} catch (error) {
		console.error('Error in postData:', error);
		throw error;
	}
};

// Realiza una solicitud PATCH
export const patchData = async (url, body) => {
	try {
		const data = await fetchData(url, {
			method: METHODS.PATCH,
			body: JSON.stringify(body),
			headers: HEADERS
		});
		return data;
	} catch (error) {
		console.error('Error in patchData:', error);
		throw error;
	}
};

// Realiza una solicitud DELETE
export const deleteData = async (url) => {
	try {
		const data = await fetchData(url, {
			method: METHODS.DELETE,
			headers: HEADERS
		});
		return data;
	} catch (error) {
		console.error('Error in deleteData:', error);
		throw error;
	}
};
