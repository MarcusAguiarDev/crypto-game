import { Subject } from "rxjs"

class GameObject {

    _drawSubject = new Subject()
    
    constructor(config) {
        this.sprite = config.sprite
        this.ctx = config.ctx   
        this.width = config.width || config.ctx.canvas.width
        this.height = config.height || config.ctx.canvas.height
        this.canvasWidth = config.ctx.canvas.width
        this.canvasHeight = config.ctx.canvas.height
    }

    draw(sx, sy, dx, dy, dWidth=this.width, dHeight=this.height) {
        this.ctx.drawImage(this.sprite, sx, sy, this.width, this.height, dx, dy, dWidth, dHeight)
    }

    getDraw() {
        return this._drawSubject.asObservable()
    }

    emitDraw() {
        this._drawSubject.next(true)
    }
}

export default GameObject