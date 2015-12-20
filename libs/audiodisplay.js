function drawBuffer( width, height, ctx, data, sound ) {
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    ctx.fillStyle = 'rgba(226, 226, 226, 0.4)';
    ctx.clearRect(0,0,width,height);
    for(let i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (let j=0; j<step; j++) {
            var datum = data[(i*step)+j];
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }

        ctx.fillStyle = i < sound.currentTime / sound.duration * width ? 'rgba(251, 149, 33, 0.40)' : 'rgba(226, 226, 226, 0.4)';
        ctx.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}


export default drawBuffer
