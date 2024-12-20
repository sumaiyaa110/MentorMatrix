import React from "react";
import "./ContactUs.css"; // CSS file for styling the Contact Us page

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us-header">
        <h1>Contact Us</h1>
        <p className="subheading">We'd love to hear from you!</p>
      </div>

      {/* Existing Features */}
      <p>If you have any questions, feel free to reach out to us!</p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:support@mentormatrixplatform.com">support@mentormatrixplatform.com</a>
      </p>
      <p>
        <strong>Phone:</strong> +880 123 456 7890
      </p>
      <p>
        <strong>Address:</strong> Pahartoli, Raozan-4349, Chittagong, Bangladesh
      </p>
      <p>Follow us on social media:</p>
      <ul className="social-links">
        <li>
          <a href="https://www.linkedin.com/company/mentomatrix" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
              <path d="M19 0H5C2.25 0 0 2.25 0 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5V5c0-2.75-2.25-5-5-5zM7.5 19h-3V9h3v10zM6 7.5C4.89 7.5 4 6.61 4 5.5S4.89 3.5 6 3.5 8 4.39 8 5.5 7.11 7.5 6 7.5zm13 11.5h-3v-4.75c0-2.25-3-2.08-3 0V19h-3V9h3v1.33C13.92 9 17 8.88 17 12.25V19z"/>
            </svg>
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/mentomatrix" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
              <path d="M22.676 0H1.326C.595 0 0 .592 0 1.318v21.364C0 23.408.595 24 1.326 24h11.492v-9.294H9.906v-3.631h2.912V8.412c0-2.889 1.768-4.464 4.348-4.464 1.236 0 2.298.092 2.608.134v3.028l-1.789.001c-1.403 0-1.674.666-1.674 1.644v2.153h3.345l-.436 3.631h-2.909V24h5.705C23.406 24 24 23.408 24 22.682V1.318C24 .592 23.406 0 22.676 0z"/>
            </svg>
            Facebook
          </a>
        </li>
      </ul>

      {/* New Contact Form */}
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Interactive Map */}
      <div className="contact-map">
        <h2>Our Location</h2>
        <iframe
          title="MentorMatrix Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.848979658709!2d90.36650731543196!3d23.75155169481408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89480a4f957%3A0xc2f6e4d1bfb1548!2sChittagong!5e0!3m2!1sen!2sbd!4v1234567890123"
          width="100%"
          height="300"
          style={{ border: "0", borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer Section */}
      <div className="contact-footer">
        <p>Thank you for choosing MentorMatrix!</p>
      </div>
    </div>
  );
};

export default ContactUs;





