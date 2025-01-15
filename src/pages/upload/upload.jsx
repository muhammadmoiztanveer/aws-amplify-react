import React, { useState } from 'react';

const UploadPage = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  return (
    <div>
      <h1>Upload Files</h1>
      <input type="file" multiple onChange={handleFileUpload} />
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UploadPage;
