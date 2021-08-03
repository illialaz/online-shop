import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { changeAttribute } from '../../../store/actions'

class SelectorComponent extends Component {
  render() {
    const { attributes, selector, changeAttribute, cartId } = this.props
    const attrValues = attributes.value
    const attrName = attributes.key
    return (
      <li className="cart-selector">
        <div>{attrName}</div>
        <ul className="cart-attribute">
          {attrValues.map((attribute) => {
            return (
              <li
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
                      name: attrName,
                      value: attribute,
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttribute: (attribute) => dispatch(changeAttribute(attribute)),
  }
}

export const Selector = connect(null, mapDispatchToProps)(SelectorComponent)
