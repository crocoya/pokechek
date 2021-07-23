import React from 'react';
import './style/PokemonCard.css';

export default function PokemonCard({ pokemon, i }) {
  return (
    <div className='pokemon__card noselect' key={i}>
      <div className='card__img'>
        <img
          src={
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default
          }
          alt=''
        />
      </div>
      <div className='card__name'>
        <h3>{pokemon.name}</h3>
      </div>
      <div className='card__types'>
        {pokemon.types.map((type, i) => {
          return (
            <div className={`card__type ${type.type.name}`} key={i}>
              {type.type.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
