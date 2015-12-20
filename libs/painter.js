const color_inactive = 'rgba(226, 226, 226, 0.4)'
const color_active = 'rgba(251, 149, 33, 0.40)'

class Painter {
    constructor() {
        this.lastPosition = null
        this.bins = null
    }

    drawBuffer(width, height, ctx, data, sound) {
        if (!this.bins || width !== this.bins.length) {
            this._recomputeBins(width, ctx, data, sound)
        }

        let step = Math.ceil(data.length / width)
        let amp = height / 2
        let firstPosition = 0
        let nextPosition = width
        let newPosition = Math.round(sound.currentTime / sound.duration * width)
        if (this.lastPosition != null && this.lastPosition <= newPosition) {
            firstPosition = this.lastPosition
            nextPosition = newPosition
        }
        this.lastPosition = newPosition

        ctx.clearRect(firstPosition, 0, nextPosition - firstPosition, height)
        this.bins.slice(firstPosition, nextPosition).forEach(({max, min}, i) => {
            ctx.fillStyle = firstPosition + i < newPosition
                ? color_active
                : color_inactive
            ctx.fillRect(firstPosition + i, (1 + min) * amp,
                         1, Math.max(1, (max - min) * amp))
        })
    }

    _recomputeBins(width, ctx, data, sound) {
        let step = Math.ceil(data.length / width)
        let bins = new Array(width)
        for (let i = 0; i < width; i++) {
            let min = 1.0
            let max = -1.0
            for (let j = 0; j < step; j++) {
                var datum = data[(i * step) + j]
                if (datum < min)
                    min = datum
                if (datum > max)
                    max = datum
            }
            bins[i] = { min: min, max: max }
        }
        this.bins = bins
        this.lastPosition = null
    }
}

export default Painter
