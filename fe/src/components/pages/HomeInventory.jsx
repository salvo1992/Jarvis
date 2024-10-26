import React, { useEffect, useState } from 'react';
import styles from './HomeInventory.module.css';

const HomeInventory = () => {
  const [inventory, setInventory] = useState({
    fridge: [],
    freezer: [],
    beverage: [],
    cleaning: [],
    sweets: [],
    savory: [],
    fruit: [],
  });
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch dell'inventario dal backend
  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/items'); // Assicurati che il percorso sia corretto
      const data = await response.json();
      const organizedInventory = organizeInventoryByCategory(data);
      setInventory(organizedInventory);
    } catch (error) {
      console.error('Errore nel recupero dell\'inventario:', error);
    }
  };

  const organizeInventoryByCategory = (items) => {
    return items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
      return acc;
    }, {});
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((item) => item !== product)
        : [...prevSelected, product]
    );
  };

  const handleDeleteExpired = async (category) => {
    const expiredItems = inventory[category].filter(
      (product) => new Date(product.expiryDate) <= new Date() && selectedProducts.includes(product)
    );

    for (const product of expiredItems) {
      try {
        await fetch(`/api/items/${product._id}`, { method: 'DELETE' });
      } catch (error) {
        console.error(`Errore nell'eliminazione del prodotto ${product.name}:`, error);
      }
    }

    fetchInventory(); // Ricarica l'inventario dopo l'eliminazione
    setSelectedProducts([]);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Inventario Casa</h1>
      {Object.keys(inventory).map((category) => (
        <div key={category}>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <ul>
            {inventory[category].map((product) => (
              <li key={product._id} style={{ backgroundColor: getCategoryColor(category) }}>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product)}
                  onChange={() => handleSelectProduct(product)}
                />
                {product.name} (Scadenza: {product.expiryDate}) - {product.description}
              </li>
            ))}
          </ul>
          <button onClick={() => handleDeleteExpired(category)}>Elimina Scaduti</button>
        </div>
      ))}
    </div>
  );
};

const getCategoryColor = (category) => { /* Funzione per colori come sopra */ };

export default HomeInventory;


