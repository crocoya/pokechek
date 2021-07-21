import React from 'react';
import axios from 'axios';
import './style/PokemonList.css';
import PokemonItem from '../pokemon-item/PokemonItem';
import PokemonPagination from '../pokemon-pagination/PokemonPagination';
import { getPokemon } from '../../utils/pokemon';

export default function PokemonList() {
  const [showPokemon, setShowPokemon] = React.useState([]);
  const [currentPageUrl, setCurrentPageUrl] = React.useState(
    'https://pokeapi.co/api/v2/pokemon/'
  );
  const [nextPageUrl, setNextPageUrl] = React.useState();
  const [prevPageUrl, setPrevPageUrl] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setShowPokemon(res.data.results.map((p) => p.name));
        loadingPokemon(res.results);
      })
      .catch((err) => console.log(err));

    return () => cancel();
  }, [currentPageUrl]);

  const loadingPokemon = async (data) => {
    let _showPokemon = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setShowPokemon(_showPokemon);
  };

  function nextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function prevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return 'Loading...';

  return (
    <div className='pokemon__container'>
      <PokemonPagination nextPage={nextPage} prevPage={prevPage} />
      <PokemonItem showPokemon={showPokemon} />
    </div>
  );
}
