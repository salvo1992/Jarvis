import React, { useState } from 'react';
import axios from 'axios';
import styles from './PersonalDietPlanner.module.css';

const PersonalDietPlanner = () => {
  const [meals, setMeals] = useState([]);
  const [calories, setCalories] = useState(2000);
  const [diet, setDiet] = useState(''); // Ad esempio, 'vegetariano'
  const [exclude, setExclude] = useState(''); // Ingredienti da escludere
  const [error, setError] = useState(null); // Stato per gestire errori

  const fetchMealPlan = async () => {
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY; // Assicurati che la chiave sia impostata correttamente
    const timeFrame = 'day'; // Cambia in 'week' se desideri un piano settimanale

    try {
      const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate`, {
        params: {
          timeFrame,
          targetCalories: calories,
          diet: diet,
          exclude: exclude,
          apiKey: API_KEY,
        },
      });

      setMeals(response.data.meals);
      setError(null); // Reset error on successful fetch
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setError('Errore nel recupero del piano alimentare. Per favore, riprova.'); // Gestione dell'errore
    }
  };

  return (
    <div className={styles.container}>
      <h1>Generatore di Piano Alimentare</h1>
      <label>
        Obiettivo Calorico:
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </label>
      <label>
        Dieta (es. vegetariano):
        <input
          type="text"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
      </label>
      <label>
        Escludi (es. crostacei, olive):
        <input
          type="text"
          value={exclude}
          onChange={(e) => setExclude(e.target.value)}
        />
      </label>
      <button onClick={fetchMealPlan}>Genera Piano Alimentare</button>

      {error && <p className={styles.error}>{error}</p>}

      <h2>Pasti Generati</h2>
      {meals.length > 0 ? (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id}>
              <h3>{meal.title}</h3>
              <img src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`} alt={meal.title} />
              <p>Pronto in: {meal.readyInMinutes} minuti</p>
              <p>Porzioni: {meal.servings}</p>
              <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">Ricetta</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessun pasto generato.</p>
      )}
    </div>
  );
};

export default PersonalDietPlanner;
