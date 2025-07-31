import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import ImageList from './ImageList.jsx';
import EditUserItemImageUploader from './EditUserItemImageUploader.jsx';
import { useNavigate } from 'react-router';

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
    onDeleteImage,
    onHandleEditClose }) => {

    // const [curUserData, setCurUserData] = useContext(UserContext);
    // Make sure the initial userData fields are never null or undefined — use empty strings instead:
    const initialItemData = {
        name: itemData.name || '',
        category: itemData.category || '',
        description: itemData.description || '',
        price: itemData.price || '',
        location: itemData.location || '',
        contact_information: itemData.contact_information || '',
        images:itemData.images || [],
        // sold_status: itemData.sold_status,
        sold_status:
            itemData.sold_status === true 
            // || itemData.sold_status === "true"
            ? "sold"
            : "available",

    };
    const [formData, setFormData] = useState(initialItemData);
    const navigate = useNavigate();

    // const [errors, setErrors] = useState({});
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
        console.log('submitted!');

        event.preventDefault();

        
        const trimmedName = formData.name.trim();
        const trimmedDescription = formData.description.trim();
        // const trimmedPrice = formData.price.trim();
        const trimmedLocation = formData.location.trim();
        const trimmedContactInformation = formData.contact_information.trim();

        console.log('deletedImageIds is now: ', deletedImageIds);



        // const filteredImages = formData.images
        // .filter(img => !deletedImageIds.includes(img.image_id))

        // const updateUserTableData = {
        //         name: trimmedName,
        //         category: formData.category,
        //         description: trimmedDescription,
        //         price: Number(formData.price),
        //         location: trimmedLocation,
        //         contact_information: trimmedContactInformation,
        //         // images: formData.images,
        //         images: filteredImages,
        //         sold_status: formData.sold_status === 'available' ? false : true,
        // }

        // setFormData(updateUserTableData); // Form Data Images, need to images that are objects

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
                // images: formData.images,
                // images: filteredImagesUrls, // for API calls, the images need to array of URLs
                images: combinedImages,
                sold_status: formData.sold_status === 'available' ? false : true,
        };

        // trim the title and owner before posting
        console.log("Update User Item Form: ", updateUserItemData);



        const newErrors = getInitialErrors(updateUserItemData);
        setErrors(newErrors);

        // post new ItemData
        const updatedFormData = await onUpdateUserItem(itemData.listing_id, updateUserItemData);

        // setFormData(updatedFormData)

        // setFormData(prev => ({
        //     ...prev,
        //     ...updatedFormData
        // }));
        console.log('UpdatedFormData: ', updatedFormData)
        // // 2) Delete the images marked for deletion
        // for (const imageId of deletedImageIds) {
        //     await onDeleteImage(imageId, itemData.listing_id);
        // }

        // 3) Clear deleted images after successful save
        setDeletedImageIds([]);

        setNewUploadedimagesImages([]);

        setResetUploader(true); // Trigger image uploader reset
        setTimeout(() => setResetUploader(false), 100); // Reset the flag after effect

        alert('Going back  to my-sell-listings pages!')
        onHandleEditClose();
        navigate('/profile/my-sell-listings'); // Redirect user to home page or dashboard ediUser Form

    };

    const handelCancelEdit = () => {
        onCancelUpdateUserItem();
        setFormData(initialItemData);
        setDeletedImageIds([]);
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
        
        <form className='signup-form' onSubmit={handleSubmit}>
            <div className='form-header'>
            Edit an Item for Sale
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

            {/* <ImageUploader onSetFormData={setFormData} resetUploader={resetUploader}/> */}

            <div className='form-field'>
                <label htmlFor="sold_status">Sold Status:</label>
                <select
                    id="sold_status"
                    name='sold_status'
                    value={formData.sold_status}
                    onChange={handleChange}
                >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>

                {errors.sold_status && (
                <div className='form-errors'>
                    <p className='error-text'>{errors.sold_status}</p>
                </div>
                )}
            </div>
        
          <ImageList 
          images={formData.images} 
            //   onDeleteImage={onDeleteImage}
            onLocalHandlelDeleteImage={handleDeleteImage}
          />

          <EditUserItemImageUploader 
            onSetNewUploadedimagesImages={setNewUploadedimagesImages}
            resetUploader={resetUploader}
          />

          <div className="button-wrapper">
            <button disabled={hasErrors}>SAVE</button>
          </div>
          <div className="button-wrapper">
            {/* <button>CANCEL</button> */}
            {/* type="button" prevents the cancel button from submitting the form. */}
            <button type="button" onClick={handelCancelEdit}>CANCEL</button>
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
  onDeleteImage: PropTypes.func.isRequired,
};

export default EditUserItemForm;