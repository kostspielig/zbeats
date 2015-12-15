import React, {Component} from 'react'

class Clip extends Component {
    onClick(e) {
        e.preventDefault()
        const {setClip, clip} = this.props
        setClip(clip)
    }

    render() {
        const {clip} = this.props;
        var clipState = clip.active ? 'on' : 'off'
        return (
            <li className={clipState} onClick={this.onClick.bind(this)}>
                {clip.name}
            </li>
        )
    }
}

Clip.propTypes = {
    clip: React.PropTypes.object.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default Clip
