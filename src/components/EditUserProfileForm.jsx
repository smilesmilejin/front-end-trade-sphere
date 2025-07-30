import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';

// const kDefaultFormState = {
//   name: '',
//   email: '',
//   address: '',
// };


const kErrorState = {
  message: '',
};




const EditUserProfileForm = ({ userData, onUpdateUserProfile, onCancelUpdateUserProfile }) => {
    // const [curUserData, setCurUserData] = useContext(UserContext);
    // Make sure the initial userData fields are never null or undefined — use empty strings instead:
    const initialUserData = {
      name: userData.name || '',
      email: userData.email || '',
      address: userData.address || '',
    };
    const [formData, setFormData] = useState(initialUserData);
    const [errors, setErrors] = useState(kErrorState);



    const handleSubmit = (event) => {
      console.log('submitted!');

      event.preventDefault();
      
      const trimmedEmail = formData.email.trim();

      const trimmedName = formData.name.trim();

      const trimmedAddress = formData.address.trim();

      const updateUserProfileData = {
          email: trimmedEmail, 
          name: trimmedName,
          address: trimmedAddress
      };

      // trim the title and owner before posting
      console.log("Edit User Profile Form: ", updateUserProfileData);


      onUpdateUserProfile(updateUserProfileData);

      setFormData(updateUserProfileData);
      // setCurUserData(updateUserProfileData);
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
      <form className='edit-user-profile-form' onSubmit={handleSubmit}>
        <div className='form-header'>
          Edit User Profile
        </div>
        <>
          <div className='form-field'>
            {makeControlledInput('name')}
          </div>

          <div className='form-field'>
            {makeControlledInput('email','email')}
          </div>
          {errors.message && (
            <div className='form-errors'>
                <p className='error-text'>{errors.message}</p>
            </div>
          )}

          <div className='form-field'>
            {makeControlledInput('address')}
          </div>

          <div className="button-wrapper">
            <button disabled={errors.message}>SAVE</button>
          </div>
          <div className="button-wrapper">
            {/* <button>CANCEL</button> */}
            {/* type="button" prevents the cancel button from submitting the form. */}
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
    // Add other fields if needed
  }).isRequired,
  onUpdateUserProfile: PropTypes.func.isRequired,
  onCancelUpdateUserProfile: PropTypes.func.isRequired,
};

export default EditUserProfileForm;