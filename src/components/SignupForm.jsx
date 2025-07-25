import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultFormState = {
  email: '',
  name: '',
  address: '',
};


const kErrorState = {
  message: 'Email cannot be empty',
};


const SignupForm = ({ onSignupUser }) => {
    const [formData, setFormData] = useState(kDefaultFormState);
    const [errors, setErrors] = useState(kErrorState);


    const handleSubmit = (event) => {
    console.log('submitted!');

    event.preventDefault();
    
    const trimmedEmail = formData.email.trim();

    const trimmedName = formData.name.trim();

    const trimmedAddress = formData.address.trim();

    const signUpData = {
        email: trimmedEmail, 
        name: trimmedName,
        address: trimmedAddress
    };

    // trim the title and owner before posting
    console.log("Sign up Data: ", signUpData);


    onSignupUser(signUpData);

    setFormData(kDefaultFormState);
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
        <div className='form-header'>
          Sign Up
        </div>
        <>
          <div className='form-field'>
            {makeControlledInput('email','email')}
          </div>
          {errors.message && (
            <div className='form-errors'>
                <p className='error-text'>{errors.message}</p>
            </div>
          )}

          <div className='form-field'>
            {makeControlledInput('name')}
          </div>

          <div className='form-field'>
            {makeControlledInput('address')}
          </div>

          <div className="button-wrapper">
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