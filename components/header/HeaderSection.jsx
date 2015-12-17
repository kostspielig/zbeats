import React, {Component} from 'react'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'

import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import TextField from 'material-ui/lib/text-field'

@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
class HeaderSection extends Component {

    changeBpm(e) {
        this.props.setBpm(e.target.value)
    }

    render() {
        return (
            <AppBar
              title={<span>zBeats</span>}
              iconElementLeft={
                      <IconMenu
                            openDirection='bottom-right'
                            iconButtonElement={
                                    <IconButton iconClassName='material-icons'>
                                          album
                                    </IconButton>}>
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" />
                      </IconMenu>
                      }
                      iconElementRight={
                              <TextField
                                    hintText='BPM'
                                    value={this.props.engine.bpm + ""}
                                    onChange={this.changeBpm.bind(this)} />
                      }
            />
        )
    }
}

HeaderSection.propTypes = {
    engine: React.PropTypes.object.isRequired,
    setBpm: React.PropTypes.func.isRequired
}

export default HeaderSection
