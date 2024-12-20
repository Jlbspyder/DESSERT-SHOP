import React from 'react';
import { Link } from 'react-router-dom';

const FoodQualityView = ({ _id, img, category }) => {
  return (
    <Link to={`/menu/${_id}`}>
      <div key={_id} className='cake'>
        <img src={img} alt='' className='dessert-image' />
        <h5>{category}</h5>
        <button className='confirm-order click'>Check it out</button>
      </div>
    </Link>
  );
};

export default FoodQualityView;
