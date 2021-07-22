import React from 'react';
import Header from '../components/header/Header';
import Connexion from '../components/connexion/Connexion';
import './style/AccountPage.css';
import Inscription from '../components/inscription/Inscription';

export default function AccountPage() {
  const [visibleForm, setVisibleForm] = React.useState('connexion');
  return (
    <div className='account__container'>
      <Header />
      <main className='body__container'>
        {visibleForm === 'connexion' && (
          <Connexion setVisibleForm={setVisibleForm} />
        )}
        {visibleForm === 'inscription' && (
          <Inscription setVisibleForm={setVisibleForm} />
        )}
      </main>
    </div>
  );
}
