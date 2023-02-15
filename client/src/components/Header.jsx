import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../features/Auth/AuthSlice';
import { orderReset } from '../features/Order/OrderSlice';
import { cartReset } from '../features/Cart/CartSlice';
import { userReset } from '../features/User/UserSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const cartQty =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.qty, 0)
      : 0;

  const logoutHandler = () => {
    dispatch(reset());
    dispatch(orderReset());
    dispatch(cartReset());
    dispatch(userReset());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>MERNSHOP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='mershop-navbar-nav' />
          <Navbar.Collapse id='mershop-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart ({cartQty})
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
