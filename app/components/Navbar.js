'use client'
import gsap from "gsap"; // imports gsap
import { ScrollTrigger } from "gsap/all";  //imports the animation we wanna use 
import { navLinks } from "@/constants";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin( ScrollTrigger );  //activate the plugin from gsap


function Navbar() {
    useGSAP(() =>{

        // gsap.timeline defines when the animation starts
        const navTween = gsap.timeline({
            scrollTrigger: {     // specific animation
                trigger: 'nav',  // element we wanna animate
                start: 'bottom top',  //animation will start when the bottom of the nav reaches the top od the view port
                scrub: true,
            }
        });

        // this block determines what happens when the animation starts
        navTween.fromTo('nav', { backgroundColor: 'transparent'}, {  // this line defines what state the animation starts 
            backgroundColor: '#00000050',
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    })
  return (
   <nav>
    <div>
        <a href="#home" className="flex items-center gap-2">
            <Image width={32} height={32} src='/images/logo.png' alt="logo"/>
            <p>Velvet Pour</p>
        </a>

        <ul>
            {navLinks.map((link) => (
                <li key={link.id}>
                    <a href="{`#${link.id}`}">{link.title}</a>
                </li>
            ))}
        </ul>
    </div>
   </nav>
  )
}

export default Navbar