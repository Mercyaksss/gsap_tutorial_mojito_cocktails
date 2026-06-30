'use client'
import gsap from 'gsap';
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { SplitText, ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
gsap.registerPlugin(ScrollTrigger, SplitText);  //activate the plugin from gsap


function Hero() {
    const videoRef = useRef();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useGSAP(()=>{
        const heroSplit = new SplitText('.title', { type: 'chars, words' });  //split text helps us split the text into smaller pieces so we can animate it individually
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {  //the 'from' block defines where the animation is starting from
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger:'#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        });

        const setupScrub = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            });
        };

        if (videoRef.current.readyState >= 1) {
            // metadata already loaded by the time this runs
            setupScrub();
        } else {
            videoRef.current.onloadedmetadata = setupScrub;
        }    

    }, []);   //the empty array mean that this block only has to run at the start
  return (
   <>
        <section id='hero' className='noisy'>
            <h1 className='title'>MOJITO</h1>

            <Image 
                src='/images/hero-left-leaf.png'
                alt='left-leaf'
                className='left-leaf'
                width={200}
                height={200}
            />
            <Image 
                src='/images/hero-right-leaf.png'
                alt='right-leaf'
                className='right-leaf'
                width={256}
                height={256}
            />

            <div className='body'>
                  <div className='content'>
                    <div className='space-y-5 hidden md:block'>
                        <p> Cool. Crisp. Classic.</p>
                        <p className='subtitle'> Sip the Spirit <br/> of Summer</p>
                    </div>

                    <div className='view-cocktails'>
                        <p className='subtitle'>
                            Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. 
                        </p>
                        <a href='#cocktails'>View Cocktails</a>
                    </div>
                </div>
            </div>
        </section>
        <div className='video absolute inset-0'>
            <video
                ref={videoRef}
                src='/videos/input.mp4'
                muted
                playsInline
                preload='auto'
            />
        </div>
   </>
  )
}

export default Hero