import React from 'react';

export default function LoaderSalameche() {
  const useStyles = {
    clipPath: 'circle(38%)',
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
  };
  return (
    <div className='loader__container' style={containerStyles}>
      <h1>Loading ...</h1>
      <img
        src='https://media.giphy.com/media/yhfTY8JL1wIAE/source.gif'
        alt=''
        style={useStyles}
      />
    </div>
  );
}
