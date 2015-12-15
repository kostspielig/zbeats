import React, {Component} from 'react'
import ClipList from './ClipList.jsx'

class MusicSection extends Component {
    render() {
        return (
           <div>
               <ClipList {...this.props} />
           </div>
        )
    }
}

MusicSection.propTypes = {
    clips: React.PropTypes.array.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default MusicSection
