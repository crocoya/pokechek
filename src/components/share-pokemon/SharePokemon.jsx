import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import firebaseConfig from '../../services/firebase/FirebaseConfig';
import './style/SharePokemon.css';

const SharePokemon = ({ setOpenForm, setVisiblePokemon }) => {
  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [validate, setValidate] = React.useState('');
  const [error, setError] = React.useState('');

  const add = React.useCallback(
    async (e) => {
      e.preventDefault();

      setError('');
      if (!file || !name || !type) {
        setError('Il manque le portrait de votre pokémon');
        return;
      }

      const storageRef = firebaseConfig.storage().ref();
      const fileRef = storageRef.child(file.name);
      const fileSrc = await fileRef.put(file);
      const img = await fileSrc.ref.getDownloadURL();

      const data = {
        file,
        name,
        type,
        img,
      };
      setValidate('Votre Pokémon a bien été ajouter');

      firebaseConfig.database().ref('pokemon-list').push(data);
    },
    [file, name, type]
  );
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

        <form className='pokemon-post__form' onSubmit={add}>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
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
                src={file ? URL.createObjectURL(file) : ''}
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setType(e.target.value)}
            id='type'
            label='Type du Pokémon'
            name='type'
            autoComplete='type'
            required
            fullWidth
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
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
              <Link
                href='/new-pokemon'
                variant='body2'
                onClick={() => setVisiblePokemon('showPokemons')}
              >
                {'Afficher les pokémons personnalisés'}
              </Link>
            </Grid>
          </Grid>
          <Button
            style={{ marginTop: '2rem' }}
            type='button'
            variant='contained'
            color='secondary'
            onClick={() => setOpenForm(false)}
          >
            Retour
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default SharePokemon;
