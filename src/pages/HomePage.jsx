import React from 'react';
import Header from '../components/header/Header';
import PokemonList from '../components/pokemon-list/PokemonList';
import PokemonPostForm from '../components/pokemon-post-form/PokemonPostForm';
import { useAuth } from '../services/firebase/Context';
import './style/HomePage.css';

export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className='home__container'>
      <Header />
      {currentUser ? (
        <section className='if-user-logged__container'>
          <h1 className='dresseur__name'>
            {currentUser && 'Bienvenue ' + currentUser.pseudo}
          </h1>
          <PokemonPostForm />
        </section>
      ) : null}
      <PokemonList />
    </div>
  );
}
