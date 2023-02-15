import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getMyOrders } from '../features/Order/OrderSlice';
import {
  getUserProfile,
  userReset,
  updateUserProfile,
} from '../features/User/UserSlice';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useSelector((state) => state.Auth);

  const { user, isSuccess, isError, isLoading } = useSelector(
    (state) => state.User
  );

  const {
    orders,
    isLoading: isLoadingOrders,
    isSuccessOrders,
    messageOrders,
    isErrorOrders,
  } = useSelector((state) => state.Order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      if (!user || !isSuccess) {
        dispatch(userReset());
        dispatch(getUserProfile());
      } else {
        setName(user.name);
        setEmail(user.email);
      }

      if (!isSuccessOrders) {
        dispatch(getMyOrders());
      }
    }
  }, [dispatch, token, navigate, user, isSuccess, isSuccessOrders]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      dispatch(updateUserProfile({ name, email, password }));
      toast.success('Profile Updated', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>{isError}</Message>
        ) : (
          <Form onSubmit={submitHandler} className='p-3'>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className='py-3'>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Row>
          </Form>
        )}
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
        {isLoadingOrders ? (
          <Loader />
        ) : isErrorOrders ? (
          <Message variant='danger'>{messageOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='bg-primary text-light'>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <span className='text-danger text-center d-block'>
                          <FaTimes />
                        </span>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt
                      ) : (
                        <span className='text-danger text-center d-block'>
                          <FaTimes />
                        </span>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='primary'>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserProfile;
