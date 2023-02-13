import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={8}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
