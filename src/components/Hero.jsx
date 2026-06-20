import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const soundButtonRef = useRef(null);
  const volumeBarRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    );

    // Animate sound button
    gsap.fromTo(soundButtonRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 1.2 }
    );

    // Mouse parallax for video
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          x: x * 0.5,
          y: y * 0.5,
          rotation: x * 0.03,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Toggle sound on/off
  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      if (!newMutedState) {
        videoRef.current.volume = volume;
        if (videoRef.current.paused) {
          videoRef.current.play().catch(err => {
            console.log('Video play failed:', err);
          });
        }
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const rect = volumeBarRef.current.getBoundingClientRect();
    const y = (e.clientY - rect.top) / rect.height;
    const newVolume = Math.max(0, Math.min(1, 1 - y));
    
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Handle video hover
  const handleVideoEnter = () => {
    setIsHovering(true);
  };

  const handleVideoLeave = () => {
    setIsHovering(false);
  };

  // Update volume bar height
  const getVolumeHeight = () => {
    return isMuted ? 0 : volume * 100;
  };

  // Open links in new tab
  const openYouTube = () => {
    window.open('https://www.youtube.com/@redbull', '_blank', 'noopener,noreferrer');
  };

  const openWikipedia = () => {
    window.open('https://en.wikipedia.org/wiki/Red_Bull', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-glow"></div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div ref={titleRef} className="hero-title-wrapper">
            <h1 className="hero-title">
              GIVES YOU
              <br />
              <span className="highlight">WINGS</span>
            </h1>
          </div>
          
          <p ref={subtitleRef} className="hero-subtitle">
            Premium Energy Drink • Since 1987
            <br />
            <span className="hero-tagline">Vitalizes Body and Mind</span>
          </p>
          
          <div ref={ctaRef} className="hero-cta">
            <button 
              className="btn-primary"
              onClick={openWikipedia}
            >
              Discover More
            </button>
            <button 
              className="btn-secondary"
              onClick={openYouTube}
            >
              Watch Film
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div 
            className="hero-video" 
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
          >
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline
              className="hero-video-element"
              volume={volume}
            >
              <source src="/2a4017da325facf1715ea7d041a7c969.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hero-video-glow"></div>
            
            {/* Sound Control Button */}
            <button 
              ref={soundButtonRef}
              className={`hero-sound-btn ${isHovering ? 'visible' : ''}`}
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              <span className="sound-icon">
                {isMuted ? '🔇' : '🔊'}
              </span>
              <span className="sound-text">
                {isMuted ? 'Unmute' : 'Mute'}
              </span>
            </button>

            {/* Volume Control */}
            <div className={`hero-volume-control ${isHovering ? 'visible' : ''}`}>
              <div 
                className="volume-track"
                ref={volumeBarRef}
                onClick={handleVolumeChange}
              >
                <div 
                  className="volume-fill"
                  style={{ height: `${getVolumeHeight()}%` }}
                ></div>
              </div>
              <div className="volume-percentage">
                {Math.round(getVolumeHeight())}%
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;