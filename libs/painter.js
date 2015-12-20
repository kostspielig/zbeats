const color_inactive = 'rgba(226, 226, 226, 0.4)'
const color_active = 'rgba(251, 149, 33, 0.40)'

class Painter {
    constructor() {}

    drawBuffer(width, height, ctx, data, sound) {
        if (!this.bins || width !== this.bins.length)
            this._recomputeBins(width, ctx, data, sound)

        let step = Math.ceil( data.length / width )
        let amp = height / 2
        ctx.clearRect(0,0,width,height)

        this.bins.forEach(({max, min}, i) => {
            ctx.fillStyle = i < sound.currentTime / sound.duration * width
                ? color_active
                : color_inactive
            ctx.fillRect(i, (1 + min) * amp,
                         1, Math.max(1, (max - min) * amp))
        })
    }

    _recomputeBins(width, ctx, data, sound) {
        let step = Math.ceil( data.length / width )
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
    }
}

export default Painter
