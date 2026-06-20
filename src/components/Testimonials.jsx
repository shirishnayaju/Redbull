import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const testimonials = [
    {
      name: 'Max Verstappen',
      role: 'F1 World Champion',
      content: 'Red Bull gives me the energy I need to perform at the highest level. It\'s my go-to drink during race weekends.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      role: 'Professional Athlete',
      content: 'The perfect balance of ingredients helps me push through intense training sessions and stay focused on my goals.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100&fit=crop'
    },
    {
      name: 'David Chen',
      role: 'Entrepreneur',
      content: 'When I need to stay sharp during long work days, Red Bull is my trusted companion. It keeps me energized and productive.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100&fit=crop'
    }
  ];

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Auto slide
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="testimonials section-padding" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What People <span className="highlight">Say</span>
          </h2>
        </div>

        <div className="testimonials-slider">
          <div 
            className="testimonials-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial-card glass"
                ref={el => cardRefs.current[index] = el}
              >
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div>
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;