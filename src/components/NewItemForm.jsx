import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageUploader from './ImageUploader';
import '../styles/NewItemForm.css';
import ImageCloudinaryUploadWidget from './ImageCloudinaryUploadWidget';

// Default empty form
const kDefaultFormState = {
    name: '',
    category: '',
    description: '',
    price: '',
    location: '',
    contact_information: '',
    images:[],
};

// Default error messages for required fields
const kErrorState = {
    name: 'Name cannot be empty',
    category: 'Category cannot be empty',
    description: 'Description cannot be empty',
    price: 'Price cannot be empty',
    location: 'Location cannot be empty',
    contact_information:'Contact Information cannot be empty',
};


const NewItemForm = ({ onPostItem }) => {
    const [formData, setFormData] = useState(kDefaultFormState);
    const [errors, setErrors] = useState(kErrorState);
    const [resetUploader, setResetUploader] = useState(false); // State to trigger reset of the ImageUploader component


    const handleSubmit = (event) => {
        event.preventDefault();

        // Trim input values and parse price to float
        const trimmedName = formData.name.trim();
        const trimmedDescription = formData.description.trim();
        const trimmedPrice = parseFloat(formData.price.trim());
        const trimmedLocation = formData.location.trim();
        const trimmedContactInformation = formData.contact_information.trim();

        const postItemData = {
            name: trimmedName,
            category: formData.category,
            description: trimmedDescription,
            price: trimmedPrice,
            location: trimmedLocation,
            contact_information: trimmedContactInformation,
            images: formData.images
        };

        // Call parent callback to handle posting
        onPostItem(postItemData);

        // Reset form and errors to initial state
        setFormData(kDefaultFormState);
        setErrors(kErrorState);

        // Trigger reset of the ImageUploader component
        setResetUploader(true); // Trigger image uploader reset
        setTimeout(() => setResetUploader(false), 100); // Reset the flag after effect
  };

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        // Update form data with new input value
        setFormData((formData) => ({
            ...formData,
            [inputName]: inputValue,
        }));

        const trimmedLength = inputValue.trim().length;
        if (trimmedLength === 0) {
            setErrors((prev) => ({
                ...prev,
                [inputName]: kErrorState[inputName],
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [inputName]: '',
            }));
        }
    };

    const makeControlledInput = (inputName, type='text') => {
        return (
            <>
                <input
                onChange={handleChange}
                type={type}
                id={`input-${inputName}`}
                name={inputName}
                value={formData[inputName]}
                placeholder={inputName}
                step={inputName === 'price' ? '0.01' : undefined}
                min={inputName === 'price' ? '0' : undefined}
                />
            </>
        );
    };

    const hasErrors = Object.values(errors).some(errorMsg => errorMsg !== '');

    return (
        <form className='new-item-form' onSubmit={handleSubmit}>
            <div className='new-item-form-header'>
            Post an Item for Sale
            </div>

            <div className='new-item-form-field'>
                {makeControlledInput('name')}
            </div>
            {errors.name && (
            <div className='new-item-form-errors'>
                <p className='new-item-error-text'>{errors.name}</p>
            </div>
            )}

            <div className='new-item-form-field-category'>
                {/* <label htmlFor="category">Category:</label> */}
                <select
                    id="category"
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">-- SELECT CATEGORY --</option>
                    <option value="household">Household Items</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing_accessories">Clothing & Accessories</option>
                    <option value="books_media">Books & Media</option>
                    <option value="toys_games">Toys & Games</option>
                    <option value="miscellaneous">Miscellaneous</option>
                </select>
            </div>
            {errors.category && (
            <div className='new-item-form-errors'>
                <p className='new-item-error-text'>{errors.category}</p>
            </div>
            )}


            <div className='new-item-form-field'>
                {makeControlledInput('description')}
            </div>
            {errors.description && (
                <div className='new-item-form-errors'>
                    <p className='new-item-error-text'>{errors.description}</p>
                </div>
            )}

            <div className='new-item-form-field'>
                {makeControlledInput('price', 'number')}
            </div>
            {errors.price && (
                <div className='new-item-form-errors'>
                    <p className='new-item-error-text'>{errors.price}</p>
                </div>
            )}


            <div className='new-item-form-field'>
                {makeControlledInput('location')}
            </div>
            {errors.location && (
                <div className='new-item-form-errors'>
                    <p className='new-item-error-text'>{errors.location}</p>
                </div>
            )}


            <div className='new-item-form-field'>
                {makeControlledInput('contact_information')}
            </div>
            {errors.contact_information && (
            <div>
                <p className='new-item-error-text'>{errors.contact_information}</p>
            </div>
            )}

            <ImageCloudinaryUploadWidget onSetFormData={setFormData} resetUploader={resetUploader}/>

            <div className="new-item-button-wrapper">
                <button disabled={hasErrors}>Submit</button>
            </div>
        </form>
  );
};

NewItemForm.propTypes = {
  onPostItem: PropTypes.func.isRequired,
};

export default NewItemForm;