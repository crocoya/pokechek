import React from 'react';
import Header from '../components/header/Header';
import Connexion from '../components/connexion/Connexion';
import './style/AccountPage.css';
import Inscription from '../components/inscription/Inscription';

export default function AccountPage() {
  return (
    <div className='account__container'>
      <Header />
      <main className='body__container'>
        <Connexion />
        <Inscription />
      </main>
    </div>
  );
}
