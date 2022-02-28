import GameInput from "./GameInput";
import GameObject from "./GameObject";

class Room extends GameObject {

    sx = 0
    sy = 0
    fps = 50

    timers = []
    subscriptions = []
    movingDirection = null

    constructor(config) {
        super(config)

        const gameInput = new GameInput()
        this.subscriptions.push(gameInput.getArrowUp$().subscribe(this.move.bind(this, "up")))
        this.subscriptions.push(gameInput.getArrowDown$().subscribe(this.move.bind(this, "bottom")))
        this.subscriptions.push(gameInput.getArrowRight$().subscribe(this.move.bind(this, "right")))
        this.subscriptions.push(gameInput.getArrowLeft$().subscribe(this.move.bind(this, "left")))   
    }

    clearTimers() {
        for (let timer of this.timers) {
            clearInterval(timer)
        }
        this.timers = []
    }

    release(){
        this.subscriptions.forEach( sub => sub.unsubscribe())
        this.clearTimers()
    }

    move(direction, event) {
        if(event === "keydown" && (this.timers.length === 0 || this.movingDirection !== direction)) {
            this.clearTimers()
            this.movingDirection = direction
            this.moveMap()
        } else if (event === "keyup" && this.movingDirection === direction) {
            this.clearTimers()
        }
    }

    moveMap(){
        const timer = setInterval(() => {
            switch (this.movingDirection) {
                case "up": 
                    this.sy = this.sy - 1
                    break
                case "bottom": 
                    this.sy += 1
                    break
                case "right": 
                    this.sx += 1
                    break
                case "left": 
                    this.sx -= 1
                    break
            }
            super.emitDraw()
        }, 1000 / this.fps)
        this.timers.push(timer)
    }


    draw() {
        super.draw(this.sx, this.sy, 0, 0, this.canvasWidth, this.canvasHeight)
    }
}



export default Room