import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductIntro.css';

const ProductIntro = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      }
    );

    gsap.fromTo(titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        }
      }
    );

    gsap.fromTo(descRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 25%',
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section className="product-intro section-padding" ref={sectionRef} id="products">
      <div className="container">
        <div className="intro-layout">
          {/* Text Content - First on Mobile */}
          <div className="intro-text" ref={textRef}>
            <span className="section-label">The Original</span>
            <h2 className="section-title" ref={titleRef}>
              Red Bull<br />
              <span className="highlight">Energy Drink</span>
            </h2>
            <p className="intro-description" ref={descRef}>
              Red Bull Energy Drink is appreciated worldwide by top athletes, 
              busy professionals, students and travelers on long journeys.
              The unique formula contains high-quality ingredients that 
              vitalize body and mind.
            </p>
            <div className="intro-stats">
              <div className="stat-item">
                <span className="stat-number">80mg</span>
                <span className="stat-label">Caffeine</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000mg</span>
                <span className="stat-label">Taurine</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">110</span>
                <span className="stat-label">Calories</span>
              </div>
            </div>
          </div>

          {/* Image - Second on Mobile */}
          <div className="intro-image" ref={imageRef}>
            <img 
              src="/redbull1.jpg" 
              alt="Red Bull Product"
            />
            <div className="intro-image-badge">
              <span>Since 1987</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductIntro;