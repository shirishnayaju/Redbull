import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

const Features = () => {
  const featuresRef = useRef([]);

  const features = [
    {
      icon: '⚡',
      title: 'Taurine',
      description: '1000mg of taurine per 250ml can',
      detail: 'Taurine is an amino acid that occurs naturally in the body and helps support energy metabolism and athletic performance.',
      accuracy: 'Red Bull contains 1000mg of taurine per 8.4 fl oz (250ml) can.',
      source: 'Red Bull Official'
    },
    {
      icon: '☕',
      title: 'Caffeine',
      description: '80mg of caffeine per 250ml can',
      detail: 'Caffeine is a naturally occurring substance found in over 60 plants. It is known for its stimulating effects on the central nervous system.',
      accuracy: 'Red Bull contains 80mg of caffeine per 8.4 fl oz (250ml) can, equivalent to a cup of coffee.',
      source: 'Red Bull Official'
    },
    {
      icon: '💊',
      title: 'B-Group Vitamins',
      description: 'Essential B-vitamins for energy',
      detail: 'Red Bull contains B3 (niacin), B5 (pantothenic acid), B6, and B12 which contribute to normal energy-yielding metabolism and reduce tiredness.',
      accuracy: 'B-vitamins help convert food into energy and support proper nervous system function.',
      source: 'Red Bull Official'
    },
    {
      icon: '🫧',
      title: 'Carbonated Water',
      description: 'Pure carbonated water base',
      detail: 'Red Bull uses high-quality carbonated water as its base, providing the refreshing effervescence that makes it uniquely enjoyable.',
      accuracy: 'Carbonated water gives Red Bull its signature crisp and refreshing taste.',
      source: 'Red Bull Official'
    },
    {
      icon: '🍯',
      title: 'Sugars',
      description: 'Glucose & Sucrose blend',
      detail: 'Red Bull contains a precise blend of glucose and sucrose (table sugar) which are quickly absorbed by the body for immediate energy.',
      accuracy: 'Red Bull contains 27g of sugars per 8.4 fl oz (250ml) can, providing quick energy.',
      source: 'Red Bull Official'
    },
    {
      icon: '🧪',
      title: 'Natural Flavors',
      description: 'Premium natural flavorings',
      detail: 'Red Bull uses carefully selected natural flavors to create its distinctive and iconic taste that is recognized worldwide.',
      accuracy: 'Natural flavors are used to create the signature Red Bull taste without artificial additives.',
      source: 'Red Bull Official'
    }
  ];

  useEffect(() => {
    featuresRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <section className="features section-padding" id="features">
      <div className="container">
        <div className="features-header">
          <span className="section-label">The Science Behind</span>
          <h2 className="section-title">
            The <span className="highlight">Energy</span>
          </h2>
          <p className="section-subtitle">
            Every can of Red Bull is carefully crafted with premium ingredients
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card glass"
              ref={el => featuresRef.current[index] = el}
            >
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <p className="feature-detail">{feature.detail}</p>
              <div className="feature-accuracy">
                <span className="accuracy-icon">✓</span>
                <span className="accuracy-text">{feature.accuracy}</span>
              </div>
              <div className="feature-source">{feature.source}</div>
              <div className="feature-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;