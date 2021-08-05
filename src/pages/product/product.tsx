import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import parse from 'html-react-parser'
import './styles.css'

import { addToCart } from '../../store/actions'
import { RootState } from '../../store/types'
import { CartItem } from '../../types'

type Props = PropsFromRedux

type State = {
  activeImage: number
  ownAttributes: Record<string, string>
  attrNames: string[]
}

class ProductComponent extends Component<Props, State> {
  state: State = {
    activeImage: 0,
    ownAttributes: {},
    attrNames: [],
  }

  changePhoto = (photo: number) => {
    this.setState({ activeImage: photo })
  }

  changeAttribute = (attribute: { key: string; value: string }) => {
    const { key, value } = attribute
    const uniqueAttrNames = new Set([...this.state.attrNames, key])
    this.setState({
      ownAttributes: { ...this.state.ownAttributes, [key]: value },
      attrNames: [...uniqueAttrNames],
    })
  }

  render() {
    const { product, currency, currencyName, addToCart } = this.props
    if (!product) return <div className="loading">Loading...</div>
    const { photoes, prices, attributes, description, name, inStock } = product
    const { ownAttributes, attrNames } = this.state
    return (
      <div className="product-page">
        <div className="photoes-container">
          <div className="product-photoes">
            {photoes.map((photo, index) => {
              return (
                <div key={photo}>
                  <img
                    className="product-photo"
                    src={photo}
                    alt="product"
                    onClick={() => this.changePhoto(index)}
                  />
                </div>
              )
            })}
          </div>
          <div>
            <img
              className="product-main-photo"
              src={photoes[this.state.activeImage]}
              alt="main product"
            />
          </div>
        </div>
        <div className="product-description">
          <div className="product-name">{name}</div>
          <div className="product-attributes">
            {attributes.map((attr) => (
              <div className="product-attribute" key={attr.key}>
                <div className="product-attr-name">{attr.key}:</div>
                <div className="product-attr-selectors">
                  {attr.value.map((item) => {
                    return (
                      <div
                        key={item}
                        className="product-attr-selector"
                        onClick={() => {
                          this.changeAttribute({ key: attr.key, value: item })
                        }}
                      >
                        <button
                          type="button"
                          className={
                            'product-attr-button ' +
                            (attr.type === 'swatch' ? 'fill-color ' : '') +
                            (ownAttributes[attr.key] === item ? 'selected' : '')
                          }
                          style={{ backgroundColor: item }}
                        >
                          {attr.type === 'swatch' ? '' : item}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
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
                  addToCart({ ...product, ownAttributes, count: 1 })
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

const mapStateToProps = (state: RootState, ownProps: any) => {
  const { products } = state.products
  const { currency, currencyList } = state.currency
  const product = products[ownProps.match.params.id]
  return {
    product,
    currency: currencyList[currency].short,
    currencyName: currency,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addToCart: (product: CartItem) => dispatch(addToCart(product)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Product = connector(ProductComponent)
