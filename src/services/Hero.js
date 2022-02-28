import GameObject from "./GameObject";

class Hero extends GameObject {

    isWalking = false
    fps = 5
    timers = []

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
        this.setInitialPosition()
        this.initListeners()

        this.walk = this.walk.bind(this)
        this.setIdlePosition = this.setIdlePosition.bind(this)

    }

    initListeners() {
        document.addEventListener('keydown', this.keyDownListener.bind(this))
        document.addEventListener('keyup', this.keyUpListener.bind(this))
    }

    setIdlePosition() {
        this.draw(0)
    }

    clearTimers() {
        for (let timer of this.timers) {
            clearInterval(timer)
        }
        this.timers = []
    }
    // KEY UP
    keyUpListener(event) {
        if (['w', 'ArrowUp', 's', 'ArrowDown', 'd', 'ArrowRight', 'a', 'ArrowLeft'].indexOf(event.key) !== -1) {
            this.isWalking = false

            if ((['w', 'ArrowUp'].indexOf(event.key) !== -1 && this.current_direction === this.direction.TOP) ||
                (['s', 'ArrowDown'].indexOf(event.key) !== -1 && this.current_direction === this.direction.BOTTOM) ||
                (['d', 'ArrowRight'].indexOf(event.key) !== -1 && this.current_direction === this.direction.RIGHT) ||
                (['a', 'ArrowLeft'].indexOf(event.key) !== -1 && this.current_direction === this.direction.LEFT))
                this.clearTimers()
            this.setIdlePosition()
        }
    }
    // KEY DOWN
    keyDownListener(event) {
        if (['w', 'ArrowUp'].indexOf(event.key) !== -1) {
            if (!this.isWalking || this.current_direction !== this.direction.TOP) {
                this.clearTimers()
                this.isWalking = true
                this.moveUp()
                this.walk()
            }
        }
        if (['s', 'ArrowDown'].indexOf(event.key) !== -1) {
            if (!this.isWalking || this.current_direction !== this.direction.BOTTOM) {
                this.clearTimers()
                this.isWalking = true
                this.moveDown()
                this.walk()
            }
        }
        if (['d', 'ArrowRight'].indexOf(event.key) !== -1) {
            if (!this.isWalking || this.current_direction !== this.direction.RIGHT) {
                this.clearTimers()
                this.isWalking = true
                this.moveRight()
                this.walk()
            }
        }
        if (['a', 'ArrowLeft'].indexOf(event.key) !== -1) {
            if (!this.isWalking || this.current_direction !== this.direction.LEFT) {
                this.clearTimers()
                this.isWalking = true
                this.moveLeft()
                this.walk()
            }
        }
    }

    setInitialPosition() {
        this.draw()
    }

    moveUp() {
        this.current_direction = this.direction.TOP
        this.draw()
    }
    moveDown() {
        this.current_direction = this.direction.BOTTOM
        this.draw()
    }
    moveRight() {
        this.current_direction = this.direction.RIGHT
        this.draw()
    }
    moveLeft() {
        this.current_direction = this.direction.LEFT
        this.draw()
    }

    walk(frame = 0) {
        const timer = setInterval(() => {
            frame++
            if (frame > 3)
                frame = 0
            this.draw(frame)

        }, 1000 / this.fps)

        this.timers.push(timer)
    }

    draw(frame = 0) {
        const centerX = (this.canvasWidth / 2) - (this.width / 2)
        const centerY = (this.canvasHeight / 2) - (this.height / 2)
        super.draw(this.current_direction, frame * this.height, centerX, centerY)
    }
}



export default Hero