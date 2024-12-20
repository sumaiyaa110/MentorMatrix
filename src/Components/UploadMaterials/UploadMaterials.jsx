import React, { useState } from 'react';
import './UploadMaterials.css';
import { FaCloudUploadAlt, FaTrash, FaEye } from 'react-icons/fa';

const UploadMaterials = () => {
  const [materials, setMaterials] = useState([]);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    setMaterials([...materials, ...files]);
  };

  const handleDelete = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
  };

  return (
    <div className="upload-materials-container">
      <header>Upload Materials</header>
      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-btn">
          <FaCloudUploadAlt size={30} /> Drag & Drop or Click to Upload
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
      <div className="materials-list">
        {materials.map((file, index) => (
          <div key={index} className="material-item">
            <span>{file.name}</span>
            <button><FaEye /></button>
            <button onClick={() => handleDelete(index)}><FaTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadMaterials;
