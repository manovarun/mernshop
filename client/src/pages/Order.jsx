import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails } from '../features/Order/OrderSlice';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { FaCreditCard } from 'react-icons/fa';

const Order = () => {
  const {
    isLoading,
    orderDetails: order,
    message,
  } = useSelector((state) => state.Order);

  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;

  const { user } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  const paymentHandler = () => {};

  const deliverHandler = () => {};

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : message ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        order && (
          <>
            <h1>Order {order._id}</h1>
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong className='fw-bold'>Name: </strong>{' '}
                      {order.user.name}
                    </p>
                    <p>
                      <strong className='fw-bold'>Email: </strong>{' '}
                      <a href={`mailTo:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong className='fw-bold'>Address: </strong>
                      {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message variant='success'>Order delivered</Message>
                    ) : (
                      <Message variant='danger'>Order not delivered</Message>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong className='fw-bold'>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message variant='success'>Order paid</Message>
                    ) : (
                      <Message variant='danger'>Order not paid</Message>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is Empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row className='align-items-center'>
                              <Col md={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} X {item.price} = $
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.totalPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className='d-grid'>
                        <Button
                          variant='info'
                          className='rounded'
                          onClick={() => paymentHandler()}
                        >
                          <FaCreditCard className='me-2 ' />
                          PayPal
                        </Button>
                      </div>
                    </ListGroup.Item>
                    {user &&
                      user.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <ListGroup.Item>
                          <div className='d-grid'>
                            <Button
                              type='button'
                              className='rounded'
                              onClick={() => deliverHandler(order)}
                            >
                              Mark as delivered
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default Order;
