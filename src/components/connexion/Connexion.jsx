import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../services/firebase/Context';
import UserService from '../../services/user-service';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import './style/Connexion.css';

export default function Connexion() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const { signInWithEmail } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signInWithEmail(
        emailRef.current.value,
        passwordRef.current.value
      ).then((data) => {
        UserService.getUser(data.user.uid).then((user) => {
          UserService.logUser(user);
          console.log('user', UserService.user);
          history.push('/');
        });
      });
    } catch (err) {
      setError('Impossible de se connecter');
    }

    setLoading(false);
  }
  return (
    <div className='connexion__container'>
      <Container>
        <Typography component='h1' variant='h5'>
          Déjà client ?
        </Typography>

        <form className='pokemon__form' onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Adresse email'
            name='email'
            autoComplete='email'
            autoFocus
            ref={emailRef}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Mot de passe'
            type='password'
            id='password'
            autoComplete='current-password'
            ref={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Se souvenir de moi'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Se connecter
          </Button>
          {error && <div className='pokemon__error'>{error}</div>}
          <Grid container className='pokemon__links'>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {'Nouveau client ? Créer ton compte'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
