import {
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import './style/PokemonPostForm.css';

export default function PokemonPostForm() {
  const [type, setType] = React.useState('');
  const types = [
    'all types',
    'grass',
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  const handleChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className='pokemon-post-form__container'>
      <Container>
        <Typography component='h1' variant='h5'>
          Ajoute un pokémon personnalisé !
        </Typography>

        <form className='pokemon-post__form'>
          <TextField
            variant='outlined'
            margin='normal'
            id='name'
            label='Nom du Pokémon'
            name='name'
            autoComplete='name'
            required
            fullWidth
          />
          <Select
            labelId='demo-simple-select-label'
            id='select-types'
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={types} />
          </Select>
        </form>
      </Container>
    </div>
  );
}
