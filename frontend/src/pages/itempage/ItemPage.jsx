import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Rating from '../../components/Rating';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { IoChevronBack } from "react-icons/io5";
import { useGetMenuDetailsQuery, useCreateReviewMutation } from '../../slices/menuApiSlice';
import { addToCart } from '../../slices/cartSlice';
import Meta from '../../components/Meta';
import './itempage.css';

const ItemPage = () => {
  const { id: menuId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data: menu, isLoading, error, refetch } = useGetMenuDetailsQuery(menuId);

  const  [createReview, { isLoading: loadingReview}] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);


  const [quan, setQuan] = useState(1)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const addToCartHandler = () => {
    dispatch(addToCart({ ...menu, quan }))
    navigate('/cart')
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        menuId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('')
    } catch (error) {
     toast.error(error?.data?.message || error.error)
    }
  }


  return (
    <div className='item-description'>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <Link to='/menu' className='back-btn'>
            &larr; Go Back
          </Link>
          <Link to={'/menu'}>
            <IoChevronBack className='sm-back-btn' />
          </Link>
          <Meta title={menu.name} />
          <img src={menu.img} alt='dessert-image' className='item-pix' />
          <h1>{menu.name}</h1>
          <Rating
            value={menu.rating}
            text={`${menu.numReviews} reviews`}
          />
          <p className='item-info'> {menu.description} </p>
          <div className='stock'>
            <strong>Price:</strong>
            <p>${Number.parseFloat(menu.price).toFixed(2)}</p>
          </div>
          <div className='stock'>
            <strong>Status:</strong>
            <p>{menu.numInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          </div>
          <div className="in-stock">
            <select value={quan} onChange={(e) => setQuan(Number(e.target.value))}>
              {[...Array(menu.numInStock).keys()].map((el) => (
                <option key={el + 1} value={el + 1}>
                  {el + 1}
                </option>
              ))}
            </select>
            <button
              type='button'
              disabled={menu.numInStock === 0}
              className='item-btn'
                onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
          <div id='reviews'>
            <div className="review-info">
              <h3>Reviews</h3> <br/>
              {menu.reviews.length === 0 && <p>No Reviews</p>}
              {menu.reviews.map((review) => (
                <div key={review._id}>
                 <h5><strong>{review.name}</strong></h5>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
               <br/>
              <hr />
              <br/>
              <h4>Write a Customer Review</h4>
            </div>

            {loadingReview && <Spinner />}
            { userInfo ? (
              <form onSubmit={submitHandler}>
                <div className='form-control'>
                  <label>Rating</label>
                  <select id='make-pick' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value="">Select...</option>
                    <option value="1">1 - Bland</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4 - Delicious</option>
                    <option value="5">5 - Very Delicious</option>
                  </select>
                </div>
                <div className="form-control">
                  <label>Comment</label>
                  <textarea 
                    type="textarea"
                    value={comment}
                    id='comments'
                    rows={10}
                    onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button disabled={loadingReview} type='submit' className='login-btn'>
                  SUBMIT
                </button>
              </form>
            ) : (
              <p>Please <Link to={'/login'}>sign in</Link>to write a review</p>
            )}
          </div>
          
        </>
      )}
    </div>
  );
};

export default ItemPage;
