import React from 'react';
import Header from '../components/header/Header';
import Connexion from '../components/connexion/Connexion';
import Inscription from '../components/inscription/Inscription';
import './style/AccountPage.css';
import ResetPassword from '../components/reset-password/ResetPassword';

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
        {visibleForm === 'reset-password' && (
          <ResetPassword setVisibleForm={setVisibleForm} />
        )}
      </main>
    </div>
  );
}
