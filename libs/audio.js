
class Clip {
    constructor(track, clipData) {
        this.track = track
        this.context = track.context
        var url = '../clips/' + clipData.sample
        var request = new XMLHttpRequest()
        request.open("GET", url, true)
        request.responseType = "arraybuffer"

        request.onload = () => {
            this.context.decodeAudioData(
                request.response,
                (buffer) => {
                    if (!buffer) {
                        alert('error decoding file data: ' + url)
                        return
                    }
                    this.buffer = buffer
                },
                (error) => {
                    console.error('decodeAudioData error', error)
                }
            )
        }

        request.onerror = () => alert('failed loading sample: ' + url)
        request.send()
    }

    play(startTime) {
        this.source = this.context.createBufferSource() // creates a sound source
        this.source.buffer = this.buffer // tell the source which sound to play
        this.source.connect(this.track.gainNode)
        this.source.loop = true
        this.source.start(startTime)
        this.playing = true
    }

    stop() {
        this.source.stop(0)
        this.playing = false
    }

    toggle() {
        this.playing ? this.stop() : this.play();
    }

}

class Track {
    constructor(engine) {
        this.engine = engine
        this.context = engine.context
        this.gainNode = this.context.createGain()
        this.gainNode.connect(this.context.destination)
        this.currentClip = null
        this.volume = 100
    }

    load(clipData) {
        return new Clip(this, clipData)
    }

    toggle(clip) {
        if (this.currentClip !== clip) {
            this.currentClip && this.currentClip.stop()
            if (this.engine.startTime !== null)
                this.engine.startTime = this.context.currentTime
            const now = this.context.currentTime
            const start = this.engine.startTime
            const bpm = this.engine.bpm
            const next = Math.ceil(now / 60.0 * bpm / 4.0) * 60 * 4 / bpm
            clip.play(next)
            this.currentClip = clip
        } else {
            clip.stop()
            this.currentClip = null
        }
    }

    changeVolume(value, max=100) {
        // Let's use an x*x curve (x-squared) since simple linear (x)
        // does not sound as good.
        this.volume = value
        let fraction = parseInt(value) / parseInt(max)
        this.gainNode.gain.value = fraction * fraction
    }
}

class Engine {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)()
        this.startTime = null
        this.bpm = 120
    }

    addTrack() {
        return new Track(this)
    }
}

export default Engine
