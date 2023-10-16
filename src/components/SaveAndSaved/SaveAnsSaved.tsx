import React from 'react';
import styles from './saved.module.css'; 

const Navbar: React.FC = () => {
  return (
    <div>
        <ul className={styles.items}>
            <li className={styles.item}>Video Sounds</li>
            <li className={styles.item}>Sounds</li>
            <li className={styles.item}>About Us</li>
        </ul>
    </div>
  );
};

export default Navbar;