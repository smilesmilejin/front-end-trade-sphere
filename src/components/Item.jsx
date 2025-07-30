import PropTypes from 'prop-types';
import '../styles/Item.css';

import ImageGallerySlider from './ImageGallerySlider.jsx';
import { useState } from 'react';
import NoImageAvailable from '../assets/NoImageAvailable.png';

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
    images,
    userLikedListings,
    onToggleLike }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    // const imageUrls = images.map(image => image.image_url);

    const imageUrls = images?.map(image => image.image_url) || [];
    // const isLiked = userLikedListings.has(listing_id);
    const isLiked = (userLikedListings || new Set()).has(listing_id);

    return (
        <li>
            {/* <ImageGallery 
                // images={images}
                images={sampleImagesArray}
            /> */}
            <ImageGallerySlider 
                // images={images}
                // images={sampleImagesArray}
                // images={images && images.length > 0 ? images : [NoImageAvailable]}
                images={imageUrls && imageUrls.length > 0 ? imageUrls : [NoImageAvailable]}

            />
            {/* <p>Listing Id: {listing_id}</p>
            <p>User Id: {user_id}</p> */}
            <p>Name: {name}</p>
            <p>Category: {category}</p>
            {/* <p>Description: {description}</p> */}
            <p>Price: {price}</p>
            {/* <p>Location: {location}</p>
            <p>Contact Information: {contact_information}</p>
            <p>Created at : {created_at}</p>
            <p>Updated At: {updated_at}</p> */}

            {/* When sold_status is false, React renders nothing, because false is a falsy value and not rendered as a string by default in JSX. */}
            {/* <p>Sold Status: {sold_status ? 'Sold' : 'Available'}</p> */}
            
            {/* Heart icon */}
            <button onClick={() => onToggleLike(listing_id)}>
            {isLiked ? '❤️' : '🤍'}
            </button>

            <button onClick={handleOpen}>View Details</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleClose}>×</button>
                        <h2>Listing Details</h2>
                        {/* <ImageGallerySlider 
                            // images={images}
                            images={sampleImagesArray}
                        /> */}
                        <ImageGallerySlider 
                            // images={images && images.length > 0 ? images : [NoImageAvailable]}
                            images={imageUrls && imageUrls.length > 0 ? imageUrls : [NoImageAvailable]}
                        />
                        <p>Listing Id: {listing_id}</p>
                        <p>User Id: {user_id}</p>
                        <p>Name: {name}</p>
                        <p>Category: {category}</p>
                        <p>Description: {description}</p>
                        <p>Price: ${price}</p>
                        <p>Location: {location}</p>
                        <p>Contact Info: {contact_information}</p>
                        <p>Created At: {created_at}</p>
                        <p>Updated At: {updated_at}</p>
                        <p>Status: {sold_status ? 'Sold' : 'Available'}</p>
                    </div>
                </div>
            )}
        </li>
    )
}

// Item.propTypes = {
//     listing_id: PropTypes.number.isRequired,
//     user_id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired, // Validate decimals elsewhere if needed
//     location: PropTypes.string.isRequired,
//     contact_information: PropTypes.string.isRequired,
//     created_at: PropTypes.string.isRequired, // Or use PropTypes.instanceOf(Date)
//     updated_at: PropTypes.string.isRequired,
//     sold_status: PropTypes.bool.isRequired,
//     images: PropTypes.array.isRequired,
//     userLikedListings: PropTypes.instanceOf(Set),
//     onToggleLike: PropTypes.func,
// }


Item.propTypes = {
  listing_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.string,
  contact_information: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  sold_status: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  userLikedListings: PropTypes.instanceOf(Set),
  onToggleLike: PropTypes.func,
};

export default Item;