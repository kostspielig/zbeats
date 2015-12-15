import React, {Component} from 'react'
import ClipList from './ClipList.jsx'

class MusicSection extends Component {
    render() {
        return (
           <div className='clip-list'>
                <div className='title'>{this.props.title}</div>
                <ClipList {...this.props} />
           </div>
        )
    }
}

MusicSection.propTypes = {
    title: React.PropTypes.string.isRequired,
    clips: React.PropTypes.array.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default MusicSection
