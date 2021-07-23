import React from 'react';
import Header from '../components/header/Header';
import NewPokemonList from '../components/new-pokemon-list/NewPokemonList';

export default function NewPokemonPage() {
  const [visiblePokemon, setVisiblePokemon] = React.useState('showPokemons');

  return (
    <>
      <Header />
      {visiblePokemon === 'showPokemons' && (
        <div className='new-pokemon__container'>
          <div className='pokemon__container'>
            <div className='pokemon__items nav'>
              <NewPokemonList setVisiblePokemon={setVisiblePokemon} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
