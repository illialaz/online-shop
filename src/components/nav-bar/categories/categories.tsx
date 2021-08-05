import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import './styles.css'

import { Category } from '../category'
import { Categories as CategoryType } from '../../../types'
import { RootState } from '../../../store/types'

type Props = PropsFromRedux

export class CategoriesComponent extends Component<Props> {
  render = () => {
    const { activeCategory } = this.props

    return (
      <div className="categories">
        <Category
          category={CategoryType.all}
          active={activeCategory === CategoryType.all}
        />
        <Category
          category={CategoryType.clothes}
          active={activeCategory === CategoryType.clothes}
        />
        <Category
          category={CategoryType.tech}
          active={activeCategory === CategoryType.tech}
        />
      </div>
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

export const Categories = connector(CategoriesComponent)
