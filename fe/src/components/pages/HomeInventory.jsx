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

  const [selectedProducts, setSelectedProducts] = useState([]); // Cambiato per avere solo i prodotti selezionati

  // Recupera l'inventario dal localStorage
  const fetchInventory = () => {
    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || {
      fridge: [],
      freezer: [],
      beverage: [],
      cleaning: [],
      sweets: [],
      savory: [],
      fruit: [],
    };
    setInventory(storedInventory);
  };

  // Funzione per selezionare o deselezionare un prodotto
  const handleSelectProduct = (product) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter(item => item !== product);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  // Elimina i prodotti scaduti dalla categoria specificata
  const handleDeleteExpired = (category) => {
    const updatedInventory = { ...inventory };
    const deletedItems = [];

    // Filtra gli articoli da eliminare
    updatedInventory[category] = updatedInventory[category].filter(product => {
      const isExpired = new Date(product.expiryDate) <= new Date();
      const isSelected = selectedProducts.includes(product); // Controlla solo i prodotti selezionati

      // Log dei dettagli di ogni prodotto
      console.log(`Controllo prodotto: ${product.name}, Scadenza: ${product.expiryDate}, Scaduto: ${isExpired}, Selezionato: ${isSelected}`);

      // Se il prodotto è scaduto e selezionato, aggiungilo all'elenco degli eliminati
      if (isExpired && isSelected) {
        deletedItems.push(product);
        return false; // Non mantenere questo prodotto nell'inventario
      }
      return true; // Mantieni questo prodotto nell'inventario
    });

    // Log dell'inventario prima e dopo l'operazione
    console.log('Inventario prima dell\'eliminazione:', inventory);
    console.log('Inventario dopo l\'eliminazione:', updatedInventory);

    // Aggiorna lo stato con l'inventario filtrato
    setInventory(updatedInventory);
    setSelectedProducts([]); // Resetta le selezioni
    localStorage.setItem('inventory', JSON.stringify(updatedInventory)); // Salva nel localStorage

    // Log degli articoli eliminati
    console.log(`Articoli eliminati dalla categoria ${category}:`, deletedItems);
  };

  // Usa useEffect per caricare l'inventario quando il componente viene montato
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
            {inventory[category].map((product, index) => (
              <li key={index} style={{ backgroundColor: getCategoryColor(category) }}>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product)} // Controlla se è selezionato
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

// Funzione per restituire il colore in base alla categoria
const getCategoryColor = (category) => {
  switch (category) {
    case 'fridge':
      return '#ccffcc'; // Verde chiaro
    case 'freezer':
      return '#99ccff'; // Blu chiaro
    case 'beverage':
      return '#ffcc99'; // Arancione chiaro
    case 'cleaning':
      return '#ff9999'; // Rosso chiaro
    case 'sweets':
      return '#ffccff'; // Viola chiaro
    case 'savory':
      return '#ffff99'; // Giallo chiaro
    case 'fruit':
      return '#ccff99'; // Verde chiaro
    default:
      return '#ffffff'; // Bianco
  }
};

export default HomeInventory;

