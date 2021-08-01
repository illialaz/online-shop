import React, { Component } from 'react'

export class Cart extends Component {
  render() {
    return (
      <div className="cartPage" onClick={() => console.log('CLICK')}>
        Cart
      </div>
    )
  }
}
