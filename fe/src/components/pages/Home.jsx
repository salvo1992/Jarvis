import React from 'react';
import styles from './Home.module.css';
import inventoryImage from '../assets/inventory.jpg';
import recipesImage from '../assets/recipes.jpg';
import shoppingImage from '../assets/shopping.jpg';
import chatbotImage from '../assets/chatbot.jpg';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Benvenuti nella nostra App di Ricette e Inventario</h1>
        <p>
          Organizza la tua cucina in modo intelligente! Con questa app, puoi
          gestire la tua lista della spesa, tenere sotto controllo l'inventario
          di casa, scoprire nuove ricette e ottenere aiuto dal nostro assistente
          virtuale.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.card}>
          <img src={inventoryImage} alt="Inventario di Casa" className={styles.image} />
          <div className={styles.cardContent}>
            <h2>Inventario di Casa</h2>
            <p>
              Tieni sempre sotto controllo gli articoli che hai in cucina. Con
              il nostro sistema di inventario, saprai sempre cosa c'è e cosa manca.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <img src={recipesImage} alt="Ricette" className={styles.image} />
          <div className={styles.cardContent}>
            <h2>Ricettario</h2>
            <p>
              Scopri deliziose ricette e crea piatti utilizzando gli ingredienti
              che hai già in casa. Il nostro ricettario è pensato per aiutarti a
              ridurre gli sprechi e migliorare la tua dieta.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <img src={shoppingImage} alt="Lista della Spesa" className={styles.image} />
          <div className={styles.cardContent}>
            <h2>Lista della Spesa</h2>
            <p>
              Pianifica facilmente la tua spesa settimanale. Dividi gli articoli
              per categoria e supermercato per rendere lo shopping più efficiente.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <img src={chatbotImage} alt="Chatbot Assistente" className={styles.image} />
          <div className={styles.cardContent}>
            <h2>Chatbot Assistente</h2>
            <p>
              Hai domande o hai bisogno di aiuto per organizzare la tua cucina?
              Il nostro chatbot è sempre disponibile per rispondere ai tuoi dubbi
              e darti consigli utili.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
