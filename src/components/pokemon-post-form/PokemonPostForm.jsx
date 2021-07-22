import {
  Avatar,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import React from 'react';
import './style/PokemonPostForm.css';

export default function PokemonPostForm() {
  const [loading] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const handleChange = function loadFile(e) {
    if (e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFile(file);
    }
  };

  return (
    <div className='pokemon-post-form__container'>
      <Container className='pokemon-post__container'>
        <Typography
          component='h1'
          variant='h5'
          style={{ padding: '0 .5rem 0 .5rem' }}
        >
          Ajoute un pokémon personnalisé !
        </Typography>

        <form className='pokemon-post__form'>
          <input
            type='file'
            onChange={handleChange}
            id='upload'
            accept='image/*'
            style={{ display: 'none' }}
          />
          <label htmlFor='upload'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            >
              <Avatar
                id='avatar'
                src={file}
                style={{
                  width: '60px',
                  height: '60px',
                }}
              >
                <ImageSearchIcon />
              </Avatar>
            </IconButton>
          </label>
          <label htmlFor='avatar' />
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Ajouter
          </Button>
        </form>
      </Container>
    </div>
  );
}
