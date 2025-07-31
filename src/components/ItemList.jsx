import PropTypes from 'prop-types';
import Item from './Item.jsx';

const sampleImages = [
    {
      image_id: 23,
      listing_id: 23,
      image_url: "https://i.ibb.co/tT57qP2d/81k4-Wltu3-RL-AC-SL1500.jpg"
    },
    {
      image_id: 24,
      listing_id: 23,
      image_url: "https://i.ibb.co/bR8qdMb9/81-Hv-O7-AT5h-L-AC-SL1500.jpg"
    }
];

const ItemList = ({ listings, userLikedListings, onToggleLike, editButton, onUpdateUserItem, onCancelUpdateUserItem, deleteButton, onDeleteUserItem, onDeleteImage}) => {

    const getItemListJSX = (listings) => {
        return listings.map((listing) => {
            return (
                <Item 
                    key={listing.listing_id}
                    listing_id={listing.listing_id}
                    user_id={listing.user_id}
                    name={listing.name}
                    category={listing.category}
                    description={listing.description}
                    price={listing.price}
                    location={listing.location}
                    contact_information={listing.contact_information}
                    created_at={listing.created_at}
                    updated_at={listing.updated_at}
                    sold_status={listing.sold_status}
                    images={listing.images}
                    userLikedListings={userLikedListings}
                    onToggleLike={onToggleLike}
                    editButton={editButton}
                    onUpdateUserItem={onUpdateUserItem}
                    onCancelUpdateUserItem={onCancelUpdateUserItem}
                    deleteButton={deleteButton}
                    onDeleteUserItem={onDeleteUserItem}
                    onDeleteImage={onDeleteImage}
                />
            );
        });
    };

    return <ul>{getItemListJSX(listings)}</ul>;
};

ItemList.propTypes = {
    listings: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ).isRequired,
    userLikedListings: PropTypes.instanceOf(Set),
    onToggleLike: PropTypes.func,
    editButton: PropTypes.element,
    onUpdateUserItem:PropTypes.func,
    onCancelUpdateUserItem: PropTypes.func,
    deleteButton: PropTypes.element,
    onDeleteUserItem: PropTypes.func,
    onDeleteImage: PropTypes.func,
};

export default ItemList;