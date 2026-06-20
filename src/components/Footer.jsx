import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef();

  // EmailJS Configuration - Replace with your actual IDs
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE';

  // Email validation with proper format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validate email format
    if (!email || email.trim() === '') {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('⚠️ Please enter a valid email address (e.g., name@domain.com)');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const templateParams = {
        email: email.trim(),
        name: 'Red Bull Fan',
        message: 'You have successfully subscribed to Red Bull newsletter!',
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setMessage('✅ You have successfully subscribed to Red Bull!');
        setMessageType('success');
        setShowPopup(true); // Show the popup
        setEmail('');
        
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      } else {
        setMessage('❌ Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Email error:', error);
      setMessage('❌ Failed to subscribe. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close popup manually
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img 
              src="/Red-Bull-Logo-Transparent.png" 
              alt="Red Bull Logo" 
              className="footer-logo-image"
            />
            <div className="footer-brand-text">
              <h2 className="footer-brand-name">RED BULL</h2>
              <p>Vitalizes Body and Mind</p>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Energized</h4>
            <p>Subscribe to our newsletter for exclusive updates</p>
            <form ref={formRef} className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={messageType === 'error' ? 'error' : ''}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <div className={`newsletter-message ${messageType}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-links">
            <div className="footer-column">
              <h4>Products</h4>
              <a href="https://www.redbull.com/int-en/energydrink" target="_blank" rel="noopener noreferrer">Energy Drinks</a>
              <a href="https://www.redbull.com/int-en/energydrink/sugarfree" target="_blank" rel="noopener noreferrer">Sugar-Free</a>
              <a href="https://www.redbull.com/int-en/energydrink/zero" target="_blank" rel="noopener noreferrer">Red Bull Zero</a>
              <a href="https://www.redbull.com/int-en/energydrink/editions" target="_blank" rel="noopener noreferrer">Editions</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="https://www.redbull.com/int-en/about" target="_blank" rel="noopener noreferrer">About</a>
              <a href="https://jobs.redbull.com" target="_blank" rel="noopener noreferrer">Careers</a>
              <a href="https://www.redbullmediahouse.com" target="_blank" rel="noopener noreferrer">Media House</a>
              <a href="https://www.redbull.com/int-en/contact" target="_blank" rel="noopener noreferrer">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Follow Us</h4>
              <a href="https://www.youtube.com/@redbull" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.instagram.com/redbull" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/redbull" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.tiktok.com/@redbull" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="https://www.redbull.com/int-en/energydrink/contact-assistant" target="_blank" rel="noopener noreferrer">Help Center</a>
              <a href="https://www.redbull.com/int-en/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://www.redbull.com/int-en/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>
              <a href="https://www.redbullshop.com" target="_blank" rel="noopener noreferrer">Official Shop</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Red Bull. All rights reserved.</p>
          <p className="footer-tagline">⚡ Gives You Wings</p>
        </div>
      </div>

      {/* ============================================
          SUCCESS POPUP MODAL
          ============================================ */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            
            <div className="popup-logo">
              <img 
                src="/Red-Bull-Logo-Transparent.png" 
                alt="Red Bull Logo" 
                className="popup-logo-image"
              />
            </div>
            
            <h2 className="popup-title">You're Subscribed! 🎉</h2>
            
            <p className="popup-message">
              Welcome to the Red Bull family! 
              <br />
              <span>You'll receive exclusive updates, offers, and content.</span>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;