import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="footer">
      <div className="padding-global">
        <div className="container-xlarge">
          <div className="padding-section-small">
            <div className="footer_component">
              <div className="footer_content">
                <div className="footer_logo-section">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 42" className="footer_logo">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M-0.000976562 42.0099H87.359V19.374H-0.000976562V42.0099Z" fill="#7AC100" />
                    <path fillRule="evenodd" clipRule="evenodd"
                      fill="white" className="logo-frank" />
                  </svg>
                </div>
                
                <div className="footer_links">
                  <div className="footer_links-column">
                    <h4>Company</h4>
                    <a href="/about">About Us</a>
                    <a href="/team">Our Team</a>
                    <a href="/careers">Careers</a>
                  </div>
                  
                  <div className="footer_links-column">
                    <h4>Resources</h4>
                    <a href="/insights">Insights</a>
                    <a href="/news">News</a>
                    <a href="/blog">Blog</a>
                  </div>
                  
                  <div className="footer_links-column">
                    <h4>Contact</h4>
                    <a href="/contact">Get in Touch</a>
                    <a href="/locations">Locations</a>
                    <a href="/support">Support</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer_bottom">
              <a href="/" aria-label="navigate to home" className="footer_logo-link">
                <span>TrendKor</span>
              </a>
              
              <div className="footer_copyright">
                <p>&copy; <span data-current-year>{currentYear}</span> TrendKor. All rights reserved.</p>
              </div>
              
              <div className="footer_social">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
