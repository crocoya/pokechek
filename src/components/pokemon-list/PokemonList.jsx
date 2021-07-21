import React from 'react';
import axios from 'axios';
import './style/PokemonList.css';
import PokemonItem from '../pokemon-item/PokemonItem';

export default function PokemonList() {
  const [showPokemon, setShowPokemon] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151').then(res => {
      setShowPokemon(res.data.results.map(p => p.name));
  }).catch(err => console.log(err));
  }, [])
  return (
    <div className="pokemon__container">
      <PokemonItem showPokemon={showPokemon} />
    </div>
  );
}
