import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import './styles.css'

import { changeAttribute } from '../../../store/actions'
import { Attribute } from '../../../types'

type Props = PropsFromRedux & {
  attributes: Attribute
  selector: string
  cartId: number
}

class SelectorComponent extends Component<Props> {
  render() {
    const { attributes, selector, changeAttribute, cartId } = this.props
    const attrValues = attributes.value
    const attrName = attributes.key
    return (
      <div className="cart-selector">
        <div>{attrName}</div>
        <div className="cart-attribute">
          {attrValues.map((attribute) => {
            return (
              <div
                className={attribute === selector ? 'selected' : ''}
                key={attribute}
              >
                <button
                  type="button"
                  className="selector-button"
                  style={{ backgroundColor: attribute }}
                  onClick={() =>
                    attribute !== selector &&
                    changeAttribute({
                      newAttribute: {
                        name: attrName,
                        value: attribute,
                      },
                      cartId,
                    })
                  }
                >
                  {attributes.type !== 'swatch' && attribute}
                </button>
              </div>
            )
          })}
        </div>
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
