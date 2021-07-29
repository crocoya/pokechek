import React from 'react';
import './style/PokemonList.css';
import PokemonPagination from '../pokemon-pagination/PokemonPagination';
import PokemonCard from '../pokemon-card/PokemonCard';
import { getAllPokemon, getPokemon } from '../../utils/pokemon';
import LoaderSalameche from '../loader/LoaderSalameche';

export default function PokemonList() {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [nextUrl, setNextUrl] = React.useState('');
  const [prevUrl, setPrevUrl] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
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
  }, [search]);

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
    setTimeout(async () => {
      let data = await getAllPokemon(nextUrl);
      await loadingPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setLoading(false);
    }, 800);
  };

  const prevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    setTimeout(async () => {
      let data = await getAllPokemon(prevUrl);
      await loadingPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setLoading(false);
    }, 800);
  };

  console.log(
    pokemonData
      .filter((data) => search === data.name)
      .map((pokemon) => pokemon.name)
  );
  return (
    <>
      <input type='search' onChange={(e) => setSearch(e.target.value)} />
      <PokemonPagination nextPage={nextPage} prevPage={prevPage} />
      <div className='pokemon__container'>
        {loading ? (
          <LoaderSalameche />
        ) : search ? (
          <div className='pokemon__items nav'>
            {pokemonData
              .filter((e) => e.name.includes(search))
              .map((pokemon, i) => {
                return <PokemonCard key={i} pokemon={pokemon} />;
              })}
          </div>
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
