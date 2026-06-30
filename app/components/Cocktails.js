'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { cocktailLists, mockTailLists } from '../../constants/index.js'

function Cocktails() {
    useGSAP(() => {
        const parallaxTimeLine = gsap.timeline({
            scrollTrigger:{ // type of trigger or animation
                trigger: '#cocktails', // element we wanna target
                start: 'top 30%', //start when the top section reaches 30% of the view port
                end: 'bottom 80%', //ends when the bottom is at 80% of the view port height
                scrub: true, //the animation starts on scroll
            }
        })

        parallaxTimeLine
            .from('#c-left-leaf', {
                x: 100, y: 100
        })
        .from('#c-right-leaf', {
            x: 100, y: 100
        })
    }) 

  return (
<section className='noisy' id='cocktails'>
    <Image src="/images/cocktail-left-leaf.png"  alt="Cocktail left Leaf" width={317} height={317} id='c-left-leaf'/>
    <Image src="/images/cocktail-right-leaf.png" alt="Cocktail right Leaf" width={317} height={317} id='c-right-leaf' />

    <div className='list'>
        <div className='popular'>
            <h2>Most Popular Cocktails:</h2>

            <ul>
                {cocktailLists.map(({name, country, detail, price})=>(
                    <li key={name}>
                        <div className="md:me-28">
                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>
                        </div>
                        <span>- {price}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className='loved'>
            <h2>Most Loved Mocktails:</h2>

            <ul>
                {mockTailLists.map(({ name, country, detail, price }) => (
                    <li key={name}>
                        <div className="md:me-28">
                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>
                        </div>
                        <span>- {price}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
</section>
  )
}

export default Cocktails