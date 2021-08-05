import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import './styles.css'

import logo from '../../assets/images/logo.svg'
import { Categories } from './categories'
import { CurrencyCartContainer } from './currency-cart-container'
import { RootState } from '../../store/types'

type Props = PropsFromRedux

export class NavBarComponent extends Component<Props> {
  render = () => {
    const { activeCategory: category } = this.props

    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav">
            <Categories />
            <CurrencyCartContainer />
          </div>
          <div className="logo-container">
            <Link to={'/products/' + category}>
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    activeCategory: state.categories.activeCategory,
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const NavBar = connector(NavBarComponent)
