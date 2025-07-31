import PropTypes from 'prop-types';
import '../styles/Image.css';


const Image =({ image_id, listing_id, image_url, onLocalHandlelDeleteImage}) => {
    return (
        <li className="image-item">
            <img src={image_url} alt={`Image ${image_id}`} />
            <p>Image ID: {image_id}</p>
            <p>Listing ID: {listing_id}</p>
            <button onClick={() => onLocalHandlelDeleteImage(image_id, listing_id)}>Delete Image</button>
        </li>
    )
}


Image.propTypes = {
  image_id: PropTypes.number.isRequired,
  listing_id: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
};

export default Image;