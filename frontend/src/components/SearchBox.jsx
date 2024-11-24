import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/menu/search/${keyword}`);
      setKeyword('')
    } else {
      navigate('/');
    }
  };

  return (
    <form id='search' onSubmit={submitHandler}>
      <div className='menu-search'>
        <input
          type='text'
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Menu...'
        />
      <button type='submit' className='search-menu'>SEARCH</button>
      </div>
    </form>
  );
};

export default SearchBox;
