import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useAuth } from '../../services/firebase/Context';
import './style/PokemonPostForm.css';

export default function PokemonPostForm() {
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [validate, setValidate] = React.useState('');
  const [error, setError] = React.useState('');

  const nameRef = React.useRef();
  const imageRef = React.useRef();
  const typeRef = React.useRef();

  const { addPokemon } = useAuth();

  const handleChange = function loadFile(e) {
    if (e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFile(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await addPokemon(
        nameRef.current.value,
        imageRef.current.value,
        typeRef.current.value
      );
      setValidate('Votre Pokémon a bien été ajouter');
    } catch (err) {
      setError("Impossible d'ajouter un pokemon");
    }

    setLoading(false);
  }

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

        <form className='pokemon-post__form' onSubmit={handleSubmit}>
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
                required
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
          <TextField
            variant='outlined'
            margin='normal'
            id='type'
            label='Type du Pokémon'
            name='type'
            autoComplete='type'
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
          {validate && (
            <Alert severity='success' className='pokemon__error'>
              {validate}
            </Alert>
          )}
          {error && (
            <Alert severity='error' className='pokemon__error'>
              {error}
            </Alert>
          )}
          <Grid container justifyContent='center' className='pokemon__links'>
            <Grid item>
              <Link href='#' variant='body2'>
                {'Afficher les pokémons personnalisés'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
