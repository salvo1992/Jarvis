import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Assistant from './components/pages/Assistant';
import PersonalDietPlanner from './components/pages/PersonalDietPlanner';
import Notes from './components/pages/Notes';
import Recipes from './components/pages/Recipes';
import ShoppingList from './components/pages/ShoppingList';
import HomeInventory from './components/pages/HomeInventory';
import Help from './components/pages/Help';
import Logout from './components/pages/Logout';
import Settings from './components/pages/Settings';
import styles from './App.module.css'; // Assicurati di importare il tuo CSS
import IngredientsPage from './components/ingrdients/ingredientsPage';
import AccountPage from './components/pages/AccountPage';
import ProfilePage from './components/pages/ProfilePage';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className={styles.navbarContainer}>
            <Navbar />
          </div>
          <main className={styles['main-content']}> {/* Usa le parentesi quadre per il nome con trattino */}
            <div className={styles.container}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/login" element={<AccountPage />} /> {/* Aggiungi la nuova pagina */}
                <Route path="/profile" element={<ProfilePage />} /> {/* Aggiungi la nuova pagina */}
                <Route path="/PersonalDietPlanner" element={<PersonalDietPlanner />} />
                <Route path="/IngredientsPage" element={<IngredientsPage />} /> {/* Aggiungi la nuova pagina */}
                <Route path="/notes" element={<Notes />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
                <Route path="/home-inventory" element={<HomeInventory />} />
                <Route path="/help" element={<Help />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;



