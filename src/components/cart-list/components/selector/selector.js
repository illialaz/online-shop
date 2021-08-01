import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { changeAttribute } from '../../../../store/actions'

class SelectorComponent extends Component {
  render() {
    const { attributes, ownAttribute, changeAttribute, cartId } = this.props
    return (
      <li className="cartitem-selector">
        <div className="cartitem-attrname">{attributes.key}</div>
        <ul className="cartitem-attribute">
          {attributes.value.map((attribute, index) => {
            return (
              <li
                className={attribute === ownAttribute ? 'selected' : ''}
                key={index}
              >
                <button
                  type="button"
                  className="attrselector-button"
                  style={{ backgroundColor: attribute }}
                  onClick={() =>
                    attribute !== ownAttribute &&
                    changeAttribute({
                      name: attributes.key,
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
