import React from 'react';
import { Link } from 'react-router-dom';

const PaginateAddress = ({ pages, page, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className='paginate'>
        {[...Array(pages).keys()].map((el) => (
          <Link
            key={el + 1}
            to={
                keyword
                  ? `/resturant/search/${keyword}/page/${el + 1}`
                  : `/resturant/page/${el + 1}`
            }
          >
            <div className={el + 1 === page ? 'activePage' : ''}>{el + 1}</div>
          </Link>
        ))}
      </div>
    )
  );
};

export default PaginateAddress;
