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
                      name: attributes.key,
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
