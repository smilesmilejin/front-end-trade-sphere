import PropTypes from 'prop-types';
import Item from './Item.jsx';
import '../styles/ItemList.css';


const ItemList = ({ listings, userLikedListings, onToggleLike, editButton, onUpdateUserItem, onCancelUpdateUserItem, onDeleteUserItem }) => {

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
                    onDeleteUserItem={onDeleteUserItem}
                />
            );
        });
    };

    return <ul className="items-list-container">{getItemListJSX(listings)}</ul>;
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
    onDeleteUserItem: PropTypes.func,
};

export default ItemList;