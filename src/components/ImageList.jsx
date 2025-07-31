import PropTypes from 'prop-types';
import Image from './Image.jsx';
import '../styles/ImageList.css';


const ImageList = ({ images = [], onLocalHandlelDeleteImage }) => {

    const getItemListJSX = (images) => {
        return images.map((img) => {
            return (
                    <Image
                        key={img.image_id}
                        image_id={img.image_id}
                        listing_id={img.listing_id}
                        image_url={img.image_url}
                        onLocalHandlelDeleteImage={onLocalHandlelDeleteImage}
                    />
            );
        });
    };

    return <ul className="image-list-wrapper">{getItemListJSX(images)}</ul>;
};

ImageList.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            image_id: PropTypes.number.isRequired,
            listing_id: PropTypes.number.isRequired,
            image_url: PropTypes.string.isRequired,
        })
    ).isRequired,
    onLocalHandlelDeleteImage: PropTypes.func.isRequired,
};

export default ImageList;