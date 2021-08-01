import {
  CHANGE_ATTRIBUTE,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
} from './constants'

const initialState = {
  newId: 3,
  cartIds: [1, 2],
  cart: {
    1: {
      name: 'iMac 2021',
      prices: {
        USD: 1688.03,
        GPB: 1213.34,
        AUD: 2177.57,
        JPY: 182294.51,
        RUB: 127653.82,
      },
      count: 5,
      photoes: [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000',
      ],
      attributes: [
        { key: 'capacity', value: ['256gb', '512gb'] },
        { key: 'withUSB', value: ['yes', 'no'] },
        { key: 'touchID', value: ['yes', 'no'] },
        {
          key: 'color',
          value: ['#44FF03', '#03FFF7', '#030BFF', '#000000', '#FFFFFF'],
        },
      ],
      ownAttributes: {
        capacity: '256gb',
        withUSB: 'yes',
        touchID: 'no',
        color: '#000000',
      },
    },
    2: {
      name: 'Nake Air Huarache Le',
      prices: {
        USD: 144.69,
        GPB: 104.0,
        AUD: 186.65,
        JPY: 15625.24,
        RUB: 10941.76,
      },
      count: 1,
      photoes: [
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016111/product-image/2409L_61_e.jpg',
      ],
      attributes: [{ key: 'size', value: [40, 41, 42, 43] }],
      ownAttributes: {
        size: 43,
      },
    },
  },
}

export const reducer = (state = initialState, action) => {
  const { cart } = state
  switch (action.type) {
    case INCREASE_PRODUCT_COUNT:
      return {
        ...state,
        cart: {
          ...cart,
          [action.cartId]: {
            ...cart[action.cartId],
            count: cart[action.cartId].count + 1,
          },
        },
      }
    case DECREASE_PRODUCT_COUNT:
      return {
        ...state,
        cart: {
          ...cart,
          [action.cartId]: {
            ...cart[action.cartId],
            count:
              cart[action.cartId].count > 0 ? cart[action.cartId].count - 1 : 0,
          },
        },
      }
    case CHANGE_ATTRIBUTE:
      const { name, value, cartId } = action.newAttribute
      console.log(action.newAttribute)
      return {
        ...state,
        cart: {
          ...cart,
          [cartId]: {
            ...cart[cartId],
            ownAttributes: {
              ...cart[cartId].ownAttributes,
              [name]: value,
            },
          },
        },
      }

    default:
      return state
  }
}
