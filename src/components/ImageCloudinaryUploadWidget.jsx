import { useEffect, useRef, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import PropTypes from 'prop-types';
import '../styles/ImageCloudinaryUploadWidget.css';


const ImageCloudinaryUploadWidget = ({ onSetFormData, resetUploader }) => {
  // Configuration
  const cloudName = 'dhgqrdfrw';
  const uploadPreset = 'trade-sphere-images';

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
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico'],
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

  const validImageFormats = ["jpeg", "jpg", "png", "gif", "bmp", "webp", "svg", "ico"];

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              // console.log('Upload successful:', result.info);

              const imgUrl = result.info.secure_url;
              // console.log('secure Url is: ', imgUrl);

              const imgFileFormat = result.info.format;
              // // const imgFileFormat = result.info.format.toLowerCase();
              // console.log('image File Format is: ', imgFileFormat);
              // console.log('Type of normalized format:', typeof imgFileFormat);

              if (validImageFormats.includes(imgFileFormat)) {
                  console.log('Format is valid');
                  setUploadedImages((prev) => [...prev, imgUrl]);

                  // Update form data in parent
                  onSetFormData((prev) => ({
                    ...prev,
                    images: [...(prev.images || []), imgUrl],
                  }));
              } 
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
            Upload Images
        </button>
      </div>

      <div className='new-item-form-errors'>
          <p className='new-item-error-text-image'>Supported image formats: JPEG, JPG, PNG, GIF, BMP, WEBP, SVG, ICO.</p>
      </div>

      <div className='new-item-form-errors'>
          <p className='new-item-error-text-image'>Images in unsupported formats will not be uploaded.</p>
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

ImageCloudinaryUploadWidget.propTypes = {
  onSetFormData: PropTypes.func.isRequired,
  resetUploader : PropTypes.func.isRequired,
};

export default ImageCloudinaryUploadWidget;
