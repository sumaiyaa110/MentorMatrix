import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <section className="privacy-policy">
      <h1 className="header">Privacy Policy</h1>
      <p><strong>Last Updated: [Date]</strong></p>
      <p>
        At MentorMatrix, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
      </p>
      <h2>1. Information We Collect</h2>
      <p>
        We collect personal information such as your name, email address, and usage data to provide better services.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>
        Your information is used to improve our services, communicate with you, and ensure platform security.
      </p>
      <h2>3. Data Security</h2>
      <p>
        We implement robust measures to protect your data, but no system is 100% secure.
      </p>
      <h2>4. Your Rights</h2>
      <p>
        You can access, update, or delete your personal information at any time.
      </p>
      {/* Add additional privacy sections as required */}
    </section>
  );
}

export default PrivacyPolicy;
