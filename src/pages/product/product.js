import React, { Component } from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'
import './styles.css'

import { addToCart } from '../../store/actions'

class ProductComponent extends Component {
  state = {
    activeImage: 0,
    ownAttributes: {},
    attrNames: [],
  }

  changePhoto = (photo) => {
    this.setState({ activeImage: photo })
  }

  changeAttribute = (attribute) => {
    const { key, value } = attribute
    console.log(this.state)
    this.setState({
      ownAttributes: { ...this.state.ownAttributes, [key]: value },
      attrNames: [...new Set([...this.state.attrNames, key])],
    })
  }

  render() {
    const { product, currency, currencyName, addToCart } = this.props
    if (!product) return <div className="loading">Loading...</div>
    const { photoes, prices, attributes, description, name, inStock } = product
    const { ownAttributes, attrNames } = this.state
    return (
      <div className="product-page">
        <ul className="product-photoes">
          {photoes.map((photo, index) => {
            return (
              <li key={index}>
                <img
                  className="product-photo"
                  src={photo}
                  alt="prod"
                  key={index}
                  onClick={() => this.changePhoto(index)}
                />
              </li>
            )
          })}
        </ul>
        <div>
          <img
            className="product-main-photo"
            src={photoes[this.state.activeImage]}
            alt="main"
          />
        </div>
        <div className="product-description">
          <div className="product-name">{name}</div>
          <ul className="product-attributes">
            {attributes.map((attr, index) => (
              <li className="product-attribute" key={index}>
                <div className="product-attr-name">{attr.key}:</div>
                <ul className="product-attr-selectors">
                  {attr.value.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="product-attr-selector"
                        onClick={() => {
                          this.changeAttribute({ key: attr.key, value: item })
                        }}
                      >
                        <button
                          type="button"
                          className={
                            'product-attr-button ' +
                            (attr.type === 'swatch' ? 'fill-color' : ' ') +
                            (ownAttributes[attr.key] === item ? 'selected' : '')
                          }
                          style={{ backgroundColor: item }}
                        >
                          {attr.type === 'swatch' ? '' : item}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
          <div className="product-price">price:</div>
          <div className="product-price-amount">
            {currency}
            {prices[currencyName]}
          </div>
          {inStock && (
            <button
              className="product-button"
              onClick={() => {
                if (attrNames.length === attributes.length)
                  addToCart({ ...product, ownAttributes })
              }}
            >
              add to cart
            </button>
          )}
          <div className="description">{parse(description)}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { products } = state.products
  const { currency, currencyList } = state.currency
  const product = products[ownProps.match.params.id]
  return {
    product,
    currency: currencyList[currency].short,
    currencyName: currency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  }
}

export const Product = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent)
