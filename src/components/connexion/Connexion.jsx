import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../services/firebase/Context';
import UserService from '../../services/user-service';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import './style/Connexion.css';

export default function Connexion({ setVisibleForm }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signInWithEmail } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signInWithEmail(email, password).then((data) => {
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          {error && (
            <Alert severity='error' className='pokemon__error'>
              {error}
            </Alert>
          )}
          <Grid container className='pokemon__links'>
            <Grid item xs>
              <Link
                href='#'
                variant='body2'
                onClick={() => setVisibleForm('reset-password')}
              >
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href='#'
                variant='body2'
                onClick={() => setVisibleForm('inscription')}
              >
                {'Nouveau client ? Créer ton compte'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
