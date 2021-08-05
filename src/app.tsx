import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'

import { fetchProducts, fetchCurrency, hideCurrencyCart } from './store/actions'
import { Cart, Product, Products } from './pages'
import { NavBar } from './components/nav-bar'
import { ScrollToTop } from './components/scroll-to-top'
import './styles.css'
import { Categories } from './types'
import { RootState } from './store/types'

type Props = PropsFromRedux

class AppComponent extends React.Component<Props> {
  componentDidMount() {
    const { fetchCurrency, fetchProducts } = this.props
    fetchProducts()
    fetchCurrency()
  }

  render() {
    const { showCartList, hideCurrencyCart } = this.props
    return (
      <Router>
        <ScrollToTop />
        <main className="main" onClick={hideCurrencyCart}>
          <NavBar />
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

const mapStateToProps = (state: RootState) => {
  const { showCartList } = state.currencyCart
  return {
    showCartList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts(Categories.all) as any),
    fetchCurrency: () => dispatch(fetchCurrency() as any),
    hideCurrencyCart: () => dispatch(hideCurrencyCart()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const App = connector(AppComponent)
