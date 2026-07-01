'use client'
import React from 'react'
import Image from 'next/image'
import footerrightleaf from '../../public/images/footer-right-leaf.png' 
import footerleftleaf from '../../public/images/footer-left-leaf.png' 
import { openingHours, socials } from '@/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText, ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger, SplitText);


function Contact() { 
    useGSAP(() => {
        const titleSplit = SplitText.create('.content h2', {type: 'words'});

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact .content',
                start: 'top center',
            },
            ease: 'power1.inOut'
        })

        timeline
        .from(titleSplit.words, {opacity: 0, yPercent: 100, stagger: 0.02})
        .from('#contact h3, .content p', { opacity: 0, yPercent: 100, stagger: 0.02})
        .to('#f-right-leaf', {y: '-50', duration: 1, ease: 'power1.inOut'})
        .to('#f-left-leaf', { y: '-50', duration: 1, ease: 'power1.inOut' })

    })
  return (
    <footer id='contact'>
        <Image src={footerrightleaf} alt='right-leaf' id='f-right-leaf'/>
        <Image src={footerleftleaf} alt='left-leaf' id='f-left-leaf' />

        <div className='content'>
            <h2>Where To Find Us</h2>

            <div>
                <h3>Visit Our Bar</h3>
                <p>456, Raq Blvd, #404, Los Angeles, CA 90210</p>
            </div>

            <div>
                <h3>Contact Us</h3>
                <p>(555) 987 6543</p>
                <p>hello@jsmocktail.com</p>
            </div>

            <div>
                <h3>Open Every Day</h3>
                {openingHours.map((time) => (
                    <p key={time.day}>
                        {time.day} : {time.time}
                    </p>
                ))}
            </div>

            <div>
                <h3>Socials</h3>

                <div className='flex-center gap-5'>
                    {socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.utl}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={social.icon}
                        >
                            <Image src={social.icon} width={40} height={40} alt='social icon'/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Contact