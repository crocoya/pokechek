import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5rem',
  },
}));

export default function PokemonPagination({ nextPage, prevPage }) {
  const classes = useStyles();

  return (
    <div className={`pagination__container ${classes.container}`}>
      {prevPage && (
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<NavigateBeforeIcon />}
          onClick={prevPage}
        >
          Précédent
        </Button>
      )}
      {prevPage && (
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<NavigateNextIcon />}
          onClick={nextPage}
        >
          Suivant
        </Button>
      )}
    </div>
  );
}
