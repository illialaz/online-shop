import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchProducts, fetchCurrency } from './store/actions'
import { Cart, Product, Products } from './pages'
import { NavBar } from './components/nav-bar'
import { ScrollToTop } from './components/scroll-to-top'
import './styles.css'

class AppComponent extends React.Component {
  componentDidMount() {
    const { fetchCurrency, fetchProducts } = this.props
    fetchProducts()
    fetchCurrency()
  }

  render() {
    const { showCartList } = this.props
    return (
      <Router>
        <ScrollToTop />
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
    )
  }
}

const mapStateToProps = (state) => {
  const { showCartList } = state.currencyCart
  return {
    showCartList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts('all')),
    fetchCurrency: () => dispatch(fetchCurrency()),
  }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
