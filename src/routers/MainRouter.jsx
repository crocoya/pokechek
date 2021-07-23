import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountPage from '../pages/AccountPage';
import HomePage from '../pages/HomePage';
import NewPokemonPage from '../pages/NewPokemonPage';

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/account' component={AccountPage} />
        <Route exact path='/new-pokemon' component={NewPokemonPage} />
      </Switch>
    </Router>
  );
}
