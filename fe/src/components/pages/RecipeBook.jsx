import React, { useState, useEffect } from "react";
import styles from "./RecipeBook.module.css";

const RecipeBook = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    procedure: "",
    notes: "",
    prepTime: "",
    image: null,
  });
  const [search, setSearch] = useState("");
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = [
    { name: "Dolci", image: "../../assets/desserts.jpg" },
    { name: "Pasta", image: "../../assets/pasta.jpg" },
    { name: "Pane", image: "../../assets/bread.jpg" },
    { name: "Secondi di carne", image: "../../assets/meat.jpg" },
    { name: "Secondi di pesce", image: "../../assets/fish.jpg" },
    { name: "Secondi di verdure", image: "../../assets/vegetables.jpg" },
    { name: "Antipasti", image: "../../assets/appetizers.jpg" },
    { name: "Cocktail", image: "../../assets/cocktail.jpg" },
  ];

  // Carica ricette salvate da localStorage
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

  // Salva ricette su localStorage
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setRecipeData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipeData.category) {
      alert("Seleziona una categoria!");
      return;
    }

    if (editingRecipe) {
      setRecipes((prev) =>
        prev.map((r) =>
          r.id === editingRecipe.id ? { ...recipeData, id: r.id } : r
        )
      );
      setEditingRecipe(null);
    } else {
      const newRecipe = { ...recipeData, id: Date.now() };
      setRecipes((prev) => [...prev, newRecipe]);
    }

    setRecipeData({
      title: "",
      category: "",
      description: "",
      ingredients: "",
      procedure: "",
      notes: "",
      prepTime: "",
      image: null,
    });
    setSelectedRecipe(null);
  };

  const handleEdit = (recipe) => {
    setRecipeData(recipe);
    setEditingRecipe(recipe);
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa ricetta?")) {
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedRecipe(null);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.recipeBook}>
      <h1 className={styles.title}>Ricettario Personale</h1>

      {/* Barra di ricerca */}
      <input
        type="text"
        placeholder="Cerca una ricetta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />

      {/* Form per aggiungere/modificare ricette */}
      {(editingRecipe || selectedCategory) && (
        <form onSubmit={handleSubmit} className={styles.recipeForm}>
          <h2>{editingRecipe ? "Modifica Ricetta" : "Aggiungi Ricetta"}</h2>
          <input
            type="text"
            name="title"
            placeholder="Titolo della ricetta"
            value={recipeData.title}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <select
            name="category"
            value={recipeData.category}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="">Seleziona Categoria</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Descrizione"
            value={recipeData.description}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          ></textarea>
          <textarea
            name="ingredients"
            placeholder="Ingredienti (uno per riga)"
            value={recipeData.ingredients}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          ></textarea>
          <textarea
            name="procedure"
            placeholder="Procedimento"
            value={recipeData.procedure}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          ></textarea>
          <input
            type="text"
            name="prepTime"
            placeholder="Tempo di preparazione"
            value={recipeData.prepTime}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            {editingRecipe ? "Salva Modifiche" : "Aggiungi Ricetta"}
          </button>
        </form>
      )}

      {/* Categorie */}
      {!selectedCategory && (
        <div className={styles.categories}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={styles.categoryCard}
              onClick={() => handleCategorySelect(cat.name)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className={styles.categoryImage}
              />
              <h2>{cat.name}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Ricette */}
      {selectedCategory && !selectedRecipe && (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className={styles.backButton}
          >
            Torna alle categorie
          </button>
          <h2 className={styles.categoryTitle}>{selectedCategory}</h2>
          <div className={styles.recipeList}>
            {filteredRecipes
              .filter((recipe) => recipe.category === selectedCategory)
              .map((recipe) => (
                <div
                  key={recipe.id}
                  className={styles.recipeCard}
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  {recipe.image && (
                    <img
                      src={URL.createObjectURL(recipe.image)}
                      alt={recipe.title}
                      className={styles.recipeImage}
                    />
                  )}
                  <h3>{recipe.title}</h3>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Dettaglio della ricetta */}
      {selectedRecipe && (
        <div>
          <button
            onClick={() => setSelectedRecipe(null)}
            className={styles.backButton}
          >
            Torna alle ricette
          </button>
          <h2>{selectedRecipe.title}</h2>
          <p><strong>Categoria:</strong> {selectedRecipe.category}</p>
          <p><strong>Descrizione:</strong> {selectedRecipe.description}</p>
          <p><strong>Ingredienti:</strong></p>
          <ul>
            {selectedRecipe.ingredients.split("\n").map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <p><strong>Procedura:</strong> {selectedRecipe.procedure}</p>
          <button
            onClick={() => handleEdit(selectedRecipe)}
            className={styles.editButton}
          >
            Modifica
          </button>
          <button
            onClick={() => handleDelete(selectedRecipe.id)}
            className={styles.deleteButton}
          >
            Elimina
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeBook;

