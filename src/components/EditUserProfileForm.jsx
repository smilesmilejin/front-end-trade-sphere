import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EditUserProfileForm.css';

const kErrorState = {
  message: '',
};


const EditUserProfileForm = ({ userData, onUpdateUserProfile, onCancelUpdateUserProfile }) => {
    // Make sure the initial userData fields are never null or undefined — use empty strings instead:
    const initialUserData = {
      name: userData.name || '',
      email: userData.email || '',
      address: userData.address || '',
    };

    const [formData, setFormData] = useState(initialUserData);
    const [errors, setErrors] = useState(kErrorState);

    const handleSubmit = (event) => {

      event.preventDefault();
      
      const trimmedEmail = formData.email.trim();
      const trimmedName = formData.name.trim();
      const trimmedAddress = formData.address.trim();

      const updateUserProfileData = {
          email: trimmedEmail, 
          name: trimmedName,
          address: trimmedAddress
      };

      onUpdateUserProfile(updateUserProfileData);

      setFormData(updateUserProfileData);
      setErrors(kErrorState);
    };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));

    if (inputName === 'email') {
        const trimmedLength = inputValue.trim().length;

        if (trimmedLength === 0) {
            setErrors((prev) => ({
                ...prev,
                message: 'Email cannot be empty',
            }));
        } else {
                setErrors((prev) => ({
                ...prev,
                message: '',
            }));
        }
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
        />
      </>
    );
  };

    return (
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className='edit-user-form-header'>
          Edit User Profile
        </div>
        <>
          <div className='edit-user-form-field'>
            {makeControlledInput('name')}
          </div>

          <div className='edit-user-form-field'>
            {makeControlledInput('email','email')}
          </div>
          {errors.message && (
            <div className='edit-user-form-errors'>
                <p className='edit-user-form-error-text'>{errors.message}</p>
            </div>
          )}

          <div className='edit-user-form-field'>
            {makeControlledInput('address')}
          </div>

          <div className="edit-user-button-wrapper">
            <button disabled={errors.message}>SAVE</button>
          </div>

          <div className="edit-user-button-wrapper">
            <button type="button" onClick={onCancelUpdateUserProfile}>CANCEL</button>
          </div>

        </>
      </form>
  );
};


EditUserProfileForm.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onUpdateUserProfile: PropTypes.func.isRequired,
  onCancelUpdateUserProfile: PropTypes.func.isRequired,
};

export default EditUserProfileForm;