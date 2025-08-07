import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SignupForm.css';

// Default form values
const kDefaultFormState = {
  email: '',
  name: '',
  address: '',
};

// Default error message (used for email field validation)
const kErrorState = {
  message: 'Email cannot be empty',
};


const SignupForm = ({ onSignupUser }) => {

  const [formData, setFormData] = useState(kDefaultFormState);
  const [errors, setErrors] = useState(kErrorState);

  // Handle form submission
  const handleSubmit = (event) => {

    event.preventDefault();
    
    // Trim input values to avoid leading/trailing whitespace issues
    const trimmedEmail = formData.email.trim();
    const trimmedName = formData.name.trim();
    const trimmedAddress = formData.address.trim();

    const signUpData = {
        email: trimmedEmail, 
        name: trimmedName,
        address: trimmedAddress
    };

    // Pass cleaned data to parent component handler
    onSignupUser(signUpData);

    // Reset form and error state
    setFormData(kDefaultFormState);
    setErrors(kErrorState);
  };

  // Handle input field changes and validate email
  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    // Update the corresponding field in formData
    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));

    // Validate email field as user types
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

  // Generate a controlled input field with dynamic attributes
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
      <div className='signup-form-header'>
        Join the TradeSphere!
      </div>
      <>
        <div className='signup-form-field'>
          {makeControlledInput('email','email')}
        </div>
        {errors.message && (
          <div className='signup-form-errors'>
              <p className='error-text'>{errors.message}</p>
          </div>
        )}

        <div className='signup-form-field'>
          {makeControlledInput('name')}
        </div>

        <div className='signup-form-field'>
          {makeControlledInput('address')}
        </div>

        <div className="signup-button-wrapper">
          <button disabled={errors.message}>SIGN UP</button>
        </div>
      </>
    </form>
  );
};

SignupForm.propTypes = {
  onSignupUser: PropTypes.func.isRequired,
};

export default SignupForm;