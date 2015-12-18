import React, {Component} from 'react'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'

import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import Slider from 'material-ui/lib/slider'
import Avatar from 'material-ui/lib/avatar'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'

class HeaderSection extends Component {

    changeBpm(e, value) {
        const {engine} = this.props
        this.props.setBpm(value)
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
                          <div className='bpm-header'>
                          <FlatButton className='bpm-title'>{this.props.engine.bpm} BPM</FlatButton>
                          <div className='bpm-card'>
                          <Slider name='bpm'
                                  className='bpm-slider'
                                  defaultValue={this.props.engine.bpm}
                                  min={40} max={200} step={1}
                                  value={this.props.engine.bpm}
                          onChange={this.changeBpm.bind(this)}/>
                          </div>
                          </div>
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
