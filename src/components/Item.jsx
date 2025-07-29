import PropTypes from 'prop-types';
// import '../styles/Board.css';

import ImageGallerySlider from './ImageGallerySlider.jsx';

const sampleImagesArray = [
    "https://i.ibb.co/gLQ48Lrp/71-O-3j3d9-DL-AC-SL1500.jpg",
    "https://i.ibb.co/vxj76yx1/71w0-Ozy-Bav-L.jpg",
    "https://i.ibb.co/jZwGPvXP/premium-photo-1710346961272-c23f174b6e39.jpg",
    "https://i.ibb.co/DDMbKGDp/indoor-photo-realistic-green-christmas-260nw-2539815647-jpg.webp",
]



// const sampleImagesArray = []


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
            {/* <ImageGallery 
                // images={images}
                images={sampleImagesArray}
            /> */}
            <ImageGallerySlider 
                // images={images}
                images={sampleImagesArray}
            />
            <p>Listing Id: {listing_id}</p>
            <p>User Id: {user_id}</p>
            <p>Name: {name}</p>
            <p>Category: {category}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Location: {location}</p>
            <p>Contact Information: {contact_information}</p>
            <p>Created at : {created_at}</p>
            <p>Updated At: {updated_at}</p>
            {/* <p>Sold Status: {sold_status}</p> */}
            {/* When sold_status is false, React renders nothing, because false is a falsy value and not rendered as a string by default in JSX. */}
            <p>Sold Status: {sold_status ? 'Sold' : 'Available'}</p>
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