import { useState } from 'react';
import { useNavigate } from 'react-router';
import SearchIcon from '../assets/SearchIcon.png';
import '../styles/SearchForm.css';

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
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Trim input values to avoid leading/trailing whitespace issues
    const trimmedSearchKeyWord = formData.search.trim();
    if (!trimmedSearchKeyWord) {
        alert('Search cannot be empty');
        return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmedSearchKeyWord)}`);

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
      <>
        <div className='search-form-field'>
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


export default SearchForm;