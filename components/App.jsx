import React, {Component} from 'react'
import HeaderSection from './header/HeaderSection.jsx'
import MusicSection from './music/MusicSection.jsx'
import Engine from '../libs/audio.js'

var clips = require('json!yaml!../clips/clips.yaml')

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.state.clips = clips
        this.state.engine = new Engine()
        Object.keys(clips).forEach((key) => {
            clips[key].forEach((clip) => {
                clip.clip = this.state.engine.load(clip)
            })
        })
    }

    setClip(clip) {
        clip.active = !clip.active
        this.setState({clip})
        clip.clip.toggle()
    }

    render() {
        return (
           <div className='app'>
                <div className='header-section'>
                    <HeaderSection
                       bpm={120}
                    />
                </div>
                <div className='music-section beat'>
                    <MusicSection
                       clips={this.state.clips.beat}
                       setClip={this.setClip.bind(this)}
                    />
                </div>
                <div className='music-section bass'>
                    <MusicSection
                       clips={this.state.clips.bass}
                       setClip={this.setClip.bind(this)}
                    />
                </div>
                <div className='music-section pads'>
                    <MusicSection
                       clips={this.state.clips.pads}
                       setClip={this.setClip.bind(this)}
                    />
                </div>
                <div className='music-section leads'>
                    <MusicSection
                       clips={this.state.clips.leads}
                       setClip={this.setClip.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default App
