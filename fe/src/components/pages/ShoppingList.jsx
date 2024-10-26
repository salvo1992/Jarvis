import React, { useEffect, useState } from 'react';
import styles from './ShoppingList.module.css';

const ShoppingList = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('fridge'); // Valore predefinito
  const [description, setDescription] = useState('');

  // Recupera la lista della spesa dal localStorage
  const fetchProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('shoppingList')) || [];
    setProducts(storedProducts);
  };

  // Salva la lista della spesa nel localStorage
  const saveProducts = (updatedProducts) => {
    localStorage.setItem('shoppingList', JSON.stringify(updatedProducts));
  };

  // Aggiungi un nuovo prodotto
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      expiryDate: expiryDate,
      category: category,
      description: description,
      checked: false,
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts); // Salva i prodotti aggiornati nel localStorage
    setProductName('');
    setExpiryDate('');
    setCategory('fridge');
    setDescription('');
  };

  // Sposta i prodotti selezionati nell'inventario
  const handleMoveToInventory = () => {
    const purchasedProducts = products.filter(product => product.checked);
    
    // Recupera l'inventario esistente dal localStorage
    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || {
      fridge: [],
      freezer: [],
      beverage: [],
      cleaning: [],
      sweets: [],
      savory: [],
      fruit: [],
    };

    // Aggiungi i prodotti acquistati all'inventario
    purchasedProducts.forEach(product => {
      const category = product.category; // Assicurati che 'category' sia presente in ogni prodotto
      if (!storedInventory[category]) storedInventory[category] = [];
      storedInventory[category].push(product);
    });

    // Salva l'inventario aggiornato nel localStorage
    localStorage.setItem('inventory', JSON.stringify(storedInventory));

    // Rimuovi i prodotti acquistati dalla lista di acquisto
    const updatedProducts = products.filter(product => !product.checked);
    setProducts(updatedProducts);
    saveProducts(updatedProducts); // Salva i prodotti aggiornati nel localStorage
  };

  // Elimina i prodotti selezionati dalla lista
  const handleDeleteSelected = () => {
    const updatedProducts = products.filter(product => !product.checked);
    setProducts(updatedProducts);
    saveProducts(updatedProducts); // Salva i prodotti aggiornati nel localStorage
  };

  // Usa useEffect per caricare i prodotti quando il componente viene montato
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Lista della Spesa</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nome Prodotto"
          required
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="fridge">Frigo</option>
          <option value="freezer">Congelatore</option>
          <option value="beverage">Bevande</option>
          <option value="cleaning">Detersivi</option>
          <option value="sweets">Dolci</option>
          <option value="savory">Salati</option>
          <option value="fruit">Frutta</option>
        </select>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrizione"
        />
        <button type="submit">Aggiungi Prodotto</button>
      </form>

      <div className={styles.buttonContainer}>
        <button onClick={handleDeleteSelected}>Cancella Selezionati</button>
        <button onClick={handleMoveToInventory}>Segna come Acquistato</button>
      </div>

      <ol>
        {products.map((product, index) => (
          <li key={index} style={{ backgroundColor: getCategoryColor(product.category) }}>
            <input
              type="checkbox"
              checked={product.checked}
              onChange={() => {
                const updatedProducts = [...products];
                updatedProducts[index].checked = !updatedProducts[index].checked;
                setProducts(updatedProducts);
                saveProducts(updatedProducts); // Salva i prodotti aggiornati nel localStorage
              }}
            />
            {product.name} (Scadenza: {product.expiryDate}) - {product.description}
          </li>
        ))}
      </ol>
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

export default ShoppingList;
