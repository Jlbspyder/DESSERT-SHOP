import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaginateOrder = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <div className='paginate'>
        {[...Array(pages).keys()].map((el) => (
          <Link
            key={el + 1}
            to={
              isAdmin
                && `/admin/orderlist/${el + 1}`
            }
          >
            <div className={el + 1 === page ? 'activePage' : ''}>{el + 1}</div>
          </Link>
        ))}
      </div>
    )
  );
};

export default PaginateOrder;
