import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

const Gallery = () => {
  const galleryRef = useRef([]);

  const images = [
    { id: 1, url: '/story1.jpg', size: 'tall', title: 'Energy in Motion' },
    { id: 2, url: '/story2.jpg', size: 'wide', title: 'Premium Quality' },
    { id: 3, url: '/story3.jpg', size: 'square', title: 'Global Impact' },
    { id: 4, url: '/story4.jpg', size: 'tall', title: 'Brand Heritage' },
    { id: 5, url: '/story5.jpg', size: 'square', title: 'Innovation' },
    { id: 6, url: '/story6.jpg', size: 'wide', title: 'The Future' }
  ];

  useEffect(() => {
    galleryRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <section className="gallery section-padding">
      <div className="container">
        <div className="gallery-header">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">
            Visual <span className="highlight">Story</span>
          </h2>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className={`gallery-item ${image.size}`}
              ref={el => galleryRef.current[index] = el}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <span>{image.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;