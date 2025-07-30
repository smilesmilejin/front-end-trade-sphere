import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageUploader from './ImageUploader';

const kDefaultFormState = {
    name: '',
    category: '',
    description: '',
    price: '',
    location: '',
    contact_information: '',
    images:[],
    // created_at: '',
    // updated_at: '',
    // sold_status: '',
};


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
    const [resetUploader, setResetUploader] = useState(false);


    const handleSubmit = (event) => {
        console.log('submitted!');

        event.preventDefault();

        const trimmedName = formData.name.trim();
        const trimmedDescription = formData.description.trim();
        // const trimmedPrice = formData.price.trim();
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

    // trim the title and owner before posting
    console.log("Post Item Data: ", postItemData);


    onPostItem(postItemData);

    setFormData(kDefaultFormState);
    setErrors(kErrorState);

    setResetUploader(true); // Trigger image uploader reset
    setTimeout(() => setResetUploader(false), 100); // Reset the flag after effect
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

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

    //   This converts the errors object into an array of its values:
    // The .some() array method tests whether at least one element in the array passes the condition inside the callback function. It returns:
    // true if any element meets the condition,
    // false if none do.
  const hasErrors = Object.values(errors).some(errorMsg => errorMsg !== '');

    return (
        
        <form className='signup-form' onSubmit={handleSubmit}>
            <div className='form-header'>
            Post an Item for Sale
            </div>

            <div className='form-field'>
                {makeControlledInput('name')}
            </div>
            {errors.name && (
            <div className='form-errors'>
                <p className='error-text'>{errors.name}</p>
            </div>
            )}

            <div className='form-field'>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">-- All --</option>
                    <option value="household">Household Items</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing_accessories">Clothing & Accessories</option>
                    <option value="books_media">Books & Media</option>
                    <option value="toys_games">Toys & Games</option>
                    <option value="miscellaneous">Miscellaneous</option>
                </select>

                {errors.category && (
                <div className='form-errors'>
                    <p className='error-text'>{errors.category}</p>
                </div>
                )}
            </div>



            <div className='form-field'>
                {makeControlledInput('description')}
            </div>
            {errors.description && (
                <div className='form-errors'>
                    <p className='error-text'>{errors.description}</p>
                </div>
            )}

            <div className='form-field'>
                {makeControlledInput('price', 'number')}
            </div>
            {errors.price && (
                <div className='form-errors'>
                    <p className='error-text'>{errors.price}</p>
                </div>
            )}


            <div className='form-field'>
                {makeControlledInput('location')}
            </div>
            {errors.location && (
                <div className='form-errors'>
                    <p className='error-text'>{errors.location}</p>
                </div>
            )}


            <div className='form-field'>
                {makeControlledInput('contact_information')}
            </div>
                {errors.contact_information && (
                <div className='form-errors'>
                    <p className='error-text'>{errors.contact_information}</p>
                </div>
                )}

            <ImageUploader onSetFormData={setFormData} resetUploader={resetUploader}/>

            <div className="button-wrapper">
                <button disabled={hasErrors}>Submit</button>
            </div>
        </form>
  );
};

NewItemForm.propTypes = {
  onPostItem: PropTypes.func.isRequired,
};

export default NewItemForm;