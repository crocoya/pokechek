import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { Link } from 'react-router-dom';
import firebaseConfig from '../../services/firebase/FirebaseConfig';
import './style/SharePokemon.css';

const SharePokemon = ({ setOpenForm }) => {
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
    <div className='pokemon-post-form__container noselect'>
      <Container className='pokemon-post__container noselect'>
        <Typography
          component='h1'
          variant='h5'
          className='pokemon__title noselect'
          style={{ padding: '0 .5rem 0 .5rem' }}
        >
          Ajoute un pokémon personnalisé
        </Typography>

        <form className='pokemon-post__form noselect' onSubmit={add}>
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
          <p style={{ margin: '1rem 0 1rem 0', color: '#849ba7' }}>
            <b>Ajoute une image en format SVG</b>
            <br />
            ou avec un fond blanc de préférence
          </p>
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

          <Grid
            container
            justifyContent='center'
            className='pokemon__links'
            style={{ marginTop: '1rem' }}
          >
            <Grid item>
              <Link
                to='/new-pokemon'
                variant='body2'
                style={{ color: '#3f50b5', textDecoration: 'underline' }}
              >
                {'Afficher les pokémons personnalisés'}
              </Link>
            </Grid>
          </Grid>
          <Button
            style={{ marginTop: '1rem' }}
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
