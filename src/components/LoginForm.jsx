import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/LoginForm.css';

const kDefaultFormState = {
  email: '',
};

const kErrorState = {
  message: 'Email cannot be empty',
};


const LoginForm = ({ onLoginUser }) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const [errors, setErrors] = useState(kErrorState);

  const handleSubmit = (event) => {
    // console.log('Login Form submitted!');

    event.preventDefault();
    
    // trim the title and owner before posting
    const trimmedEmail = formData.email.trim();

    // console.log("Email:", { message: trimmedEmail});
    onLoginUser({ email: trimmedEmail});

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

    const trimmedLength = inputValue.trim().length;

    if (trimmedLength === 0) {
      setErrors((prev) => ({
        ...prev,
        message: 'Email cannot be empty',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        message: null,
      }));
    }
  };

  const makeControlledInput = (inputName) => {
    return (
      <>
        <input
          onChange={handleChange}
          type='email'
          id={`input-${inputName}`}
          name={inputName}
          value={formData[inputName]}
          placeholder={inputName}
        />
      </>
    );
  };

    return (
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='form-header'>
          Welcome Back, Tradespherers!
        </div>
        <>
          <div className='form-field'>
            {makeControlledInput('email')}
          </div>
          {errors.message && (
            <div className='form-errors'>
                <p className='error-text'>{errors.message}</p>
            </div>
          )}

          <div className="button-wrapper">
            <button disabled={errors.message}>LOG IN</button>
          </div>
        </>
      </form>
  );
};

LoginForm.propTypes = {
  onLoginUser: PropTypes.func.isRequired,
};

export default LoginForm;