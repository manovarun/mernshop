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
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/shipping' element={<Shipping />} />
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
