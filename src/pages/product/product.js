import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

class ProductComponent extends Component {
  state = {
    activeImage: this.props.photo,
  }

  changePhoto = (photo) => {
    this.setState({ activeImage: photo })
  }

  render() {
    const { product } = this.props
    if (!product) return <div className="loading">Loading...</div>
    const { photoes, prices, attributes, description, name, inStock } = product
    return (
      <div className="product-page">
        <ul className="product-photoes">
          {photoes.map((photo, index) => {
            return (
              <li>
                <img
                  className="product-photo"
                  src={photo}
                  alt="prod"
                  key={index}
                  onClick={() => this.changePhoto(photo)}
                />
              </li>
            )
          })}
        </ul>
        <img
          className="product-main-photo"
          src={this.state.activeImage}
          alt="main"
        />
        <div className="product-description">
          <div>{name}</div>
          <ul>
            {attributes.map((attr) => (
              <li></li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { products } = state.products
  const product = products[ownProps.match.params.id]
  return {
    product,
  }
}

export const Product = connect(mapStateToProps)(ProductComponent)
