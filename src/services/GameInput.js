import { Subject } from "rxjs"

class GameInput {

    _arrowDownSubject = new Subject()
    _arrowUpSubject = new Subject()
    _arrowRightSubject = new Subject()
    _arrowLeftSubject = new Subject()

    constructor() {
        this.initListeners()
    }

    initListeners() {
        document.addEventListener('keydown', this.keyPressListener.bind(this))
        document.addEventListener('keyup', this.keyPressListener.bind(this))
    }

    keyPressListener(event) {
        if (['w', 'W', 'ArrowUp'].indexOf(event.key) !== -1) {
            this.sendArrowUp(event.type)
        }
        if (['s', 'S', 'ArrowDown'].indexOf(event.key) !== -1) {
            this.sendArrowDown(event.type)
        }
        if (['d', 'D', 'ArrowRight'].indexOf(event.key) !== -1) {
            this.sendArrowRight(event.type)
        }
        if (['a', 'A', 'ArrowLeft'].indexOf(event.key) !== -1) {
            this.sendArrowLeft(event.type)
        }
    }

    getArrowDown$() { return this._arrowDownSubject.asObservable() }
    sendArrowDown(event) { this._arrowDownSubject.next(event) }
    getArrowUp$() { return this._arrowUpSubject.asObservable() }
    sendArrowUp(event) { this._arrowUpSubject.next(event) }
    getArrowRight$() { return this._arrowRightSubject.asObservable() }
    sendArrowRight(event) { this._arrowRightSubject.next(event) }
    getArrowLeft$() { return this._arrowLeftSubject.asObservable() }
    sendArrowLeft(event) { this._arrowLeftSubject.next(event) }

}

export default GameInput