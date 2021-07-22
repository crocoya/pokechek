import React from 'react';
import Header from '../components/header/Header';
import PokemonList from '../components/pokemon-list/PokemonList';
import UserService from '../services/user-service';
import './style/HomePage.css';

export default function HomePage() {
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    UserService.getCurrentUser();
    setCurrentUser(UserService.user);
  }, []);
  return (
    <div className='home__container'>
      <Header />
      <h1>{currentUser && 'Bonjour ' + currentUser.pseudo}</h1>
      <PokemonList />
    </div>
  );
}
