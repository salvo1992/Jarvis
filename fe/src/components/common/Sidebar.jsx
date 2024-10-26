// src/components/common/Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa il componente Link
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Stato per gestire apertura/chiusura

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Inverti lo stato
  };

  return (
    <div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <button className={`${styles.toggleButton} ${isOpen ? '' : styles.closed}`} onClick={toggleSidebar}>
          {/* La freccia è gestita tramite CSS */}
        </button>
        <ul className={styles.sideLinks}>
          <li className={styles.sideItem}>
            <Link to="/" className={styles.link}>Dashboard</Link>
          </li>
          <li className={styles.sideItem}>
            <Link to="/shopping-list" className={styles.link}>Shopping List</Link>
          </li>
          <li className={styles.sideItem}>
            <Link to="/home-inventory" className={styles.link}>Home Inventory</Link>
          </li>
          <li className={styles.sideItem}>
            <Link to="/notes" className={styles.link}>Notes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

