import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useUpdateMenuMutation,
  useUploadMenuImageMutation,
  useGetMenuDetailsQuery,
} from '../../../slices/menuApiSlice';
import Spinner from '../../../components/Spinner';
import './menuedit.css';

const MenuEditPage = () => {
  const { id: menuId } = useParams();
  const [menuData, setMenuData] = useState({
    name: '',
    price: 0,
    category: '',
    desktopImg: '',
    mobileImg: '',
    tabletImg: '',
    img: '',
    thumbnail: '',
    numInStock: 0,
    description: '',
  });

  const {
    data: menu,
    isLoading,
    refetch,
    error,
  } = useGetMenuDetailsQuery(menuId);

  const [updateMenu, { isLoading: loadingUpdate }] = useUpdateMenuMutation();

  const [uploadMenuImage, { isLoading: loadingUpload}] = useUploadMenuImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (menu) {
      setMenuData({
        ...menuData,
        name: menu.name,
        price: menu.price,
        category: menu.category,
        numInStock: menu.numInStock,
        description: menu.description,
        desktopImg: menu.desktopImg,
        mobileImg: menu.mobileImg,
        tabletImg: menu.tabletImg,
        thumbnail: menu.thumbnail,
        img: menu.img,
      });
    }
  }, [menu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevMenuData) => ({ ...prevMenuData, [name]: value }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedMenu = {
      menuId,
      name: menuData.name,
      price: menuData.price,
      category: menuData.category,
      numInStock: menuData.numInStock,
      description: menuData.description,
      desktopImg: menuData.desktopImg,
      mobileImg: menuData.mobileImg,
      tabletImg: menuData.tabletImg,
      thumbnail: menuData.thumbnail,
      img: menuData.img,
    };
    const result = await updateMenu(updatedMenu);
    if (result.error) {
      toast.error('Oops, an error occured');
    } else {
      toast.success('Menu updated');
      navigate('/admin/menulist');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadMenuImage(formData).unwrap();
      toast.success(res.message);
      setMenuData((prev) => ({...prev, img: res.image}))
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Link to='/admin/menulist' className='edit-btn'>
        &larr; Go Back
      </Link>
      <div className='menu-edit'>
        <>
          <h1>Edit Menu</h1>
          {loadingUpdate && <Spinner />}

          {isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={submitHandler}>
              <div className='form-control'>
                <label>Name</label>
                <input
                  type='text'
                  placeholder='Enter name'
                  name='name'
                  value={menuData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-control'>
                <label>Price</label>
                <input
                  type='number'
                  placeholder='Enter price'
                  name='price'
                  value={menuData.price}
                  onChange={handleChange}
                />
              </div>
              <div className='form-control upload'>
                <label>Image</label>
                <input
                  type='text'
                  placeholder='Enter image url'
                  name='img'
                  value={menuData.img}
                  onChange={handleChange}
                />
                <input 
                  type="file"
                  label="Choose file"
                  id='upload'
                  onChange={uploadFileHandler}
                  />
              </div>
              <div className='form-control'>
                <label>Category</label>
                <input
                  type='text'
                  placeholder='Enter category'
                  name='category'
                  value={menuData.category}
                  onChange={handleChange}
                />
              </div>
              <div className='form-control'>
                <label>Number in Stock</label>
                <input
                  type='number'
                  placeholder='Enter number in stock'
                  name='numInStock'
                  value={menuData.numInStock}
                  onChange={handleChange}
                />
              </div>
              <div className='form-control'>
                <label>Description</label>
                <input
                  type='text'
                  placeholder='Enter description'
                  name='description'
                  value={menuData.description}
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='login-btn'>
                UPDATE
              </button>
            </form>
          )}
        </>
      </div>
    </>
  );
};

export default MenuEditPage;
