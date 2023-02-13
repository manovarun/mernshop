import React, { useState } from 'react';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { addPaymentMethod } from '../features/Cart/CartSlice';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress, paymentMethod: cartPaymentMethod } = useSelector(
    (state) => state.Cart
  );

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState(cartPaymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='legend'>
          <Form.Label as='legend'>Select Method</Form.Label>
        </Form.Group>
        <Form.Group controlId='paymentMethod'>
          <Row>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='mb-3'
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='mb-3'
              ></Form.Check>
            </Col>
          </Row>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
