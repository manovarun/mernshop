import React from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import {
  decrementQuantity,
  incrementQuantity,
  removeCartItem,
} from '../features/Cart/CartSlice';

const Cart = () => {
  const { user } = useSelector((state) => state.Auth);
  const { cartItems } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartQty =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
      : 0;

  const cartAmnt =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
      : 0;

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/shipping');
    }
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <Link to='/' className='btn btn-dark my-3'>
          Go Back
        </Link>
        <h1>Shopping Cart</h1>
      </div>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go to Home</Link>
            </Message>
          ) : (
            <>
              <Table striped>
                <thead className='bg-dark text-white'>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Total Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Image
                          src={item.image}
                          alt={item}
                          fluid
                          rounded
                          style={{ width: '50%' }}
                        />
                      </td>
                      <td>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <Button
                            variant='link'
                            onClick={() =>
                              dispatch(decrementQuantity(item._id))
                            }
                          >
                            <FaMinusCircle size={24} />
                          </Button>
                          {item.quantity}
                          <Button
                            variant='link'
                            onClick={() =>
                              dispatch(incrementQuantity(item._id))
                            }
                          >
                            <FaPlusCircle size={24} />
                          </Button>
                        </div>
                      </td>
                      <td>
                        <Col md={2}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Col>
                      </td>
                      <td>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => dispatch(removeCartItem(item._id))}
                        >
                          <FaTrashAlt size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Total Items: ({cartQty})</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Total Amount: (${cartAmnt.toFixed(2)})</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button
                    type='button'
                    className='btn btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
