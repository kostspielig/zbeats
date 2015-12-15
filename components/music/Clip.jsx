import React, {Component} from 'react'

class Clip extends Component {
    onClick(e) {
        e.preventDefault()
        const {setClip, clip} = this.props
        setClip(clip)
        if (clip.volume)
            clip.clip.changeVolume(clip.volume)
    }

    changeVolume(e) {
        const {clip} = this.props

        clip.volume = e.target.value
        this.setState(clip)
        clip.clip.changeVolume(e.target.value)
    }

    render() {
        const {clip} = this.props;
        var clipState = clip.active ? 'on' : 'off'
        clip.volume = clip.volume ? clip.volume : 100
        return (
            <li className={clipState}>
                {clip.name}
                <div onClick={this.onClick.bind(this)}>play/stop</div>
                <input type='range' min='0' max='100' value={clip.volume} onChange={this.changeVolume.bind(this)}/>
            </li>
        )
    }
}

Clip.propTypes = {
    clip: React.PropTypes.object.isRequired,
    setClip: React.PropTypes.func.isRequired
}

export default Clip
