import React, {Component} from 'react'
import Clip from './Clip.jsx'

class ClipList extends Component {
    render() {
        const {clips, setClip} = this.props
        return (
            <ul>{
                clips.map( clip => {
                    return <Clip
                        clip={clip}
                        key={clip.name}
                        setClip={setClip}
                    />
                })
            }</ul>
        )
    }
}

ClipList.propTypes = {
    clips: React.PropTypes.array.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default ClipList
