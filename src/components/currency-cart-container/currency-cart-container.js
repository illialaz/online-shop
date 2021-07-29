import './styles.css'
import React, { Component } from 'react'

import { Cart } from '../cart'
import { Currency } from '../currency'

export default class CurrencyCartContainer extends Component {
  state = {
    showCurrencyList: false,
    showCartList: false,
  }

  handleShowCurrency = () => {
    this.setState({
      showCartList:
        this.state.showCurrencyList === false ? false : this.state.showCartList,
      showCurrencyList: !this.state.showCurrencyList,
    })
  }

  handleShowCart = () => {
    this.setState({
      showCurrencyList:
        this.state.showCartList === false ? false : this.state.showCurrencyList,
      showCartList: !this.state.showCartList,
    })
  }

  render = () => {
    return (
      <div className="nav-left">
        <Currency
          showCurrencyList={this.state.showCurrencyList}
          handleShowCurrency={this.handleShowCurrency}
        />
        <Cart
          showCartList={this.state.showCartList}
          handleShowCart={this.handleShowCart}
        />
      </div>
    )
  }
}
