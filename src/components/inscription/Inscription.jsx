import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../services/firebase/Context';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import './style/Inscription.css';
import Alert from '@material-ui/lab/Alert';

export default function Inscription({ setVisibleForm }) {
  const [pseudo, setPseudo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const { signUpWithEmail } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    console.log(email);
    console.log(password);
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError('Le mot de passe ne correspond pas');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signUpWithEmail(email, password, pseudo).then((data) => {
        history.push('/');
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
                name='pseudo'
                label='Pseudo'
                autoComplete='pseudo'
                onChange={(e) => setPseudo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='emailUp'
                name='email'
                label='Adresse email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                id='passwordUp'
                type='password'
                label='Mot de passe'
                autoComplete='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                id='passwordConfirmUp'
                type='password'
                label='Confirmer mot de passe'
                autoComplete='password'
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
          {error && (
            <Alert severity='error' className='pokemon__error'>
              {error}
            </Alert>
          )}
          <Grid container justifyContent='flex-end' className='pokemon__links'>
            <Grid item>
              <Link
                href='#'
                variant='body2'
                onClick={() => setVisibleForm('connexion')}
              >
                {'Déjà client ? Connecte-toi'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
