import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import './styles.css'

import { changeAttribute } from '../../../../store/actions'
import { Attribute } from '../../../../types'

type Props = PropsFromRedux & {
  attributes: Attribute
  ownAttribute: string
  cartId: number
}

class SelectorComponent extends Component<Props> {
  render() {
    const { attributes, ownAttribute, changeAttribute, cartId } = this.props
    return (
      <li className="cartitem-selector">
        <div className="cartitem-attrname">{attributes.key}</div>
        <ul className="cartitem-attribute">
          {attributes.value.map((attribute) => {
            return (
              <li
                className={attribute === ownAttribute ? 'selected' : ''}
                key={attribute}
              >
                <button
                  type="button"
                  className={
                    'attrselector-button ' +
                    (attributes.type === 'swatch' ? 'colorised' : '')
                  }
                  style={{ backgroundColor: attribute }}
                  onClick={() =>
                    attribute !== ownAttribute &&
                    changeAttribute({
                      newAttribute: {
                        name: attributes.key,
                        value: attribute,
                      },
                      cartId,
                    })
                  }
                >
                  {attributes.type !== 'swatch' && attribute}
                </button>
              </li>
            )
          })}
        </ul>
      </li>
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
