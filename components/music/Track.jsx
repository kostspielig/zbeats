import React, {Component} from 'react'
import ClipList from './ClipList.jsx'
import Card from 'material-ui/lib/card/card'
import Slider from 'material-ui/lib/slider'

class Track extends Component {

    changeVolume(e, value) {
        const {track} = this.props
        track.changeVolume(value)
        this.setState(track)
    }

    render() {
        const {track} = this.props
        return (
            <div className='clip-list'>
              <div className='title'>{this.props.title}</div>
              <ClipList {...this.props} />
              <Card>
                <Slider name='vol'
                        defaultValue={100}
                        min={0} max={100}
                        value={track.volume}
                        onChange={this.changeVolume.bind(this)}/>
              </Card>
            </div>
        )
    }
}

Track.propTypes = {
    title: React.PropTypes.string.isRequired,
    track: React.PropTypes.object.isRequired,
    clips: React.PropTypes.array.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default Track
