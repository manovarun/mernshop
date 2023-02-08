import React from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import { getProducts, reset } from '../features/Product/ProductSlice';
import Message from '../components/Message';

const Home = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.Product
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.length ? (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductItem product={product} />
                </Col>
              ))
            ) : (
              <h2 className='text-center'>No Products Found!</h2>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
