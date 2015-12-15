
class Clip {
    constructor(context, clipData) {
        this.context = context
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

    play() {
        if (!this.context.createGain)
            this.context.createGain = this.context.createGainNode
        this.gainNode = this.context.createGain()
        this.source = this.context.createBufferSource() // creates a sound source
        this.source.buffer = this.buffer // tell the source which sound to play

        this.source.connect(this.gainNode)
        this.gainNode.connect(this.context.destination)
        this.source.loop = true
        if (!this.source.start)
            this.source.start = this.source.noteOn
        this.source.start(0)
    }

    stop() {
        if (!this.source.stop)
            this.source.stop = source.noteOff
        this.source.stop(0)
    }

    toggle() {
        this.playing ? this.stop() : this.play();
        this.playing = !this.playing;
    }

    changeVolume(value, max=100) {
        let volume = value
        let fraction = parseInt(value) / parseInt(max)
        // Let's use an x*x curve (x-squared) since simple linear (x) does not
        // sound as good.
        this.gainNode.gain.value = fraction * fraction
    }
}

class Engine {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)()
    }

    load(clipData) {
        return new Clip(this.context, clipData)
    }
}

export default Engine
