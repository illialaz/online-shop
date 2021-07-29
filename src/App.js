import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Cart, Product, Products } from './pages'

import { NavBar } from './components/nav-bar'
import './styles.css'

export class App extends React.Component {
  render = () => {
    return (
      <>
        <NavBar />
        <main className="main">
          <Router>
            <Switch>
              <Route exact path="/products" component={Products} />
              <Route exact path="/product" component={Product} />
              <Route exact path="/cart" component={Cart} />
              <Route path="*">
                <Redirect to="/products" />
              </Route>
            </Switch>
          </Router>
          <div className="shadow"></div>
        </main>
      </>
    )
  }
}
