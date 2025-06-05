import React, { useRef, useState } from 'react';
import emailjs                     from 'emailjs-com';


import './Pages.css';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const recaptchaValue = window.grecaptcha.getResponse();
    if (!recaptchaValue) {
      setStatus("⚠️ Please complete the reCAPTCHA.");
      return;
    }

    emailjs
      .sendForm(
        'service_06mc7re',
        'template_o2fbim9',
        formRef.current,
        'XFk9UskFe_CcfBuNs'
      )
      .then(() => {
        setStatus('✅ Message sent successfully!');
        formRef.current.reset();
        window.grecaptcha.reset();
      })
      .catch((error) => {
        console.error(error);
        setStatus('❌ Failed to send message. Try again.');
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="contact-input"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="contact-input"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="contact-textarea"
        ></textarea>

        <div
          className="g-recaptcha"
          data-sitekey="6LceklUrAAAAAFKpHRgOrb0QpVp5LYkun3BpkSHf"
        ></div>

        <button type="submit" className="contact-button">
          Send Message
        </button>
        <p
          className={`contact-status ${
            status.startsWith('✅')
              ? 'success'
              : status.startsWith('❌') || status.startsWith('⚠️')
              ? 'error'
              : ''
          }`}
        >
          {status}
        </p>
      </form>
    </div>
  );
};

export default Contact;
