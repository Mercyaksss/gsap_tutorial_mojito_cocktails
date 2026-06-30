import gsap from 'gsap';  // imports gsap 
import { ScrollTrigger, SplitText } from 'gsap/all'; //imports the animation we wanna use 
import Navbar from './components/Navbar'; 
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
import About from './components/About';
gsap.registerPlugin(ScrollTrigger, SplitText);  //activate the plugin from gsap

function page() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Cocktails/>
      <About/>  
    </main>
  );
}

export default page