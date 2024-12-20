import React, { useState } from "react";
import "./Certificates.css";

// Sample certificate data
const certificates = [
  {
    title: "Cybersecurity Basics Certificate",
    certificateImage: "/assets/certificate-cybersecurity.jpg",
    description: "Awarded after completing the Cybersecurity Basics session."
  },
  {
    title: "Web Development Essentials Certificate",
    certificateImage: "/assets/certificate-web-development.jpg",
    description: "Awarded after completing the Web Development Essentials session."
  },
  {
    title: "Cloud Computing Fundamentals Certificate",
    certificateImage: "/assets/certificate-cloud-computing.jpg",
    description: "Awarded after completing the Cloud Computing Fundamentals session."
  }
];

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Function to handle certificate view
  const handleViewCertificate = (certificateImage) => {
    setSelectedCertificate(certificateImage);
  };

  return (
    <div className="certificates">
      <h2>Certificates</h2>

      <div className="certificates-list">
        {certificates.map((certificate, index) => (
          <div key={index} className="certificate-item">
            <h3>{certificate.title}</h3>
            <p>{certificate.description}</p>
            <button
              className="view-certificate-btn"
              onClick={() => handleViewCertificate(certificate.certificateImage)}
            >
              View Certificate
            </button>
          </div>
        ))}
      </div>

      {/* Display certificate if selected */}
      {selectedCertificate && (
        <div className="certificate-modal">
          <div className="certificate-content">
            <button
              className="close-btn"
              onClick={() => setSelectedCertificate(null)}
            >
              X
            </button>
            <img
              src={selectedCertificate}
              alt="Certificate"
              className="certificate-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
