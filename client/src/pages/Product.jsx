import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { getProduct, reset } from '../features/Product/ProductSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../features/Cart/CartSlice';

const Product = () => {
  const params = useParams();

  const [qty, setQty] = useState(1);

  const { product, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.Product
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {product.rating && (
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong> ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <div className='d-grid gap-2'>
                    <Button
                      variant='primary'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={() => {
                        dispatch(
                          addToCart({
                            product: {
                              product: product._id,
                              name: product.name,
                              image: product.image,
                              price: product.price,
                              countInStock: product.countInStock,
                              qty,
                            },
                          })
                        );
                        navigate('/cart');
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Product;
