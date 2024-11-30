import React from 'react';
import { useParams } from 'react-router-dom';
import './foodquality.css';
import Meta from '../../components/Meta';
import Spinner from '../../components/Spinner';
import { useGetMenuQuery } from '../../slices/menuApiSlice';
import FoodQualityView from '../../components/FoodQualityView';

const FoodQuality = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetMenuQuery({ pageNumber, keyword });

  return (
    <div className='responsibility'>
      <Meta title='JLB24 | Food quality' />
      <div className='responsibility-header'>
        <h1>Our Desserts</h1>
      </div>
      <div className='our-desserts'>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='dessert-wrapper'>
            {data.menu.map((item) => (
              <FoodQualityView key={item._id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodQuality;
