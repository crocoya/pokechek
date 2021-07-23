import React from 'react';

export default function NewPokemonCard({ id, name, img, type }) {
  return (
    <div className='pokemon__card noselect' key={id}>
      <div className='card__img'>
        <img src={img} alt='' />
      </div>
      <div className='card__name'>
        <h3>{name}</h3>
      </div>
      <div className='card__types'>
        <div className='card__type'>{type}</div>
      </div>
    </div>
  );
}
