import React, {Component} from 'react'
import ItemList from './ItemList.jsx'

import IconButton from 'material-ui/lib/icon-button'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'

import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'

@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
class ShopSection extends Component {
    render() {
        return (
            <div>
              <div className='title'>Recommended products</div>
              <ItemList {...this.props}></ItemList>
            </div>
        )
    }
}

ShopSection.propTypes = {
    items: React.PropTypes.array.isRequired
}

export default ShopSection
