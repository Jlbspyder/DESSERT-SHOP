import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaginateMenu = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className='paginate'>
        {[...Array(pages).keys()].map((el) => (
          <Link
            key={el + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/menu/search/${keyword}/page/${el + 1}`
                  : `/menu/page/${el + 1}`
                : `/admin/menulist/${el + 1}`
            }
          >
            <div className={el + 1 === page ? 'activePage' : ''}>{el + 1}</div>
          </Link>
        ))}
      </div>
    )
  );
};

export default PaginateMenu;
