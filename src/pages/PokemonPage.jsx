import React from 'react';
import Header from '../components/header/Header';
import PokemonDetail from '../components/pokemon-detail/PokemonDetail';

export default function PokemonPage() {
  return (
    <div className='pokemon__container'>
      <Header />
      <PokemonDetail />
    </div>
  );
}
