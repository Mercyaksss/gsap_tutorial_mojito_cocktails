'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import sliderleftleaf from '../../public/images/slider-left-leaf.png'
import sliderrightleaf from '../../public/images/slider-right-leaf.png'
import { sliderLists } from '@/constants'
import rightarrow from '../../public/images/right-arrow.png'
import leftarrow from '../../public/images/left-arrow.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Menu() {

    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'})

        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 100, ease: 'power1.inOut'})
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 100, ease: 'power1.inOut' })

    },[currentIndex]);

    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails; 

        setCurrentIndex(newIndex);
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const previousCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);
  return (
    <section id='menu' aria-labelledby='menu-heading'>
        <Image src={sliderleftleaf} alt='slider left leaf' id='m-left-leaf'/>   
        <Image src={sliderrightleaf} alt='slider right leaf' id='m-right-leaf' /> 

        <h2 id='menu-heading' className='sr-only'>Cocktail Menu</h2>  
        <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
            {sliderLists.map((cocktail, index) => {
                const isActive = index === currentIndex;

                return(
                    <button 
                        key={cocktail.id} 
                        className={`
                            ${isActive ? 'text-white border-white' : 
                            'text-white/50 border-white/50'}
                        `} onClick={() => goToSlide(index)}
                    >
                        {cocktail.name}
                    </button>
                )
            })}
        </nav>

        <div className='content'>
            <div className='arrows'>
                <button className='text-left' onClick={() => goToSlide(currentIndex - 1)}>
                    <span>{previousCocktail.name}</span>
                    <Image src={rightarrow} alt='right arrow' aria-hidden="true"/>
                </button>

                <button className='text-left' onClick={() => goToSlide(currentIndex + 1)}>
                    <span>{nextCocktail.name}</span>
                    <Image src={leftarrow} alt='left arrow' aria-hidden="true" />
                </button>
            </div>

            <div className='cocktail'>
                <Image src={currentCocktail.image} className='object-contain' width={500} height={600}  alt='cocktail image'/>
            </div>

            <div className='recipe'>
                <div ref={contentRef} className='info'>
                    <p>Recipe for:</p>
                    <p id='title'>{currentCocktail.name}</p>
                </div>

                <div className='details'>
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Menu