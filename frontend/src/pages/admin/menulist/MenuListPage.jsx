import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import Paginate from '../../../components/PaginateMenu';
import {
  useGetMenuQuery,
  useCreateMenuMutation,
  useDeleteMenuMutation,
} from '../../../slices/menuApiSlice';
import './menulist.css';

const MenuListPage = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, refetch } = useGetMenuQuery({ pageNumber });

  const [createMenu, { isLoading: loadingCreateMenu }] =
    useCreateMenuMutation();

  const [deleteMenu, { isLoading: loadingDeleteMenu }] =
    useDeleteMenuMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteMenu(id);
        refetch();
        toast.success('Menu deleted');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const createMenuHandler = async () => {
    if (window.confirm('Are you sure you want to add a new menu?')) {
      try {
        await createMenu();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className='create-menu'>
      <div className='add-menu'>
        <h1>Menu</h1>
        <button
          className='confirm-order btn-straight check-details edt'
          onClick={createMenuHandler}
        >
          <FaEdit /> Add Menu
        </button>
      </div>
      {loadingCreateMenu && <Spinner />}
      {loadingDeleteMenu && <Spinner />}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody id='crt'>
              {data.menu.map((menu) => (
                <tr key={menu._id}>
                  <td>
                    <span className='cell-header'>ID:</span>
                    {menu._id}
                  </td>
                  <td>
                    <span className='cell-header'>NAME:</span>
                    {menu.name}
                  </td>
                  <td>
                    <span className='cell-header'>CATEGORY:</span>{' '}
                    {menu.category}
                  </td>
                  <td>
                    <span className='cell-header'>PRICE:</span>
                    {menu.price}
                  </td>
                  <td>
                    <div className='menu-buttons'>
                      <Link to={`/admin/menu/${menu._id}/edit`}>
                        <button className='confirm-order btn-straight check-details'>
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className='confirm-order btn-straight check-details'
                        onClick={() => deleteHandler(menu._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default MenuListPage;
