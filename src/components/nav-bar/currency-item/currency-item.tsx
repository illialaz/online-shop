import { Component } from 'react'
import { Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'

import { changeCurrency } from '../../../store/actions'
import { RootState } from '../../../store/types'

type OwnProps = {
  name: string
}

type Props = PropsFromRedux & OwnProps

export default class CurrencyItemComponent extends Component<Props> {
  handleCurrencyItemClick = () => {
    const { changeCurrency, name } = this.props
    changeCurrency(name)
  }

  render() {
    const { name, currencyList } = this.props

    return (
      <div
        className="currency-list-item"
        onClick={this.handleCurrencyItemClick}
      >
        {currencyList[name].long}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { currency, currencyList } = state.currency
  return {
    currency,
    currencyList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeCurrency: (currency: string) => dispatch(changeCurrency(currency)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const CurrencyItem = connector(CurrencyItemComponent)
