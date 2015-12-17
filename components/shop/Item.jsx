import React, {Component} from 'react'

import Card from 'material-ui/lib/card/card'
import CardMedia from 'material-ui/lib/card/card-media'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import CardTitle from 'material-ui/lib/card/card-title'

class Item extends Component {

    onClick(e) {
        e.preventDefault()
        const {setItem, item} = this.props
        window.open(item.url,'_blank')
    }

    render() {
        const {item} = this.props
        return (
            <Card className='shop-item' onClick={this.onClick.bind(this)}>
              <CardMedia overlay={<CardTitle title={item.description} subtitle={item.brand}/>}>
                <img src={item.src}/>
              </CardMedia>
            </Card>
        )
    }
}

Item.propTypes = {
    item: React.PropTypes.object.isRequired
}

export default Item
