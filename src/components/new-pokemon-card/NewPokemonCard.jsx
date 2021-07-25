import React from 'react';

export default function NewPokemonCard({ id, name, img, type }) {
  return (
    <div className='new-pokemon__card noselect' key={id}>
      <div className='new-card__img'>
        <img src={img} alt='' />
      </div>
      <div className='new-card__name'>
        <h3>{name}</h3>
      </div>
      <div className='new-card__types'>
        <div className='new-card__type'>{type}</div>
      </div>
    </div>
  );
}
