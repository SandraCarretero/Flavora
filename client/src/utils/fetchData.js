export const fetchData = async (url, options = {}) => {
	try {
	  const response = await fetch(url, options);
  
	  // Verifica si la respuesta es exitosa (código de estado 2xx)
	  if (!response.ok) {
		const errorMessage = `HTTP error! Status: ${response.status}`;
		throw new Error(errorMessage);
	  }
  
	  // Verifica el tipo de contenido de la respuesta
	  const contentType = response.headers.get('Content-Type');
  
	  // Solo intenta convertir a JSON si el contenido es JSON
	  if (contentType && contentType.includes('application/json')) {
		const data = await response.json();
		return data;
	  } else {
		// Si no es JSON, simplemente retorna la respuesta en texto
		const text = await response.text();
		return { error: 'Response is not JSON', text };
	  }
	} catch (err) {
	  // Maneja el error de manera adecuada
	  console.error('Fetch error:', err);
	  return { error: err.message };
	}
  };
  