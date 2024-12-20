import React from 'react';
import './TermsOfService.css';

function TermsOfService() {
  return (
    <section className="terms-of-service">
      <h1 className="header">Terms of Service</h1>
      <p><strong>Last Updated: [Date]</strong></p>
      <p>
        Welcome to MentorMatrix! By signing up for and using our platform, you agree to the following terms. If you do not agree to these terms, please do not use our services.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using MentorMatrix, you confirm that you have read, understood, and agree to these Terms of Service and our Privacy Policy.
      </p>
      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old to register or use MentorMatrix. By using the platform, you affirm that you meet this requirement.
      </p>
      <h2>3. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and current information when registering.
      </p>
      <h2>4. Prohibited Activities</h2>
      <p>
        You agree not to violate applicable laws, use the platform for harmful activities, or post offensive content.
      </p>
      {/* Add additional terms as required */}
    </section>
  );
}

export default TermsOfService;
