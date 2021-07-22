import React from 'react';
import './style/PokemonCard.css';

export default function PokemonCard({ pokemon, i }) {
  return (
    <div className='pokemon__card noselect' key={i}>
      <div className='card__img'>
        <img
          src={
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.other['official-artwork'].front_default
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
      {/*<div className='card__info'>
        <div className='card__data card__data--weight'>
          <p className='title'>Weight</p>
          <p>{pokemon.weight}</p>
        </div>

        <div className='card__data card__data--height'>
          <p className='title'>Height</p>
          <p>{pokemon.height}</p>
        </div>
      </div>

      <div className='card__data card__data--ability'>
        <p className='title'>Ability</p>
        <p>{pokemon.abilities[0].ability.name}</p>
      </div>*/}
    </div>
  );
}
