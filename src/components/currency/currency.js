import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import arrowDown from '../../assets/images/arrowDown.svg'
import arrowUp from '../../assets/images/arrowUp.svg'
import { changeCurrency } from '../../store/actions'

class CurrencyComponent extends Component {
  render = () => {
    const {
      currency,
      currencyList,
      showCurrencyList,
      handleShowCurrency,
      changeCurrency,
    } = this.props
    return (
      <div className="currency" onClick={handleShowCurrency}>
        <div className="currency-symbol">{currency}</div>
        <img
          className="currency-arrow"
          src={showCurrencyList ? arrowUp : arrowDown}
          alt="select currency"
        />
        {showCurrencyList && (
          <ul className="currency-list">
            {currencyList.map((item, index) => (
              <li
                className="currency-list-item"
                key={index}
                onClick={() => changeCurrency({ currency: item })}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const mapStoreToProps = ({ currency, currencyList }) => {
  return {
    currency,
    currencyList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (data) => dispatch(changeCurrency(data)),
  }
}

export const Currency = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CurrencyComponent)
