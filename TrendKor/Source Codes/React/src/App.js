import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyUsSection from './components/WhyUsSection';
import OurPeopleSection from './components/OurPeopleSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import { initLenis } from './utils/smoothScroll';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initLenis();

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        <HeroSection />
        <WhyUsSection />
        <OurPeopleSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
