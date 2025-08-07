import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import '../styles/ImageUploader.css';

const API_KEY = import.meta.env.VITE_API_KEY;


const ImageUploader = ({ onSetFormData, resetUploader }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(new Set());
  const [inputKey, setInputKey] = useState(Date.now()); // Used to force reset file input

  // Handle file input change
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

        // Update local image preview
        setUploadedUrl(data.data.display_url);

        setUploadedImages((prev) => {
          const updated = new Set(prev);
          updated.add(data.data.display_url);
          return updated;
        });

        // Update form data in parent
        onSetFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), data.data.display_url],
        }));

      } else {
        alert("Upload failed: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Error uploading: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
    // Remove an uploaded image
  const handleDeleteImage = (urlToDelete) => {
    setUploadedImages((prev) => {
      const updated = new Set(prev);
      updated.delete(urlToDelete);
      return updated;
    });

    // Also update parent formData
    onSetFormData((prev) => ({
      ...prev,
      images: prev.images.filter(url => url !== urlToDelete),
    }));
  };

    // Resets all internal states and forces file input to re-render when resetUploader is true.
    useEffect(() => {
      if (resetUploader) {
        setSelectedFile(null);
        setUploadedUrl("");
        setLoading(false);
        setUploadedImages(new Set());
        setInputKey(Date.now());  // Reset the <input type="file" />
      }
    }, [resetUploader]);

    // Convert Set to Array once
    const uploadedImagesArray = [...uploadedImages];

  return (
    <div className="image-uploader">
      <div className="upload-controls">
        <input
          key={inputKey}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          />
        <button type="button" onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {uploadedUrl && (
        <div className="image-preview">
          <p>Uploaded Image URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <br />
          <img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}

        {/* use uploadeImagesArra */}
        {uploadedImagesArray.length > 0 && (
          <div className="uploaded-images-container">
            <h3 className="uploaded-images-container-h3">All Uploaded Images</h3>
            <div className="uploaded-images">
              {uploadedImagesArray.map((url, idx) => (
                <div className="each-image-container" key={idx}>
                  <img src={url} alt={`Uploaded ${idx + 1}`} />
                  <button type="button" onClick={() => handleDeleteImage(url)}>
                    Delete Image
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

    </div>

  );

}

ImageUploader.propTypes = {
  onSetFormData: PropTypes.func.isRequired,
};

export default ImageUploader;