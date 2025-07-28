import PropTypes from 'prop-types';
// import '../styles/Board.css';
import ImageGallery from './ImageGallery.jsx';
const sampleImagesArray = [
    "https://i.ibb.co/gLQ48Lrp/71-O-3j3d9-DL-AC-SL1500.jpg",
    "https://i.ibb.co/vxj76yx1/71w0-Ozy-Bav-L.jpg",
]
const Item =({
    listing_id, 
    user_id, 
    name, 
    category, 
    description, 
    price,
    location, 
    contact_information, 
    created_at,
    updated_at,
    sold_status,
    images }) => {

    return (
        <li>
            <ImageGallery 
                // images={images}
                images={sampleImagesArray}
            />
            <p>{listing_id}</p>
            <p>{user_id}</p>
            <p>{name}</p>
            <p>{category}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{location}</p>
            <p>{contact_information}</p>
            <p>{created_at}</p>
            <p>{updated_at}</p>
            <p>{sold_status}</p>
            {/* <p>{images}</p> */}
        </li>
    )
}

Item.propTypes = {
    listing_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, // Validate decimals elsewhere if needed
    location: PropTypes.string.isRequired,
    contact_information: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired, // Or use PropTypes.instanceOf(Date)
    updated_at: PropTypes.string.isRequired,
    sold_status: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
}

export default Item;