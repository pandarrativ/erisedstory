import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Account from './views/account'
import Phase from './views/phase'
import Home from './views/home'
import P1Lesson from './views/p1-lesson'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Account} exact path="/account" />
        <Route component={Phase} exact path="/phase" />
        <Route component={Home} exact path="/" />
        <Route component={P1Lesson} exact path="/p1-lesson" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
