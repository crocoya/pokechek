import React from 'react';
import firebase from '../../services/firebase/FirebaseConfig';
import NewPokemonCard from '../new-pokemon-card/NewPokemonCard';
import './style/NewPokemonList.css';

export default function NewPokemonList() {
  const [items, setItem] = React.useState([]);

  React.useEffect(() => {
    firebase
      .database()
      .ref('pokemon-list')
      .on('value', (snap) => {
        const data = [];
        snap.forEach((s) => {
          data.push(s.val());
        });
        setItem(data);
      });
  }, []);
  return (
    <>
      <div className='new-pokemon__container'>
        <div className='new-pokemon__items nav'>
          {items.map(({ id, name, img, type }) => (
            <NewPokemonCard
              key={name + id + Math.random() * 100}
              name={name}
              img={img}
              type={type}
            />
          ))}
        </div>
      </div>
    </>
  );
}
