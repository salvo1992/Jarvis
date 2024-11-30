import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simula la chiamata al backend per recuperare i dati dell'utente
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <h1>Area Personale</h1>
      <p>ID Utente: {userData.userId}</p>
      <p>Username: {userData.username}</p>
      {/* Aggiungi altri dati dell'utente */}
    </div>
  );
};

export default ProfilePage;
