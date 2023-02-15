import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PrivateRoute from './components/PrivateRoute';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import AdminRoute from './components/AdminRoute';
import UserList from './pages/UserList';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container fluid>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/cart/:id?' element={<Cart />} />
              <Route path='/profile' element={<PrivateRoute />}>
                <Route path='/profile' element={<UserProfile />} />
              </Route>
              <Route path='/shipping' element={<PrivateRoute />}>
                <Route path='/shipping' element={<Shipping />} />
              </Route>
              <Route path='/payment' element={<PrivateRoute />}>
                <Route path='/payment' element={<Payment />} />
              </Route>
              <Route path='/placeorder' element={<PrivateRoute />}>
                <Route path='/placeorder' element={<PlaceOrder />} />
              </Route>
              <Route path='/orders/:id' element={<PrivateRoute />}>
                <Route path='/orders/:id' element={<Order />}></Route>
              </Route>
              <Route path='/users' element={<AdminRoute />}>
                <Route path='/users' element={<UserList />}></Route>
              </Route>
            </Routes>
          </Container>
          <ToastContainer />
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
