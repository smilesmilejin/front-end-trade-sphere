import { useEffect, useRef, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import '../styles/ImageCloudinaryUploadWidget.css';


const ImageCloudinaryUploadWidget = ({ onSetFormData, resetUploader }) => {
// const ImageCloudinaryUploadWidget = ({ uwConfig, setPublicId, onSetFormData }) => {
  // Configuration
  const cloudName = 'dhgqrdfrw';
  const uploadPreset = 'trade-sphere-images';

  // State
  const [publicId, setPublicId] = useState('');

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    // multiple: false,
    // folder: 'user_images',
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Upload successful:', result.info);

              const imgUrl = result.info.secure_url;
              console.log('secure Url is: ', imgUrl);


              setUploadedImages((prev) => [...prev, imgUrl]);

              // Update form data in parent
              onSetFormData((prev) => ({
                ...prev,
                images: [...(prev.images || []), imgUrl],
              }));

              setPublicId(result.info.public_id);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    if (resetUploader) {
        setUploadedImages([]);
      }

    initializeUploadWidget();
    //   }, [uwConfig, setPublicId]);
    }, [resetUploader]);


  // Remove an uploaded image
  const handleDeleteImage = (urlToDelete) => {
    setUploadedImages((prev) => prev.filter(url => url !== urlToDelete));

    // Also update parent formData
    onSetFormData((prev) => ({
      ...prev,
      images: prev.images.filter(url => url !== urlToDelete),
    }));
  };

  return (
    <div className='image-uploader-cloudinary'>
      <div className="upload-controls-cloudinary">
        <button
            ref={uploadButtonRef}
            id="upload_widget"
            className="cloudinary-button"
            type="button"
        >
            Upload
        </button>
      </div>

      {uploadedImages.length > 0 && (
        <div className="uploaded-images-container-cloudinary" >
          <h3 className="uploaded-images-container-cloudinary-h3">All Uploaded Images</h3>
          <div className="uploaded-images-cloudinary">
            {uploadedImages.map((url, idx) => (
              <div className="each-image-container-cloudinary" key={idx} >
                <img src={url} alt={`Uploaded ${idx + 1}`} />

                <button type="button" onClick={() => handleDeleteImage(url)} >
                  Delete Image
                </button>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>

  );
};

export default ImageCloudinaryUploadWidget;
