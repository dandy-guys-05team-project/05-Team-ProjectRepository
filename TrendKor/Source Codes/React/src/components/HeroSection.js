import React, { useRef, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error);
        
        // Try to play on user interaction
        const playOnInteraction = () => {
          videoRef.current?.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
      });
    }
  }, []);

  return (
    <header className="sliding-hero-video_wrapper">
      <div className="section_hero-sliding-video">
        <div className="container-xlarge">
          {/* Video Background */}
          <div className="trendkor-video-wrapper">
            <video
              ref={videoRef}
              className="trendkor-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/LandingPageVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Text Content */}
          <div className="trendkor-text-container">
            <h1 className="trendkor-title">TrendKor</h1>
            <p className="trendkor-subtitle">
              Discover the Latest Korean Trends
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
