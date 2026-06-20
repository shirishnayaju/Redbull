import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Story.css';

const Story = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const linesRef = useRef([]);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  const storyLines = [
    "Red Bull was born in 1987",
    "From a simple idea to a global phenomenon",
    "Inspired by the energy of Thai herbal drinks",
    "Now fueling champions worldwide",
    "Giving wings to people and ideas"
  ];

  const storyContent = [
    {
      title: "The Vision",
      text: "Red Bull was created with a single vision: to give people wings. What started as a small idea in Austria has grown into a global movement, inspiring millions to push their limits and achieve the extraordinary."
    },
    {
      title: "The Journey",
      text: "From the streets of Bangkok to the world's biggest stages, Red Bull has been the driving force behind athletes, artists, and innovators. Our journey is one of passion, dedication, and an unwavering belief in the power of human potential."
    },
    {
      title: "The Philosophy",
      text: "At Red Bull, we believe that energy is more than just a drink. It's a state of mind. It's the courage to dream big, the determination to overcome obstacles, and the joy of living life to the fullest."
    }
  ];

  // Open links in new tab
  const openYouTube = () => {
    window.open('https://www.youtube.com/@redbull', '_blank', 'noopener,noreferrer');
  };

  const openWikipedia = () => {
    window.open('https://en.wikipedia.org/wiki/Red_Bull', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    // Video parallax effect
    gsap.to(videoRef.current, {
      scale: 1.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Text reveals line by line
    linesRef.current.forEach((line, index) => {
      gsap.fromTo(line,
        { opacity: 0, y: 50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    });

    // Animate the heading
    gsap.fromTo('.story-heading',
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );

    // Animate content paragraphs
    const contentParagraphs = contentRef.current?.querySelectorAll('.story-content-block');
    contentParagraphs?.forEach((block, index) => {
      gsap.fromTo(block,
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <section className="story section-padding" id="story-section" ref={sectionRef}>
      {/* Video Background */}
      <video 
        ref={videoRef}
        className="story-video-bg" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/1e52431f2cc5e491b2c230aa71af72bf_720w.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="story-overlay"></div>
      
       <div className="container">
        <div className="story-content" ref={textRef}>
          <span className="section-label">..............</span>
          
          {/* Large Gradient Heading */}
          <h2 className="story-heading">
            <span className="heading-gradient">Red Bull</span>
            <span className="heading-gradient">Our Story</span>
          </h2>
          
          <div className="story-text">
            {storyLines.map((line, index) => (
              <p 
                key={index}
                className="story-line"
                ref={el => linesRef.current[index] = el}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Additional Content */}
          <div className="story-detailed-content" ref={contentRef}>
            {storyContent.map((item, index) => (
              <div key={index} className="story-content-block">
                <h3 className="content-block-title">{item.title}</h3>
                <p className="content-block-text">{item.text}</p>
                <div className="content-block-line"></div>
              </div>
            ))}
          </div>
          
          <div className="story-cta">
            <button className="btn-primary" onClick={openWikipedia}>Discover More</button>
            <button className="btn-secondary" onClick={openYouTube}>Watch Film</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;