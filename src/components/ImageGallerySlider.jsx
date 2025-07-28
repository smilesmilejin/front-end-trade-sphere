import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ImageGallerySlider.css';

const ImageGallerySlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="image-slider">
            <button className="arrow left" onClick={goToPrev}>&lt;</button>
            <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="gallery-image"
            />
            <button className="arrow right" onClick={goToNext}>&gt;</button>
        </div>
    );
};

ImageGallerySlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallerySlider;