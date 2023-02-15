import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import {
  FaEdit,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaTrashAlt,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUsers } from '../features/User/UserSlice';

const UserList = () => {
  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.User
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSuccess) {
      dispatch(getUsers());
    }
  }, [dispatch, users, isSuccess]);

  const deleteHandler = (id) => {};

  return (
    <Container>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th style={{ width: '160px' }}>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailTo:${user.email}`}>{user.email}</a>
                    </td>
                    <td className='text-center'>
                      {user.isAdmin ? (
                        <FaRegCheckCircle className='text-success fs-3' />
                      ) : (
                        <FaRegTimesCircle className='text-danger fs-3' />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='dark' className='btn-sm me-2'>
                          <FaEdit className='fs-6' />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrashAlt className='fs-6' />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default UserList;
