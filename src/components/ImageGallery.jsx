// import React from 'react';
import PropTypes from 'prop-types';
// import './ImageGallery.css'; // optional CSS

const ImageGallery = ({ images }) => {
    return (
        <div className="image-gallery">
            {images.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`Listing image ${index + 1}`} className="gallery-image" />
            ))}
        </div>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;