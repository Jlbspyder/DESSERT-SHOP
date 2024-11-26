import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

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
    <form className='find sm-search md-search' onSubmit={submitHandler}>
      <div className='menu-search'>
        <input
          type='text'
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Menu...'
        />
      <button type='submit' className='search-menu'>
        <FaSearch />
      </button>
      </div>
    </form>
  );
};

export default SearchBox;
