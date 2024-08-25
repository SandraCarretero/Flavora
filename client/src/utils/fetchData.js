export const fetchData = async (url, options = {}) => {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			return await response.json();
		} else {
			const text = await response.text();
			return { error: 'Response is not JSON', text };
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
 