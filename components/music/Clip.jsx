import React, {Component} from 'react'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardExpandable from 'material-ui/lib/card/card-expandable'
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import CardText from 'material-ui/lib/card/card-text'

class Clip extends Component {

    onClick(e) {
        e.preventDefault()
        const {setClip, clip} = this.props
        setClip(clip)
    }

    render() {
        const {clip} = this.props
        let clipState = clip.clip.playing ? 'on' : 'off'
        let playIcon = !clip.clip.playing ? 'play_arrow' : 'stop'
        return (
            <Card>
              <CardHeader
                className='clip-header'
                title={clip.name}
                subtitle={clip.bpm}
                avatar={<IconButton className='clip-icon' iconClassName='material-icons'
                        onClick={this.onClick.bind(this)}>{playIcon}</IconButton>}>
              </CardHeader>
            </Card>
        )
    }
}

Clip.propTypes = {
    clip: React.PropTypes.object.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default Clip
