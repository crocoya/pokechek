import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../services/firebase/Context';
import UserService from '../../services/user-service';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import './style/Inscription.css';

export default function Inscription() {
  const pseudoRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();

  const { signUpWithEmail } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Le mot de passe ne correspond pas');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signUpWithEmail(
        emailRef.current.value,
        passwordRef.current.value
      ).then((data) => {
        UserService.createUserInDatabase(
          data.user.uid,
          pseudoRef.current.value,
          emailRef.current.value
        ).then(() => history.push('/'));
      });
    } catch (err) {
      setError('Création du compte impossible');
    }

    setLoading(false);
  }
  return (
    <div className='inscription__container'>
      <Container>
        <Typography component='h1' variant='h5'>
          Nouveau client ?
        </Typography>

        <form className='pokemon__form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='pseudo'
                label='Pseudo'
                autoComplete='pseudo'
                autoFocus
                ref={pseudoRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Adresse email'
                autoComplete='email'
                autoFocus
                ref={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='password'
                label='Mot de passe'
                autoComplete='password'
                autoFocus
                ref={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='password'
                label='Confirmer mot de passe'
                autoComplete='password'
                autoFocus
                ref={passwordConfirmRef}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='Je veux recevoir des mises à jour par email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Créer mon compte
          </Button>
          {error && <div className='pokemon__error'>{error}</div>}
          <Grid container justifyContent='flex-end' className='pokemon__links'>
            <Grid item>
              <Link href='#' variant='body2'>
                {'Déjà client ? Connecte-toi'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
