import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const faqRefs = useRef([]);

  const faqs = [
    {
      question: 'How much caffeine is in Red Bull?',
      answer: 'A standard 8.4 fl oz (250ml) can of Red Bull contains 80mg of caffeine, which is about the same as a cup of coffee.'
    },
    {
      question: 'Is Red Bull suitable for vegetarians?',
      answer: 'Yes, Red Bull is suitable for vegetarians. All ingredients are plant-based and the product is certified vegetarian.'
    },
    {
      question: 'Does Red Bull contain gluten?',
      answer: 'No, Red Bull is gluten-free and safe for people with celiac disease or gluten sensitivity.'
    },
    {
      question: 'How many calories are in Red Bull?',
      answer: 'A standard 8.4 fl oz (250ml) can contains 110 calories. The Sugar-Free version has only 10 calories.'
    },
    {
      question: 'Can I drink Red Bull while pregnant?',
      answer: 'We recommend consulting your healthcare provider before consuming any caffeinated products during pregnancy.'
    }
  ];

  useEffect(() => {
    faqRefs.current.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq section-padding" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">
            Frequently Asked <span className="highlight">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about Red Bull
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="faq-item"
              ref={el => faqRefs.current[index] = el}
            >
              <button 
                className={`faq-question ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div 
                className={`faq-answer ${openIndex === index ? 'open' : ''}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;