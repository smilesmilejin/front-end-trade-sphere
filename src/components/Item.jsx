import PropTypes from 'prop-types';
import { useState } from 'react';
import NoImageAvailable from '../assets/NoImageAvailable.png';
import ImageGallerySlider from './ImageGallerySlider.jsx';
import EditUserItemForm from './EditUserItemForm.jsx';
import '../styles/Item.css';

const sampleImagesArray = [
    "https://i.ibb.co/gLQ48Lrp/71-O-3j3d9-DL-AC-SL1500.jpg",
    "https://i.ibb.co/vxj76yx1/71w0-Ozy-Bav-L.jpg",
    "https://i.ibb.co/jZwGPvXP/premium-photo-1710346961272-c23f174b6e39.jpg",
    "https://i.ibb.co/DDMbKGDp/indoor-photo-realistic-green-christmas-260nw-2539815647-jpg.webp",
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
    images,
    userLikedListings,
    onToggleLike,
    editButton,
    onUpdateUserItem, 
    onCancelUpdateUserItem,
    deleteButton, 
    onDeleteUserItem,
    onDeleteImage }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleEditOpen = () => setIsEditOpen(true);
    const handleEditClose = () => setIsEditOpen(false);

    const imageUrls = images?.map(image => image.image_url) || [];
    const isLiked = (userLikedListings || new Set()).has(listing_id);
    
    // Converts an ISO 8601 date-time string to a formatted date and time string in UTC.
    const formatUTCDateTime = (isoString) => {
        const date = new Date(isoString);
        
        return date.toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }) + ' UTC';
    }

    const categoryOptions = {
        household: "Household Items",
        electronics: "Electronics",
        clothing_accessories: "Clothing & Accessories",
        books_media: "Books & Media",
        toys_games: "Toys & Games",
        miscellaneous: "Miscellaneous",
    };

    return (
        <li className='item-container'>
            {/* Heart icon */}
            <button className="heart-button" onClick={() => onToggleLike(listing_id)}>
                {isLiked ? '❤️' : '🤍'}
            </button>

            <ImageGallerySlider 
                images={imageUrls && imageUrls.length > 0 ? imageUrls : [NoImageAvailable]}
            />
            <div className='item-content'>
                <p className='item-name'>Name: {name}</p>
                <p className='item-price'>Price: ${price}</p>
            </div>

            <button className='view-details-btn' onClick={handleOpen}>View Details</button>

            <div onClick={handleEditOpen}>
                {editButton}
            </div>


            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleClose}>×</button>
                        <div className='modal-image-column'>
                            <ImageGallerySlider
                                images={imageUrls && imageUrls.length > 0 ? imageUrls : [NoImageAvailable]}
                            />                      
                        </div>
                        {/* <div className='modal-text-column'>
                            <h2>📝 Listing Details</h2>
                            <p>🆔 Listing Id: {listing_id}</p>
                            <p>👤 User Id: {user_id}</p>
                            <p>📛 Name: {name}</p>
                            <p>📂 Category: {category}</p>
                            <p>📝 Description: {description}</p>
                            <p>💰 Price: ${price}</p>
                            <p>📍 Location: {location}</p>
                            <p>📞 Contact Info: {contact_information}</p>
                            <p>🗓️ Created At: {created_at}</p>
                            <p>✏️ Updated At: {updated_at}</p>
                            <p>📦 Status: {sold_status ? 'Sold' : 'Available'}</p>                        
                        </div> */}

                        <div className='modal-text-column'>
                            <h2>📝 Listing Details</h2>
                            <p>
                                <span className="label">Listing ID: </span>
                                <span className="value">{listing_id}</span>
                            </p>
                            <p>
                                <span className="label">User ID: </span>
                                <span className="value">{user_id}</span>
                            </p>
                            <p>
                                <span className="label">Item Name: </span>
                                <span className="value">{name}</span>
                            </p>
                            <p>
                                <span className="label">Item Category: </span>
                                {/* <span className="value">{category}</span> */}
                                <span className="value">{categoryOptions[category] || category}</span>
                            </p>
                            <p>
                                <span className="label">Item Description: </span>
                                <span className="value">{description}</span>
                            </p>
                            <p>
                                <span className="label">Item Price: </span>
                                <span className="value">${price}</span>
                            </p>
                            <p>
                                <span className="label">Item Location: </span>
                                <span className="value">{location}</span>
                            </p>
                            <p>
                                <span className="label">Contact Info: </span>
                                <span className="value">{contact_information}</span>
                            </p>
                            <p>
                                <span className="label">Date Listed: </span>
                                {/* <span className="value">{created_at}</span> */}
                                <span className="value">{formatUTCDateTime(created_at)}</span>
                            </p>
                            <p>
                                <span className="label">Last Updated: </span>
                                {/* <span className="value">{updated_at}</span> */}
                                <span className="value">{formatUTCDateTime(updated_at)}</span>
                            </p>
                            <p>
                                <span className="label">Availability: </span>
                                <span className="value">{sold_status ? 'Sold' : 'Available'}</span>
                            </p>                        
                        </div>
                    </div>
                </div>
            )}

            {isEditOpen && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <button className="close-button" onClick={handleEditClose}>×</button>

                        <EditUserItemForm
                        itemData={{
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
                        }}
                        onUpdateUserItem={onUpdateUserItem}
                        onCancelUpdateUserItem={onCancelUpdateUserItem}
                        onHandleEditClose={handleEditClose}
                        onDeleteUserItem={onDeleteUserItem}
                        />
                    </div>
                </div>
            )}

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
    userLikedListings: PropTypes.instanceOf(Set),
    onToggleLike: PropTypes.func,
    editButton: PropTypes.element,
    onUpdateUserItem:PropTypes.func,
    onCancelUpdateUserItem: PropTypes.func,
    deleteButton: PropTypes.element,
    onDeleteUserItem: PropTypes.func,
    onDeleteImage: PropTypes.func,
}


export default Item;