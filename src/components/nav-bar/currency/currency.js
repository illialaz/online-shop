import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import arrowDown from '../../../assets/images/arrowDown.svg'
import arrowUp from '../../../assets/images/arrowUp.svg'
import { changeCurrency, handleShowCurrency } from '../../../store/actions'

class CurrencyComponent extends Component {
  render = () => {
    const {
      currency,
      currencyList,
      currencyNames,
      showCurrencyList,
      handleShowCurrency,
      changeCurrency,
    } = this.props
    return (
      <div className="currency" onClick={handleShowCurrency}>
        <div className="currency-symbol">{currencyList[currency].short}</div>
        <img
          className="currency-arrow"
          src={showCurrencyList ? arrowUp : arrowDown}
          alt="select currency"
        />
        {showCurrencyList && (
          <ul className="currency-list">
            {currencyNames.map((name) => (
              <li
                className="currency-list-item"
                key={name}
                onClick={() => changeCurrency(name)}
              >
                {currencyList[name].long}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currency, currencyList, currencyNames } = state.currency
  const { showCurrencyList } = state.currencyCart
  return {
    currency,
    currencyList,
    showCurrencyList,
    currencyNames,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currency) => dispatch(changeCurrency(currency)),
    handleShowCurrency: () => dispatch(handleShowCurrency()),
  }
}

export const Currency = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyComponent)
