import PropTypes from 'prop-types';
import { useState } from 'react';

const defaultFiltersState = {
    category: '',
    availability: '',
    priceSort: '',
    dateSort: '',
};

const ItemFilters = ({ onGetFilteredItems }) => {
    const [filters, setFilters] = useState(defaultFiltersState);

    // The syntax { ...filters, ...newValues } creates a new object by copying all key-value pairs from filters.
    // Then copying all key-value pairs from newValues, overriding any keys that already existed in filters.
    const handleChange = (newValues = {}) => {
        const updatedFilters = { ...filters, ...newValues };

        // console.log('updatedFilters is:', updatedFilters);

        setFilters(updatedFilters);
        onGetFilteredItems(updatedFilters);
    };

    const handleResetFilters = () => {
        setFilters(defaultFiltersState);
        handleChange(defaultFiltersState);
    };


    return (
        <div className='item-filters'>

            <div className='filter-group'>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={filters.category}
                    onChange={(e) => handleChange({ category: e.target.value })}
                >
                    <option value="">-- All --</option>
                    <option value="household">Household Items</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing_accessories">Clothing & Accessories</option>
                    <option value="books_media">Books & Media</option>
                    <option value="toys_games">Toys & Games</option>
                    <option value="miscellaneous">Miscellaneous</option>
                </select>
            </div>

            <div className='filter-group'>
                <label htmlFor="availability">Availability:</label>
                <select
                    id="availability"
                    value={filters.availability}
                    onChange={(e) => handleChange({ availability: e.target.value })}
                >
                    <option value="">-- All --</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>

            <div className='filter-group'>
                <label htmlFor="priceSort">Price:</label>
                <select
                    id="priceSort"
                    value={filters.priceSort}
                    onChange={(e) => handleChange({ priceSort: e.target.value })}
                >
                    <option value="">-- All --</option>
                    <option value="price-asc">Price Low to High ↑ </option>
                    <option value="price-desc">Price High to Low ↓ </option>
                </select>
            </div>

            <div className='filter-group'>
                <label htmlFor="dateSort">Date Added:</label>
                <select
                    id="dateSort"
                    value={filters.dateSort}
                    onChange={(e) => handleChange({ dateSort: e.target.value })}
                >
                    <option value="">-- All --</option>
                    <option value="date-desc">Newest First </option>
                    <option value="date-asc">Oldest First </option>
                </select>
            </div>

            <button type="button" onClick={handleResetFilters} >
                Reset Filters
            </button>
        </div>
    )
};

ItemFilters.propTypes = {
    onGetFilteredItems: PropTypes.func.isRequired,
};

export default ItemFilters;