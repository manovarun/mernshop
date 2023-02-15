import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import Loader from './Loader';

const PayPalButton = ({ totalPrice }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <PayPalButtons
          style={{ layout: 'horizontal' }}
          createOrder={(data, actions) => onCreateOrder(data, actions)}
          onApprove={(data, actions) => onApproveOrder(data, actions)}
        />
      )}
    </div>
  );
};

export default PayPalButton;
