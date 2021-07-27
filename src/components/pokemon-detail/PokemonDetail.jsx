import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style/PokemonDetail.css';

export default function PokemonDetail() {
  const [pokemonData, setPokemonData] = React.useState();
  const { id: pokemonId } = useParams();
  const initialUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

  React.useEffect(() => {
    const getData = async () => {
      await axios.get(initialUrl).then((res) => {
        setPokemonData(res.data);
      });
    };
    getData();
  }, [initialUrl]);

  if (!pokemonData) {
    return null;
  }
  const { id, name, sprites, types, abilities } = pokemonData;
  return (
    <>
      <div className='pokemon-detail__container' key={id}>
        <div className='pokemon__content-primary'>
          <div className='pokemon-name'>{name}</div>
          <div className='pokemon-icon'>
            <img
              src={
                sprites.other.dream_world.front_default ||
                sprites.other['official-artwork'].front_default ||
                sprites.front_default
              }
              alt=''
            />
          </div>
          <div className='pokemon-types'>
            {types.map((type, i) => {
              return (
                <div className={`card__type ${type.type.name}`} key={i}>
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className='pokemon__content-secondary'>
          <div className='pokemon-abilities'>
            <span>{abilities[0].ability.name}</span>
            <span>{abilities[1].ability.name}</span>
          </div>
        </div>
      </div>
    </>
  );
}
