import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import '../styles/EditUserItemImageUploader.css';

const API_KEY = import.meta.env.VITE_API_KEY;
// console.log(API_KEY);

const EditUserItemImageUploader = ({ onSetNewUploadedimagesImages, resetUploader }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [inputKey, setInputKey] = useState(Date.now());


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadedUrl("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("key", API_KEY);
    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setUploadedUrl(data.data.display_url);
        setUploadedImages((prev) => [...prev, data.data.display_url]);

        // Update form data with all uploaded images
        onSetNewUploadedimagesImages((prev) => [
          ...prev,
          data.data.display_url
        ]);

      } else {
        alert("Upload failed: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Error uploading: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteImage = (urlToDelete) => {
    setUploadedImages((prev) => prev.filter(url => url !== urlToDelete));

    // Update the parent state by filtering out the deleted URL
    onSetNewUploadedimagesImages((prev) => [
      ...prev.filter((url) => url !== urlToDelete),
    ]);
  };


    useEffect(() => {
      if (resetUploader) {
        setSelectedFile(null);
        setUploadedUrl("");
        setLoading(false);
        setUploadedImages([]);
        setInputKey(Date.now());  // Force remount of file input
      }
    }, [resetUploader]);

  return (
    <div className="image-uploader">
      <input
        key={inputKey}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {uploadedUrl && (
        <div className="image-preview">
          <p>Uploaded Image URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <br />
          <img src={uploadedUrl} alt="Uploaded" />
        </div>
      )}

        {uploadedImages.length > 0 && (
          <div className="uploaded-images-container">
            <h3>All Uploaded Images:</h3>
            <div className="uploaded-images">
              {uploadedImages.map((url, idx) => (
                <div key={idx} >
                  <img src={url} alt={`Uploaded ${idx + 1}`} />
                  <button type="button" onClick={() => handleDeleteImage(url)} >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>

  );

}

EditUserItemImageUploader.propTypes = {
  onSetNewUploadedimagesImages: PropTypes.func.isRequired,
};

export default EditUserItemImageUploader;