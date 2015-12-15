
class Clip {
    constructor(context, clipData) {
        console.log("CLIP", clipData)

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
                    this.source = this.context.createBufferSource()
                    this.source.buffer = this.buffer
                    this.source.connect(this.context.destination)
                    this.source.loop = true
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
        this.source.start(0)
    }

    stop() {

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
