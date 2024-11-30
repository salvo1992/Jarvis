// Esempio di backend (Node.js con Express)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Supponiamo che tu abbia una funzione che verifica il login
    if (username === 'user' && password === 'password123') {
      // Genera un token (es. JWT) e invialo come risposta
      const token = 'JWT-TOKEN';
      res.json({ token, userId: 1, username: 'user' });
    } else {
      res.status(401).send('Credenziali errate');
    }
  });
  