import React from 'react';
import './style/PokemonItem.css';

export default function PokemonItem({ showPokemon }) {
  return (
    <div>
      {showPokemon.map(p => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}
