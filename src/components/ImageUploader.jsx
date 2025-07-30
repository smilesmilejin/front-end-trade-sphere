import { useState } from "react";
import PropTypes from 'prop-types';


const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);

const ImageUploader = ({ onSetFormData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploadedImages, setUploadedImages] = useState([]);



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

        // Optionally update form data with all uploaded images
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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload to ImGBB"}
      </button>

      {uploadedUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Uploaded Image URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <br />
          <img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}

        {/* Display all uploaded images */}
        {uploadedImages.length > 0 && (
            <div style={{ marginTop: 20 }}>
            <h3>All Uploaded Images:</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {uploadedImages.map((url, idx) => (
                <img
                    key={idx}
                    src={url}
                    alt={`Uploaded ${idx + 1}`}
                    style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
                />
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