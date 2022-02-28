import './style.scss'
import { useEffect, useRef } from 'react'
import GameObject from '../../services/GameObject'

import HeroSrc from '../../assets/characters/george.png'
import Room1Src from '../../assets/maps/room1.png'

import Hero from '../../services/Hero'
import Room from '../../services/Room'
import GameInput from '../../services/GameInput'


function Game() {

    const canvasEl = useRef()
    let ctx = null
    let room = null
    let hero = null
    const gameInput = new GameInput()

    useEffect(async () => {
        ctx = canvasEl.current.getContext('2d')
        ctx.imageSmoothingEnabled = false
        room = await createRoom()
        hero = await createHero()

        const heroSub = hero.getDraw().subscribe(draw)
        const roomSub = room.getDraw().subscribe(draw)

        draw()

        return () => { 
            hero.releaseSubscriptions()
            heroSub.unsubscribe()
            room.releaseSubscriptions()
            roomSub.unsubscribe()
        }
    }, [canvasEl.current])

    function draw() {
        ctx.clearRect(0, 0, 300, 200)
        room.draw()
        hero.draw()
    }

    async function createHero() {
        return new Promise(async (resolve) => {      
            const heroConfig = {
                ctx,
                sprite: await loadImage(HeroSrc),
                width: 48,
                height: 48
            }
            resolve(new Hero(heroConfig))
        })
    }

    async function createRoom() {
        return new Promise(async (resolve) => {
            const roomConfig = {
                ctx,
                sprite: await loadImage(Room1Src),
                width: 200,
                height: 200
            }
            resolve(new Room(roomConfig))
        })
    }

    function loadImage(imgSource) {
        return new Promise((res) => {
            const image = new Image()
            image.src = imgSource
            image.onload = () => res(image)
        })
    }

    return (
        <section className='game-component'>
            <canvas ref={canvasEl} width={300} height={200} />
        </section>
    )
}

export default Game