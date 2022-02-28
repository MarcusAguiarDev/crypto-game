import GameInput from "./GameInput";
import GameObject from "./GameObject";

class Hero extends GameObject {

    isWalking = false
    fps = 10
    frame = 0
    timers = []
    subscriptions = []

    constructor(config) {
        super(config)

        console.log(config.ctx)
        this.direction = {
            BOTTOM: 0 * config.width,
            LEFT: 1 * config.width,
            TOP: 2 * config.width,
            RIGHT: 3 * config.width
        }
        this.current_direction = this.direction.BOTTOM

        this.walk = this.walk.bind(this)
        this.setIdlePosition = this.setIdlePosition.bind(this)

        const gameInput = new GameInput()
        this.subscriptions.push(gameInput.getArrowDown$().subscribe(this.move.bind(this, this.direction.BOTTOM)))
        this.subscriptions.push(gameInput.getArrowUp$().subscribe(this.move.bind(this, this.direction.TOP)))
        this.subscriptions.push(gameInput.getArrowRight$().subscribe(this.move.bind(this, this.direction.RIGHT)))
        this.subscriptions.push(gameInput.getArrowLeft$().subscribe(this.move.bind(this, this.direction.LEFT)))
    }

    releaseSubscriptions(){
        this.subscriptions.forEach( sub => sub.unsubscribe())
    }

    setIdlePosition() {
        this.frame = 0
        super.emitDraw()
    }

    clearTimers() {
        for (let timer of this.timers) {
            clearInterval(timer)
        }
        this.timers = []
    }

    move(direction, event) {
        if (event === "keydown" && (this.current_direction !== direction || this.timers.length === 0)) {
            this.current_direction = direction
            this.clearTimers()
            this.walk()
        } else if (event === "keyup" && this.current_direction === direction) {
            this.clearTimers()
            this.frame = 0
            super.emitDraw()
        }
    }

    walk(frame = 0) {
        const timer = setInterval(() => {
            frame++
            if (frame > 3)
                frame = 0
            this.frame = frame
            super.emitDraw(frame)
        }, 1000 / this.fps)
        this.timers.push(timer)
    }

    draw() {
        const dx = this.canvasWidth / 2 - this.width / 2
        const dy = this.canvasHeight / 2 - this.height / 2
        super.draw(this.current_direction, this.frame * 48, dx, dy)
    }
}



export default Hero