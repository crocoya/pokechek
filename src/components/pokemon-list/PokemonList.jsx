import React from 'react';
import './style/PokemonList.css';
import PokemonPagination from '../pokemon-pagination/PokemonPagination';
import PokemonCard from '../pokemon-card/PokemonCard';
import { getAllPokemon, getPokemon } from '../../utils/pokemon';

export default function PokemonList() {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [nextUrl, setNextUrl] = React.useState('');
  const [prevUrl, setPrevUrl] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  React.useEffect(() => {
    async function fetchData() {
      let res = await getAllPokemon(initialUrl);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      await loadingPokemon(res.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _showPokemon = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_showPokemon);
  };

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <PokemonPagination nextPage={nextPage} prevPage={prevPage} />
      <div className='pokemon__container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='pokemon__items nav'>
              {pokemonData.map((pokemon, i) => {
                return <PokemonCard key={i} pokemon={pokemon} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
