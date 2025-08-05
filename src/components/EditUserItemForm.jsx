import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import ImageList from './ImageList.jsx';
import EditUserItemImageUploader from './EditUserItemImageUploader.jsx';
import { useNavigate } from 'react-router';
import '../styles/EditUserItemForm.css';


const kDefaultFormState = {
    name: '',
    category: '',
    description: '',
    price: '',
    location: '',
    contact_information: '',
    images:[],
    sold_status: '',
};

const kErrorState = {
    name: 'Name cannot be empty',
    category: 'Category cannot be empty',
    description: 'Description cannot be empty',
    price: 'Price cannot be empty',
    location: 'Location cannot be empty',
    contact_information:'Contact Information cannot be empty',
    sold_status: 'Sold cannot be empty',
};


const EditUserItemForm = ({ 
    itemData = {
    name: '',
    category: '',
    description: '',
    price: '',
    location: '',
    contact_information: '',
    images: [],
    sold_status: false,
    },
    onUpdateUserItem, 
    onCancelUpdateUserItem,
    // onDeleteImage,
    onHandleEditClose,
    onDeleteUserItem }) => {

    // Make sure the initial userData fields are never null or undefined — use empty strings instead:
    const initialItemData = {
        listingId: itemData.listing_id,
        name: itemData.name || '',
        category: itemData.category || '',
        description: itemData.description || '',
        price: itemData.price || '',
        location: itemData.location || '',
        contact_information: itemData.contact_information || '',
        images:itemData.images || [],
        sold_status:
            itemData.sold_status === true 
            // || itemData.sold_status === "true"
            ? "sold"
            : "available",

    };
    const [formData, setFormData] = useState(initialItemData);
    const navigate = useNavigate();

    const getInitialErrors = (data) => {
        const errs = {};
        for (const key in kErrorState) {
            const value = (data[key] ?? '').toString().trim();
            if (!value) {
            errs[key] = kErrorState[key];
            }
        }
        return errs;
    };

    const [errors, setErrors] = useState(() => getInitialErrors(initialItemData));
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [resetUploader, setResetUploader] = useState(false);
    const [newUploadedimages, setNewUploadedimagesImages] = useState([]);

    const handleSubmit = async (event) => {
        // console.log('Edit User Item Form is submitted!');

        event.preventDefault();

        const trimmedName = formData.name.trim();
        const trimmedDescription = formData.description.trim();
        const trimmedLocation = formData.location.trim();
        const trimmedContactInformation = formData.contact_information.trim();

        // console.log('deletedImageIds is now: ', deletedImageIds);

        // Filter out deleted images  before submitting
        const filteredImagesUrls = formData.images
        .filter(img => !deletedImageIds.includes(img.image_id))
        .map(img => img.image_url);

        const combinedImages = [...filteredImagesUrls, ...newUploadedimages];

        const updateUserItemData = {
                name: trimmedName,
                category: formData.category,
                description: trimmedDescription,
                price: Number(formData.price),
                location: trimmedLocation,
                contact_information: trimmedContactInformation,
                images: combinedImages, // for API calls, the images need to array of URLs
                sold_status: formData.sold_status === 'available' ? false : true,
        };

        // trim the title and owner before posting
        // console.log("Update User Item Form: ", updateUserItemData);

        const newErrors = getInitialErrors(updateUserItemData);
        setErrors(newErrors);

        // post new ItemData
        await onUpdateUserItem(itemData.listing_id, updateUserItemData);

        // 3) Clear deleted images after successful save
        setDeletedImageIds([]);

        setNewUploadedimagesImages([]);

        setResetUploader(true); // Trigger image uploader reset
        setTimeout(() => setResetUploader(false), 100); // Reset the flag after effect

        // alert('Going back  to my-sell-listings pages!')
        onHandleEditClose();
        navigate('/profile/my-sell-listings'); // Redirect user to home page or dashboard ediUser Form

    };

    const handelCancelEdit = () => {
        onCancelUpdateUserItem();
        setFormData(initialItemData);
        setDeletedImageIds([]);
        setNewUploadedimagesImages([]);
        setResetUploader(true); // Trigger image uploader reset
    }


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

    const handleDeleteImage = (imageId) => {
        // Mark image as deleted locally
        setDeletedImageIds(prev => [...prev, imageId]);

        // Also remove from images in form data
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img.image_id !== imageId)
        }));
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
        
        <form className='edit-user-item-form' onSubmit={handleSubmit}>
            <div className='edit-user-item-form-header'>
            Edit an Item for Sale
            </div>

            <div className='edit-user-item-form-field'>
                <label htmlFor="name-input">Name</label>
                {makeControlledInput('name')}
            </div>
            {errors.name && (
            <div className='edit-user-item-form-errors'>
                <p className='edit-user-item-error-text'>{errors.name}</p>
            </div>
            )}

            <div className='edit-user-item-form-field-category'>
                <label htmlFor="category-input">Category</label>
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

                {errors.category && (
                <div className='edit-user-item-form-errors'>
                    <p className='edit-user-item-error-text'>{errors.category}</p>
                </div>
                )}
            </div>



            <div className='edit-user-item-form-field'>
                <label htmlFor="description-input">Description</label>
                {makeControlledInput('description')}
            </div>
            {errors.description && (
                <div className='edit-user-item-form-errors'>
                    <p className='edit-user-item-error-text'>{errors.description}</p>
                </div>
            )}

            <div className='edit-user-item-form-field'>
                <label htmlFor="price-input">Price:</label>
                {makeControlledInput('price', 'number')}
            </div>
            {errors.price && (
                <div className='edit-user-item-form-errors'>
                    <p className='edit-user-item-error-text'>{errors.price}</p>
                </div>
            )}


            <div className='edit-user-item-form-field'>
                <label htmlFor="price-input">Location</label>
                {makeControlledInput('location')}
            </div>
            {errors.location && (
                <div className='edit-user-item-form-errors'>
                    <p className='edit-user-item-error-text'>{errors.location}</p>
                </div>
            )}

            <div className='edit-user-item-form-field'>
                <label htmlFor="contact-input">Contact Info</label>
                {makeControlledInput('contact_information')}
            </div>
                {errors.contact_information && (
                <div className='edit-user-item-form-errors'>
                    <p className='edit-user-item-error-text'>{errors.contact_information}</p>
                </div>
                )}

            <div className='edit-user-item-form-field-status'>
                <label htmlFor="sold-status-input">Sold Status</label>
                <select
                    id="sold_status"
                    name='sold_status'
                    value={formData.sold_status}
                    onChange={handleChange}
                >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>
            {errors.sold_status && (
            <div className='edit-user-item-form-errors'>
                <p className='edit-user-item-error-text'>{errors.sold_status}</p>
            </div>
            )}

            <h3 className='edit-user-item-form-images-header'>Images for This Item</h3>
            <ImageList 
                images={formData.images} 
                onLocalHandlelDeleteImage={handleDeleteImage}
            />

            <EditUserItemImageUploader 
                onSetNewUploadedimagesImages={setNewUploadedimagesImages}
                resetUploader={resetUploader}
            />

            <div className="edit-user-item-button-wrapper">
                <button disabled={hasErrors}>SAVE</button>
            </div>

            <div className="edit-user-item-button-wrapper">
                <button type="button" onClick={handelCancelEdit}>CANCEL</button>
            </div>

            <div className="delete-user-item-button-wrapper">
                <button type="button" onClick={() => onDeleteUserItem(formData.listingId)}>DELETE</button>
            </div>

        </form>
    );
};


EditUserItemForm.propTypes = {
  itemData: PropTypes.shape({
    listing_id: PropTypes.number,
    user_id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    contact_information: PropTypes.string,
    images: PropTypes.array,
    sold_status: PropTypes.string,
  }).isRequired,
  onUpdateUserItem: PropTypes.func.isRequired,
  onCancelUpdateUserItem: PropTypes.func.isRequired,
//   onDeleteImage: PropTypes.func.isRequired,
  onDeleteUserItem: PropTypes.func.isRequired,
};

export default EditUserItemForm;