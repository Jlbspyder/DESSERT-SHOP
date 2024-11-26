import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Spinner from '../../../components/Spinner';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import './userlist.css';

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className='userlist'>
      <h1>Users</h1>
      {loadingDelete && <Spinner />}
      {isLoading ? (
        <Spinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='crt'>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <span className='cell-header'>ID:</span> {user._id}
                </td>
                <td>
                  <span className='cell-header'>NAME:</span>{' '}
                  {user.name.toUpperCase()}
                </td>
                <td>
                  <span className='cell-header'>EMAIL:</span>{' '}
                  <a href={`mailto:${user.email}`}></a>
                  {user.email}
                </td>
                <td>
                  <span className='cell-header'>ADMIN:</span>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <div className='menu-buttons'>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className='confirm-order btn-straight check-details'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className='confirm-order btn-straight check-details'
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
                {/* <td>
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className='confirm-order btn-straight check-details'
                  >
                    <FaTrash />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListPage;
