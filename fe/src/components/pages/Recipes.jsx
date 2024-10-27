import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Recipes.module.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Stato per il termine di ricerca
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Stato per la ricetta selezionata
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per il modal

  const fetchRecipes = async (query) => {
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY; // Assicurati che la chiave API sia configurata correttamente
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: API_KEY,
          query: query, // Aggiungi il termine di ricerca
        },
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = () => {
    fetchRecipes(searchQuery); // Chiama la funzione di fetch con il termine di ricerca
  };

  useEffect(() => {
    fetchRecipes(''); // Fetch ricette iniziali senza query
  }, []);

  const addMyRecipe = () => {
    if (recipeName && recipeInstructions) {
      const newRecipe = { name: recipeName, instructions: recipeInstructions };
      setMyRecipes([...myRecipes, newRecipe]);
      setRecipeName('');
      setRecipeInstructions('');
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className={styles.recipesContainer}>
      <h1 className={styles.recipesTitle}>Ricette</h1>

      {/* Modulo per la ricerca */}
      <input
        className={styles.recipesInput}
        type="text"
        placeholder="Cerca una ricetta..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Aggiorna lo stato del termine di ricerca
      />
      <button className={styles.recipesButton} onClick={handleSearch}>Cerca</button>

      {/* Modulo per inserire una nuova ricetta */}
      <h2 className={styles.recipesSubtitle}>Aggiungi la tua Ricetta</h2>
      <input
        className={styles.recipesInput}
        type="text"
        placeholder="Nome della ricetta"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <textarea
        className={styles.recipesTextarea}
        placeholder="Istruzioni della ricetta"
        value={recipeInstructions}
        onChange={(e) => setRecipeInstructions(e.target.value)}
      />
      <button className={styles.recipesButton} onClick={addMyRecipe}>Aggiungi Ricetta</button>

      {/* Elenco delle ricette trovate */}
      <h2 className={styles.recipesSubtitle}>Ricette Trovate</h2>
      <ul className={styles.recipesList}>
        {recipes.map((recipe) => (
          <li className={styles.recipesListItem} key={recipe.id} onClick={() => openModal(recipe)}>
            <h3>{recipe.title}</h3>
            <img className={styles.recipesImage} src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`} alt={recipe.title} />
            <a className={styles.recipesLink} href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">Visualizza Ricetta</a>
          </li>
        ))}
      </ul>

      {/* Elenco delle ricette personali */}
      <h2 className={styles.recipesSubtitle}>Le Tue Ricette</h2>
      <ul className={styles.recipesList}>
        {myRecipes.map((myRecipe, index) => (
          <li className={styles.recipesListItem} key={index}>
            <h3>{myRecipe.name}</h3>
            <p>{myRecipe.instructions}</p>
          </li>
        ))}
      </ul>

      {/* Modal per i dettagli della ricetta */}
      {isModalOpen && selectedRecipe && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{selectedRecipe.title}</h2>
            <img className={styles.recipesImage} src={`https://spoonacular.com/recipeImages/${selectedRecipe.id}-312x231.jpg`} alt={selectedRecipe.title} />
            <a className={styles.recipesLink} href={selectedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer">Visualizza Ricetta</a>
            {/* Aggiungi ulteriori dettagli della ricetta qui */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;


