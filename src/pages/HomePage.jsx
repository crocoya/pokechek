import React from 'react';
import Header from '../components/header/Header';
import PokemonList from '../components/pokemon-list/PokemonList';
import './style/HomePage.css';

export default function HomePage() {
  return (
    <div className='home__container'>
      <Header />
      <PokemonList />
    </div>
  );
}
