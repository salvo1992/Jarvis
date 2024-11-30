export const loginUser = async (username, password) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Credenziali errate');
    }
  
    const data = await response.json();
    return data; // Contiene il token, userId, e username
  };
  