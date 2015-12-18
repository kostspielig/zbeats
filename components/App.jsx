import React, {Component} from 'react'
import HeaderSection from './header/HeaderSection.jsx'
import ShopSection from './shop/ShopSection.jsx'
import Track from './music/Track.jsx'
import Engine from '../libs/audio.js'

var clips = require('json!yaml!../clips/clips.yaml')
var items = require('json!yaml!../data/shop.yaml')

import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import zBeatsTheme from '../style/zbeats-theme'

@ThemeDecorator(ThemeManager.getMuiTheme(zBeatsTheme))
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.state.clips = clips
        this.state.items = items
        this.state.shopItems = []
        this.state.tags = []
        this.state.engine = new Engine()
        this.state.tracks = {}
        Object.keys(clips).forEach((key) => {
            this.state.tracks[key] = this.state.engine.addTrack()
            this.shuffleArray(clips[key])
            clips[key].splice(7)
            clips[key].forEach((clip) =>
                clip.clip = this.state.tracks[key].load(clip)
            )
        })
    }

    setClip(clip) {
        this.setState({clip})
        clip.clip.track.toggle(clip.clip)
        this.updateShop(this.state.shopItems)
    }

    updateShop(shopItems) {
        // Calculate
        let tags = {}

        Object.keys(this.state.tracks).forEach( track => {
            if (this.state.tracks[track].currentClip) {
                this.state.tracks[track].currentClip.clipData.tags.forEach( tag => {
                    if (tags[tag])
                        tags[tag] += 1
                    else tags[tag] = 1
                })
            }
        })

        // Compute how many times the each item tag occurs in the
        // playing clips
        this.state.items.forEach(item => {
            item.points = item.tags.reduce((points, tag) =>
                points + (tags[tag] || 0)
            , 0)
        })

        // Randomize and re-sort items by how many popular are its tags
        this.shuffleArray(this.state.items)
        this.state.items.sort((a, b) => b.points - a.points)

        // Take the top 4 items
        shopItems = this.state.items.slice(0, 6)
        this.setState({shopItems})
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    setBpm(bpm) {
        const engine = this.state.engine
        const val = parseInt(bpm)
        if (!isNaN(val) && val > 0) {
            engine.changeBpm(bpm)
            this.setState({engine})
        }
    }

    render() {
        return (
           <div className='app'>
             <div className='header-section'>
               <HeaderSection
                 engine={this.state.engine}
                 setBpm={this.setBpm.bind(this)}
                 />
             </div>
             <div className='music-section beat'>
               <Track
                 title='Beat'
                 track={this.state.tracks.beat}
                 clips={this.state.clips.beat}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='music-section bass'>
               <Track
                 title='Bass'
                 track={this.state.tracks.bass}
                 clips={this.state.clips.bass}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='music-section pads'>
               <Track
                 title='Pads'
                 track={this.state.tracks.pads}
                 clips={this.state.clips.pads}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='music-section instruments'>
               <Track
                 title='Instruments'
                 track={this.state.tracks.instrument}
                 clips={this.state.clips.instrument}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='music-section instrument'>
               <Track
                 title='Synth'
                 track={this.state.tracks.synth}
                 clips={this.state.clips.synth}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='music-section voice'>
               <Track
                 title='Vocal'
                 track={this.state.tracks.voice}
                 clips={this.state.clips.voice}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='shop-section'>
               <ShopSection
                 items={this.state.shopItems}
                 />
             </div>
           </div>
        )
    }
}

export default App
