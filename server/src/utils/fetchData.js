export const fetchData = async (url, options = {}) => {
	try {
	  const response = await fetch(url, options);
  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  try {
		const data = await response.json();
		return data;
	  } catch (jsonError) {
		throw new Error('Error parsing JSON');
	  }
	} catch (error) {
	  console.error('Error fetching data:', error);
	  throw error;
	}
  };