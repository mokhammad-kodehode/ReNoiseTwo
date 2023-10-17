import React from 'react';
import styles from './footer.module.css'; 
import Playeer from '../playeer/playeer';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Playeer/>
    </footer>
  );
};

export default Footer;