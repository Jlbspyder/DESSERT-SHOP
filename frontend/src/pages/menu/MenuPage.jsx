import './menupage.css';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import MenuList from '../../components/MenuList';
import { useSelector } from 'react-redux';
import PaginateMenu from '../../components/PaginateMenu';
import { useGetMenuQuery } from '../../slices/menuApiSlice';
import CartSummary from '../../components/CartSummary';
import SearchBox from '../../components/SearchBox';

const MenuPage = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetMenuQuery({ pageNumber, keyword});

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className='menu-list'>
      <div className="menu-flex">
        <h2>Desserts</h2>
        <div className='sm-search'><SearchBox /></div>
      </div>
      <div className='menu-wrapper'>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div>{error?.data?.message || error.error}</div>
        ) : (
          <div className='menu-image-container'>
            {data.menu.map((item) => (
              <MenuList key={item.name} menuItem={item} {...item} />
            ))}
          </div>
        )}
        <div className='cart'>
          <h2>Your Cart ({totalItem})</h2>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className='basket'>
                  <CartSummary id={item._id} {...item} item={item} />
                </div>
              ))}
            </>
          ) : (
            <div className='empty'>
              <img
                src='/images/illustration-empty-cart.svg'
                alt='cart'
                className='empty-cart'
              />
              <p>Your added items will appear here</p>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className='order-total'>
              <p>Order Total</p>
              <h1>${subTotal.toFixed(2)}</h1>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className='carbon'>
              <img
                src='/images/icon-carbon-neutral.svg'
                alt=''
                className='carbon-img'
              />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
          )}
          {cartItems.length > 0 && (
            <button onClick={() => navigate('/cart')} className='confirm-order'>
              Proceed to checkout
            </button>
          )}
        </div>
      </div>
      <PaginateMenu
        pages={data?.pages}
        page={data?.page}
        keyword={keyword ? keyword : ''}
      />
    </div>
  );
};

export default MenuPage;
