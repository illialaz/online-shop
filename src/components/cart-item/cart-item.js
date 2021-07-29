import React from 'react'
import './styles.css'

export class CartItem extends React.Component {
  render = () => {
    const { product } = this.props
    return <li>{product}</li>
  }
}
