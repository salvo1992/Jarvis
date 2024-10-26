// src/components/common/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Importa il componente Link
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Jarvis</h1>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.link}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/assistant" className={styles.link}>Assistant</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/recipes" className={styles.link}>Recipes</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/calendar" className={styles.link}>Calendar</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/account" className={styles.link}>Account</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/settings" className={styles.link}>Settings</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/help" className={styles.link}>Help</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/logout" className={styles.link}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

