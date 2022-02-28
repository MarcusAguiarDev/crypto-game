import './style.scss'
import { useEffect, useRef } from 'react'
import GameObject from '../../services/GameObject'

import HeroSrc from '../../assets/characters/george.png'
import Hero from '../../services/Hero'

function Game() {

    const canvasEl = useRef()

    useEffect(async () => {
        const hero = await createHero()

        return hero.clearTimers()
    }, [canvasEl.current])

    async function createHero() {
        return new Promise(async (resolve) => {
            const ctx = canvasEl.current.getContext('2d')
            const heroConfig = {
                ctx,
                sprite: await loadImage(HeroSrc),
                width: 48,
                height: 48
            }
            resolve(new Hero(heroConfig))
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