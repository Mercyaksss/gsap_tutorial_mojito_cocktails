'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import heroleftleaf from '../../public/images/hero-left-leaf.png'
import herorightleaf from '../../public/images/hero-right-leaf.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import { useMediaQuery } from 'react-responsive'


function Hero() {
    const videoRef = useRef();
    const isMobile = useMediaQuery({ maxWidth: 767 });


    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });  //split text breaks out text into smaller prices so we can animate them individually
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines'});

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        //this block animates the title "MOJITO"
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out', 
            stagger: 0.06,
            delay: 1,
        });

        //animation for the leaves: defines when the animation starts
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })

        .to('.right-leaf', {y: 200}, 0)
        .to('.left-leaf', {y: -200}, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '163% top' : 'bottom top'; 


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true
            }
        });

        const setupScrub = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            });
        };

        if (videoRef.current.readyState >= 1) {
            setupScrub();
        } else {
            videoRef.current.onloadedmetadata = setupScrub;
        }
    }, []);

  return (
    <>
        <section id='hero' className='noisy'>
            <h1 className='title'> MOJITO </h1>

            <Image 
                src={heroleftleaf}
                alt='left-leaf'
                className='left-leaf'
            />

            <Image
                src={herorightleaf}
                alt='right-leaf'
                className='right-leaf'
            />

            <div className='body'>
                <div className='content'>
                    <div className='space-y-5 hidden md:block'>
                        <p>Cool. Crisp. Classic.</p>
                        <p className='subtitle'>Sip the Spirit <br/> of Summer</p>
                    </div>

                    <div className='view-cocktails'>
                        <p className='subtitle'>
                              Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
                              View cocktails
                        </p>
                        <a href='#cocktails'>View Cocktails</a>
                    </div>
                </div>
            </div>
        </section>

        <div className='video absolute inset-0'>
            <video 
                ref={videoRef}
                src='/videos/output.mp4'   
                muted 
                playsInline
                preload='auto'   
            />
        </div>
    </>
  )
}

export default Hero