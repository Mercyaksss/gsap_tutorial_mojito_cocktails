import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
gsap.registerPlugin(ScrollTrigger, SplitText);  //activate the plugin from gsap

function page() {
  return (
    <main>
      <Navbar/>
      <Hero/>
    </main>
  );
}

export default page