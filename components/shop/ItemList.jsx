import React, {Component} from 'react'
import Item from './Item.jsx'

class ItemList extends Component {
    render() {
        const {items} = this.props
        return (
            <div className='shop-item-list'>
              {
                  items.map(item => {
                      return <Item
                                   item={item}
                                   key={item.brand}
                                   />
                  })
              }
            </div>
        )
    }
}

ItemList.propTypes = {
    items: React.PropTypes.array.isRequired,
}

export default ItemList
