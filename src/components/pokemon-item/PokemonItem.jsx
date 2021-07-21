import React from 'react';
import PokemonCard from '../pokemon-card/PokemonCard';
import './style/PokemonItem.css';

export default function PokemonItem({ showPokemon }) {
  return (
    <div>
      {showPokemon.map((pokemon, i) => {
        return <PokemonCard key={i} pokemon={pokemon} />;
      })}
    </div>
  );
}
