import React, { useState } from 'react';
import styles from './IngredientsPage.module.css';
import ingredienti from '../../ingredienti.json'; // Importa gli ingredienti iniziali

const IngredientsPage = () => {
  const [ingredientList, setIngredientList] = useState(ingredienti);
  const [showModal, setShowModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    category: '',
    description: '',
    unit: '',
    origin: '',
    allergens: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = () => {
    setIngredientList([...ingredientList, newIngredient]);
    setNewIngredient({
      name: '',
      category: '',
      description: '',
      unit: '',
      origin: '',
      allergens: []
    });
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista degli Ingredienti</h1>
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        Aggiungi Ingrediente
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Aggiungi un nuovo ingrediente</h2>
            <form className={styles.form}>
              <input
                type="text"
                name="name"
                value={newIngredient.name}
                onChange={handleChange}
                placeholder="Nome"
                className={styles.input}
              />
              <input
                type="text"
                name="category"
                value={newIngredient.category}
                onChange={handleChange}
                placeholder="Categoria"
                className={styles.input}
              />
              <textarea
                name="description"
                value={newIngredient.description}
                onChange={handleChange}
                placeholder="Descrizione"
                className={styles.textarea}
              />
              <input
                type="text"
                name="unit"
                value={newIngredient.unit}
                onChange={handleChange}
                placeholder="Unità di misura"
                className={styles.input}
              />
              <input
                type="text"
                name="origin"
                value={newIngredient.origin}
                onChange={handleChange}
                placeholder="Origine"
                className={styles.input}
              />
              <input
                type="text"
                name="allergens"
                value={newIngredient.allergens.join(', ')}
                onChange={(e) =>
                  setNewIngredient((prev) => ({
                    ...prev,
                    allergens: e.target.value.split(',').map((item) => item.trim())
                  }))
                }
                placeholder="Allergeni (separati da virgola)"
                className={styles.input}
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className={styles.submitButton}
              >
                Aggiungi
              </button>
            </form>
          </div>
        </div>
      )}

      <ul className={styles.ingredientList}>
        {ingredientList.map((ingredient, index) => (
          <li key={index} className={styles.ingredientItem}>
            <h3>{ingredient.name}</h3>
            <p>{ingredient.description}</p>
            <p>Categoria: {ingredient.category}</p>
            <p>Unità: {ingredient.unit}</p>
            <p>Origine: {ingredient.origin}</p>
            <p>Allergeni: {ingredient.allergens.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsPage;
