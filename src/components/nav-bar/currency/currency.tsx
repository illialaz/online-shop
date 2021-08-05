import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import './styles.css'

import arrowDown from '../../../assets/images/arrowDown.svg'
import arrowUp from '../../../assets/images/arrowUp.svg'
import { handleShowCurrency } from '../../../store/actions'
import { RootState } from '../../../store/types'
import { CurrencyItem } from '../currency-item'

type Props = PropsFromRedux

class CurrencyComponent extends Component<Props> {
  handleCurrencyClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { handleShowCurrency } = this.props
    e.stopPropagation()
    handleShowCurrency()
  }

  render = () => {
    const { currency, currencyList, currencyNames, showCurrencyList } =
      this.props

    return (
      <div className="currency" onClick={this.handleCurrencyClick}>
        <div className="currency-symbol">{currencyList[currency].short}</div>
        <img
          className="currency-arrow"
          src={showCurrencyList ? arrowUp : arrowDown}
          alt="select currency"
        />
        {showCurrencyList && (
          <div className="currency-list">
            {currencyNames.map((name) => (
              <CurrencyItem name={name} key={name} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { currency, currencyList, currencyNames } = state.currency
  const { showCurrencyList } = state.currencyCart
  return {
    currency,
    currencyList,
    showCurrencyList,
    currencyNames,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleShowCurrency: () => dispatch(handleShowCurrency()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Currency = connector(CurrencyComponent)
