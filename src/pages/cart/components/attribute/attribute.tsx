import { Component } from 'react'
import './styles.css'

import { Attribute as AttributeType } from '../../../../types'
import { Selector } from '../selector'

type Props = {
  selectors: AttributeType
  selector: string
  cartId: number
}

export class Attribute extends Component<Props> {
  render() {
    const { selectors, selector, cartId } = this.props
    const { value: attrValues, key: attrName } = selectors

    return (
      <div className="cartitem-attribute">
        <div className="cartitem-attrname">{attrName}</div>
        <div className="cartitem-selectors">
          {attrValues.map((attribute) => (
            <Selector
              key={attribute}
              attribute={attribute}
              selected={attribute === selector}
              type={selectors.type}
              name={attrName}
              cartId={cartId}
            />
          ))}
        </div>
      </div>
    )
  }
}
