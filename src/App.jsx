import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductIntro from './components/ProductIntro';
import Features from './components/Features';
import InteractiveShowcase from './components/InteractiveShowcase';
import Gallery from './components/Gallery';
import Specifications from './components/Specifications';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll on load
    });

    // Alternative: smooth scroll to top after a tiny delay for better UX
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);

    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
 <div className="app">
      <Navigation />
      <Hero />
      <ProductIntro />
      <InteractiveShowcase />
      <Gallery />
       <Story />
      <Features />
      <Specifications />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;

 