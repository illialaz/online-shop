import React, { Component } from 'react'
import './styles.css'
import { connect } from 'react-redux'

import { changeAttribute } from '../cart/store/actions'

class SelectorComponent extends Component {
  render() {
    const { attributes, selector, changeAttribute, cartId } = this.props
    const attrValues = attributes.value
    const attrName = attributes.key
    return (
      <li className="selector">
        <div>{attrName}</div>
        <ul className="attribute">
          {attrValues.map((attribute, index) => {
            return (
              <li
                className={attribute === selector ? 'selected' : ''}
                key={index}
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
                  {attributes.key !== 'color' && attribute}
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
