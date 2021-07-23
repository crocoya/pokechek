import { Button } from '@material-ui/core';
import React from 'react';
import Header from '../components/header/Header';
import PokemonList from '../components/pokemon-list/PokemonList';
import SharePokemon from '../components/share-pokemon/SharePokemon';
import { useAuth } from '../services/firebase/Context';
import './style/HomePage.css';

export default function HomePage() {
  const { currentUser } = useAuth();
  const [openForm, setOpenForm] = React.useState(false);

  return (
    <div className='home__container'>
      <Header />
      {currentUser ? (
        <section className='if-user-logged__container'>
          <h1 className='dresseur__name'>
            {currentUser && 'Bienvenue ' + currentUser.pseudo}
          </h1>
          {openForm ? (
            <SharePokemon setOpenForm={setOpenForm} />
          ) : (
            <Button
              className='create-pokemon'
              style={{ marginTop: '2rem' }}
              variant='contained'
              color='primary'
              onClick={() => setOpenForm(true)}
            >
              Ajoute un nouveau Pokémon
            </Button>
          )}
        </section>
      ) : null}

      <PokemonList />
    </div>
  );
}
