import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './InteractiveShowcase.css';

const InteractiveShowcase = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const labelRefs = useRef([]);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Video rotation on scroll
    gsap.to(videoRef.current, {
      rotation: 360,
      scale: 1.2,
      duration: 2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Labels floating animation
    labelRefs.current.forEach((label, index) => {
      gsap.fromTo(label,
        { opacity: 0, y: 30, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );
    });
  }, []);

  const labels = [
    { text: '80mg Caffeine', position: 'top-left' },
    { text: '1000mg Taurine', position: 'top-right' },
    { text: 'B-Vitamins', position: 'bottom-left' },
    { text: 'Zero Sugar', position: 'bottom-right' }
  ];

  return (
    <section className="showcase section-padding" ref={sectionRef}>
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-header">
            <span className="section-label">Interactive</span>
            <h2 className="section-title">
              Experience the<br />
              <span className="highlight">Energy</span>
            </h2>
          </div>

          <div className="showcase-product">
            <div className="product-container" ref={videoRef}>
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="showcase-video"
              >
                <source src="/e4d267b81f379e5eb3a073d1912bc002.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {labels.map((label, index) => (
              <div 
                key={index}
                className={`showcase-label ${label.position}`}
                ref={el => labelRefs.current[index] = el}
              >
                <div className="label-content glass">
                  <span className="label-text">{label.text}</span>
                </div>
                <div className="label-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;