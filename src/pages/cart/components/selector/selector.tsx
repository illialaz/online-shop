import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import './styles.css'

import { changeAttribute } from '../../../../store/actions'

type Props = PropsFromRedux & {
  attribute: string
  selected: boolean
  cartId: number
  type: string
  name: string
}

class SelectorComponent extends Component<Props> {
  handleSelectorClick = () => {
    const { attribute, cartId, name, changeAttribute } = this.props
    changeAttribute({
      newAttribute: {
        name: name,
        value: attribute,
      },
      cartId,
    })
  }

  render() {
    const { attribute, selected, type } = this.props

    return (
      <div className={'cartitem-selector ' + (selected ? 'selected' : '')}>
        <button
          type="button"
          className={
            'attrselector-button ' + (type === 'swatch' ? 'colorised' : '')
          }
          style={{ backgroundColor: attribute }}
          onClick={this.handleSelectorClick}
        >
          {type !== 'swatch' && attribute}
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeAttribute: (attribute: {
      newAttribute: { name: string; value: string }
      cartId: number
    }) => dispatch(changeAttribute(attribute)),
  }
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Selector = connector(SelectorComponent)
