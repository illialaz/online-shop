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
import { connect } from 'react-redux'

class AppComponent extends React.Component {
  render = () => {
    const { showCartList } = this.props
    return (
      <>
        <Router>
          <NavBar />
          <main className="main">
            <Switch>
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:id" component={Product} />
              <Route exact path="/cart" component={Cart} />
              <Route path="*">
                <Redirect to="/products" />
              </Route>
            </Switch>
            {showCartList && <div className="shadow"></div>}
          </main>
        </Router>
      </>
    )
  }
}

const mapStoreToProps = (state) => {
  const { showCartList } = state.currency_cart
  return {
    showCartList,
  }
}

export const App = connect(mapStoreToProps)(AppComponent)
