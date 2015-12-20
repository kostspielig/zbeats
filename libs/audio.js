import drawBuffer from './audiodisplay'

class Clip {
    constructor(track, clipData) {
        this.track = track
        this.context = track.context
        this.clipData = clipData
        var url = 'clips/' + clipData.sample
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

                    this.data =  this.buffer.getChannelData(1)
                    this.canvas = document.getElementById(this.clipData.name)
                    this.canvasCtx = this.canvas.getContext('2d')
                    drawBuffer(this.canvas.width, this.canvas.height, this.canvasCtx, this.data,
                               {
                                   duration: 0,
                                   currentTime: 0
                               })

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
        const duration = this.buffer.length / this.buffer.sampleRate
        const bpm = this.clipData.bpm

        this.source = this.context.createBufferSource() // creates a sound source
        this.source.buffer = this.buffer // tell the source which sound to play
        this.source.connect(this.track.gainNode)

        this.source.loop = true
        this.source.loopEnd = Math.round(duration / 60.0 * bpm / 4.0) * 60 * 4 / bpm
        this.source.playbackRate.value = this.track.engine.bpm / bpm
        this.source.start(startTime)
        this.playing = true

        this.lastCurrentTime = 0
        this.lastChangeTime = startTime
        let draw = () => {
            drawBuffer(this.canvas.width, this.canvas.height, this.canvasCtx, this.data,
                       {
                           duration: this.buffer.duration,
                           currentTime: (this.lastCurrentTime + (this.context.currentTime - this.lastChangeTime) * this.source.playbackRate.value) % this.buffer.duration
                       })
            this.drawframe = requestAnimationFrame (draw)
        }

        draw()
    }

    stop(stopTime) {
        window.cancelAnimationFrame(this.drawframe)
        this.source.stop(stopTime)
        this.playing = false

        drawBuffer(this.canvas.width, this.canvas.height, this.canvasCtx, this.data,
                   {
                       duration: 0,
                       currentTime: 0
                   })
    }

    changeGlobalBpm(bpm, time) {
        this.lastCurrentTime = (this.lastCurrentTime + (this.context.currentTime - this.lastChangeTime) * this.source.playbackRate.value) % this.buffer.duration
        this.lastChangeTime = time
        this.source.playbackRate.setValueAtTime(
            bpm / this.clipData.bpm, time)
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
        const curr = this.context.currentTime + 1./60.
        if (this.engine.startTime === null)
            this.engine.startTime = curr
        const now = curr - this.engine.startTime
        const bpm = this.engine.bpm
        const next = this.engine.startTime + Math.ceil(now / 60.0 * bpm / 4.0) * 60 * 4 / bpm
        if (this.currentClip !== clip) {
            this.currentClip && this.currentClip.stop(next)
            clip.play(next)
            this.currentClip = clip
        } else {
            clip.stop(next)
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
        this.tracks = []
    }

    changeBpm(bpm) {
        const old = this.bpm
        const time = this.context.currentTime + 1./60.
        this.bpm = bpm
        if (this.startTime !== null) {
            const bars = (time - this.startTime) / 60.0 * old / 4.0
            this.startTime = time + (Math.ceil(bars) - bars) * 60 * 4 / bpm
        }
        this.tracks.forEach(track => {
            const clip = track.currentClip
            if (clip !== null) {
                clip.changeGlobalBpm(bpm, time)
            }
        })
    }

    addTrack() {
        const track = new Track(this)
        this.tracks.push(track)
        return track
    }
}

export default Engine
