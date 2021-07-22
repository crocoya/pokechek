import React from 'react';
import { useAuth } from '../../services/firebase/Context';
import UserService from '../../services/user-service';
import { Button, Container, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

export default function ResetPassword({ setVisibleForm }) {
  const [email, setEmail] = React.useState('');

  const { resetPassword } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
    } catch (err) {
      setError('Réinitialisation impossible');
    }

    setLoading(false);
  }

  return (
    <div className='reset-password__container'>
      <Container>
        <Typography component='h1' variant='h5'>
          Mot de passe oublié ?
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Réinitialiser mon mot de passe
          </Button>
          {error && (
            <Alert severity='error' className='pokemon__error'>
              {error}
            </Alert>
          )}
        </form>
      </Container>
    </div>
  );
}
