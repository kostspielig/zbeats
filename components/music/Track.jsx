import React, {Component} from 'react'
import ClipList from './ClipList.jsx'
import Slider from 'material-ui/lib/slider'
import FontIcon from 'material-ui/lib/font-icon'


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
              <div className='volume-card'>
                <FontIcon className="material-icons volume">volume_up</FontIcon>
                <Slider name='vol'
                        className='track-slider'
                        defaultValue={100}
                        min={0} max={100}
                        value={track.volume}
                        onChange={this.changeVolume.bind(this)}/>
              </div>
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
