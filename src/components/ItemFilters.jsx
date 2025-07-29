import PropTypes from 'prop-types';
// import '../styles/BoardList.css';
import { useState } from 'react';


const ItemFilters = ({ onFiltersChange }) => {
    const [category, setCategory] = useState('');
    const [availability, setAvailability] = useState('');
    const [priceSort, setPriceSort] = useState('');
    const [dateSort, setDateSort] = useState('');

    // This builds a new object called updatedFilters, which combines:
    // The current values from state:
    // category
    // availability
    // priceSort
    // dateSort
    // Then spreads newValues on top, which will override any of the above if keys match.
    const handleChange = (newValues = {}) => {
        const updatedFilters = {
            category,
            availability,
            priceSort,
            dateSort,
            ...newValues, // override any updated values
        };

        console.log('current filters are:', updatedFilters);
        // Uses optional chaining (?.) to safely call onFiltersChange if it's defined.
        // If the parent passed this callback prop, it will be called with the updated filters.
        // If not, it fails silently and doesn't crash.
        onFiltersChange?.(updatedFilters);
    };


    return (
        <div className='item-filters'>

            <div className='filter-group'>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        handleChange({ category: e.target.value });
                    }}
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
                    value={availability}
                    onChange={(e) => {
                        setAvailability(e.target.value);
                        handleChange({ availability: e.target.value });
                    }}
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
                    value={priceSort}
                    onChange={(e) => {
                        setPriceSort(e.target.value);
                        handleChange({ priceSort: e.target.value});
                    }}
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
                    value={dateSort}
                    onChange={(e) => {
                        setDateSort(e.target.value);
                        handleChange({ dateSort: e.target.value});
                    }}
                >
                    <option value="">-- All --</option>
                    <option value="date-desc">Newest First </option>
                    <option value="date-asc">Oldest First </option>
                </select>
            </div>
        </div>

    )
};

ItemFilters.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
};

export default ItemFilters;