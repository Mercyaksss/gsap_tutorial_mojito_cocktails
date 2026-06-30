import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
gsap.registerPlugin(ScrollTrigger, SplitText);  //activate the plugin from gsap

function page() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Cocktails/>
    </main>
  );
}

export default page