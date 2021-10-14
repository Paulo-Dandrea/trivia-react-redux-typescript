import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Settings from './pages/settings';

import Feedback from './pages/feedback';
import Ranking from './components/ranking';


import './App.css';
import logo from './trivia.png';
import Game from './pages/game';

export default function App() {
  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="main-site">
        <Switch>
          <Route path="/feedback" component={Feedback} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/game" component={Game} />
          <Route path="/settings" component={Settings} />
          <Route exact path="/" component={Login} />
        </Switch>
      </section>
    </div>
  );
}
