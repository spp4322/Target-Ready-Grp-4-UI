import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <>
        <div className='alert alert-primary'>
          <div className='container'>
            <h1>
              <i className='me-3'></i>
              <span>E-Commerce Website</span>
            </h1>
          </div>
        </div>
        <div className='container'>
          <Link className='btn btn-link' to='/'>
            Products
          </Link>{' '}
          |
          <Link className='btn btn-link' to='/cart'>
            Cart
          </Link>{' '}
          {/* | */}
          {/* <Link className='btn btn-link' to='/order-history'>
            My Orders
          </Link>{' '} */}
        </div>
      </>
    );
  }
}

export default Header;