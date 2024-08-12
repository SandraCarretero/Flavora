export const fetchData = async (url, options = {}) => {
	try {
	  const response = await fetch(url, options);
  
	  // Verificar si la respuesta es válida
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  // Intentar analizar la respuesta como JSON
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