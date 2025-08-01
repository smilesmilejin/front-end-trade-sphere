import { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import SearchIcon from '../assets/SearchIcon.png';
import { useContext } from 'react';

// Default form values
const kDefaultFormState = {
  search: '',
};

// Default error message (used for search field validation)
const kErrorState = {
  message: '',
};


const SearchForm = () => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const [errors, setErrors] = useState(kErrorState);
//   const { userLoginStatus, setUserLoginStatus } = useContext(UserLoginStatusContext);
//   const { setCurUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    console.log('Search Form form submitted!');

    event.preventDefault();
    
    // Trim input values to avoid leading/trailing whitespace issues
    const trimmedSearchKeyWord = formData.search.trim();
    if (!trimmedSearchKeyWord) {
        alert('Search cannot be empty');
        return;
    }

    console.log(encodeURIComponent(trimmedSearchKeyWord));
    navigate(`/search?query=${encodeURIComponent(trimmedSearchKeyWord)}`);

    // const searchData = {
    //     query: trimmedSearchKeyWord, 
    // };

    // console.log("searchData: ", searchData); // trim the title and owner before posting

    // Pass cleaned data to parent component handler
    // onSignupUser(signUpData);

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
          placeholder="Search Items"
        />
      </>
    );
  };

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      {/* <div className='form-header'>
        Search Items
      </div> */}
      <>
        <div className='form-field'>
          {makeControlledInput('search')}
        </div>

        {errors.message && (
          <p id="search-error" className="error-message">
            {errors.message}
          </p>
        )}
        <button className="search-button" aria-label="Search" type="submit">
            <img src={SearchIcon} alt="Search" />
        </button>
      </>
    </form>
  );
};

// SearchForm.propTypes = {
//   onSignupUser: PropTypes.func.isRequired,
// };

export default SearchForm;