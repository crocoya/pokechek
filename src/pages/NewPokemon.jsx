import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/header/Header';
import { useAuth } from '../services/firebase/Context';

export default function NewPokemon() {
  const { currentUser, addPokemon } = useAuth();

  return (
    <div className='new-pokemon__container'>
      <Header />
      {currentUser ? (
        <div className='pokemon__container'>
          <div className='pokemon__items nav'>
            {addPokemon.map((pokemon, i) => {
              return (
                <div className='new-pokemon__card'>
                  <h1>{pokemon.name}</h1>
                  <img src={pokemon.image} alt='' />
                  <div>{pokemon.type}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </div>
  );
}
