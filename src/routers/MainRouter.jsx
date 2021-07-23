import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountPage from '../pages/AccountPage';
import HomePage from '../pages/HomePage';
import NewPokemon from '../pages/NewPokemon';

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/account' component={AccountPage} />
        <Route exact path='new-pokemon' component={NewPokemon} />
      </Switch>
    </Router>
  );
}
