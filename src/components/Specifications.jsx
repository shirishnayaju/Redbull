import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Specifications.css';

const Specifications = () => {
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);
  const progressRefs = useRef([]);
  const [countersAnimated, setCountersAnimated] = useState(false);

  const specs = [
    { 
      label: 'Caffeine', 
      value: 80, 
      unit: 'mg',
      description: 'Per 8.4 fl oz (250ml) can',
      detail: 'Equivalent to a cup of coffee. Provides alertness and focus.',
      icon: '☕'
    },
    { 
      label: 'Taurine', 
      value: 1000, 
      unit: 'mg',
      description: 'Per 8.4 fl oz (250ml) can',
      detail: 'An amino acid that supports energy metabolism and athletic performance.',
      icon: '⚡'
    },
    { 
      label: 'Calories', 
      value: 110, 
      unit: 'kcal',
      description: 'Per 8.4 fl oz (250ml) can',
      detail: 'From 27g of sugars for quick energy release.',
      icon: '🔥'
    },
    { 
      label: 'Sugars', 
      value: 27, 
      unit: 'g',
      description: 'Per 8.4 fl oz (250ml) can',
      detail: 'Glucose and sucrose blend for immediate energy.',
      icon: '🍯'
    },
    { 
      label: 'B-Vitamins', 
      value: 100, 
      unit: '%',
      description: 'B3, B5, B6 & B12',
      detail: 'Essential vitamins for energy metabolism and nervous system.',
      icon: '💊'
    },
    { 
      label: 'Serving Size', 
      value: 250, 
      unit: 'ml',
      description: 'Standard can size',
      detail: '8.4 fl oz can for the perfect energy boost.',
      icon: '📦'
    }
  ];

  const comparisons = [
    { label: 'Caffeine Source', value: 'Coffee Beans' },
    { label: 'Gluten-Free', value: '✓ Yes' },
    { label: 'Vegetarian', value: '✓ Suitable' },
    { label: 'Artificial Colors', value: '✗ None' },
    { label: 'Preservatives', value: '✗ None' },
    { label: 'Certified', value: 'ISO 22000' }
  ];

  // Function to animate counters
  const animateCounters = () => {
    if (countersAnimated) return;
    setCountersAnimated(true);

    // Animate counters
    counterRefs.current.forEach((counter, index) => {
      const targetValue = specs[index].value;
      const duration = 2000;
      const startTime = performance.now();
      
      const animateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = eased * targetValue;
        
        if (targetValue % 1 === 0) {
          counter.innerText = Math.round(currentValue);
        } else {
          counter.innerText = currentValue.toFixed(1);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          if (targetValue % 1 === 0) {
            counter.innerText = Math.round(targetValue);
          } else {
            counter.innerText = targetValue.toFixed(1);
          }
        }
      };
      
      requestAnimationFrame(animateCounter);
    });

    // Animate progress bars
    const maxValue = Math.max(...specs.map(s => s.value));
    progressRefs.current.forEach((progress, index) => {
      const percentage = (specs[index].value / maxValue) * 100;
      setTimeout(() => {
        progress.style.width = `${percentage}%`;
      }, 300 + index * 150);
    });
  };

  useEffect(() => {
    // Use both Intersection Observer and ScrollTrigger for maximum compatibility
    let observer = null;
    let scrollTrigger = null;

    // Method 1: Intersection Observer (works on mobile)
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Method 2: GSAP ScrollTrigger (works on PC)
    scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        animateCounters();
      },
      once: true
    });

    // Check if already visible on load
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        setTimeout(animateCounters, 500);
      }
    }

    return () => {
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section className="specifications section-padding" ref={sectionRef}>
      <div className="container">
        <div className="spec-header">
          <span className="section-label">Specifications</span>
          <h2 className="section-title">
            Technical <span className="highlight">Details</span>
          </h2>
          <p className="section-subtitle">
            Every ingredient measured for optimal performance
          </p>
        </div>

        <div className="spec-grid">
          {specs.map((spec, index) => (
            <div key={index} className="spec-item">
              <div className="spec-header-row">
                <div className="spec-label-group">
                  <div className="spec-label-icon">
                    <span className="spec-icon">{spec.icon}</span>
                    <span className="spec-label">{spec.label}</span>
                  </div>
                  <span className="spec-description">{spec.description}</span>
                </div>
                <div className="spec-value-group">
                  <span 
                    className="spec-value"
                    ref={el => counterRefs.current[index] = el}
                  >
                    0
                  </span>
                  <span className="spec-unit">{spec.unit}</span>
                </div>
              </div>
              <div className="spec-progress">
                <div 
                  className="spec-progress-fill"
                  ref={el => progressRefs.current[index] = el}
                  style={{ width: '0%' }}
                ></div>
              </div>
              <p className="spec-detail">{spec.detail}</p>
            </div>
          ))}
        </div>

        <div className="spec-comparison">
          {comparisons.map((item, index) => (
            <div key={index} className="comparison-item">
              <span className="comparison-label">{item.label}</span>
              <span className="comparison-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specifications;