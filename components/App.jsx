import React, {Component} from 'react'
import HeaderSection from './header/HeaderSection.jsx'
import ShopSection from './shop/ShopSection.jsx'
import Track from './music/Track.jsx'
import Engine from '../libs/audio.js'

var clips = require('json!yaml!../clips/clips.yaml')
var items = require('json!yaml!../data/shop.yaml')

import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import LightRawTheme from '../style/zbeats-theme'

@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.state.clips = clips


        this.state.items = items



        this.state.shopItems = []
        this.state.engine = new Engine()
        this.state.tracks = {}
        Object.keys(clips).forEach((key) => {
            this.state.tracks[key] = this.state.engine.addTrack()
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
        shopItems = this.state.items.slice(2,6)
        this.setState({shopItems})
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
             <div className='music-section leads'>
               <Track
                 title='Leads'
                 track={this.state.tracks.leads}
                 clips={this.state.clips.leads}
                 setClip={this.setClip.bind(this)}
                 />
             </div>
             <div className='music-section voice'>
               <Track
                 title='Voice'
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
