import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInverted, setIsInverted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Check if at top and on dark header
      if (scrollPosition === 0) {
        setIsInverted(true);
      } else {
        setIsInverted(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isInverted ? 'inverted' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar_component">
        <div className="nav-max-width">
          <a href="/" aria-label="navigate to home" className="navbar_logo-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 42" className="navbar_logo">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M-0.000976562 42.0099H87.359V19.374H-0.000976562V42.0099Z" fill="#7AC100" />
              <path fillRule="evenodd" clipRule="evenodd"
                fill="currentColor" className="logo-frank" />
            </svg>
          </a>
          
          <div className="navbar_menu">
            <div className="nav-links_wrapper">
              <a href="/the-jf-difference" className="navbar_link">The JF Difference</a>
              <a href="/what-we-do" className="navbar_link">What We Do</a>
              <a href="/our-people" className="navbar_link">Our People</a>
              <a href="/insights" className="navbar_link">Insights</a>
              <a href="/contact" className="navbar_link">Contact</a>
            </div>
            
            <div className="navbar_hamburguer-icon" onClick={toggleMenu}>
              <div className="hamburguer_first-line"></div>
              <div className="hamburguer_second-line"></div>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="navbar_side-panel">
              <div className="side-menu_x-icon" onClick={toggleMenu}>
                <span>×</span>
              </div>
              <div className="navbar_side-menu">
                <a href="/the-jf-difference" className="side-menu_link">The JF Difference</a>
                <a href="/what-we-do" className="side-menu_link">What We Do</a>
                <a href="/our-people" className="side-menu_link">Our People</a>
                <a href="/insights" className="side-menu_link">Insights</a>
                <a href="/contact" className="side-menu_link">Contact</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
