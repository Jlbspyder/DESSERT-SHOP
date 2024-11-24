import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Spinner from '../../../components/Spinner';
import { useGetUsersQuery, useDeleteUserMutation } from '../../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import './userlist.css'

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete}] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
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
        <table id='create'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name.toUpperCase()}</td>
                <td>
                  <a href={`mailto:${user.email}`}></a>
                  {user.email}
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className='confirm-order btn-straight check-details'>
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className='confirm-order btn-straight check-details'
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListPage;
