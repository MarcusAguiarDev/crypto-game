class GameObject {

    constructor(config) {
        this.sprite = config.sprite
        this.ctx = config.ctx   
        this.width = config.width
        this.height = config.height       
        this.canvasWidth = config.ctx.canvas.width
        this.canvasHeight = config.ctx.canvas.height
    }

    draw(sx, sy, dx, dy) {
        this.ctx.clearRect(dx, dy, this.width, this.height)
        this.ctx.drawImage(this.sprite, sx, sy, this.width, this.height, dx, dy, this.width, this.height)
    }
}

export default GameObject