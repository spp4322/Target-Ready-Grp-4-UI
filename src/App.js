import logo from './logo.svg';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from "./components/productList";
import CreateOrder from "./components/createOrder";
import OrderHistory from "./components/orderHistory";
import ProductListItem from './components/productListItem';
import Cart from './components/cart';
import Header from './components/header';

const products = [
  {
    id: 1,
    productName: 'Shampoo',
    productPrice: 448
  },
  {
    id: 2,
    productName: 'Perfume',
    productPrice: 880
  },
  {
    id: 3,
    productName: 'Towel',
    productPrice: 670
  }
];

const initialOrders = [
  {
    orderId: 1,
    customerId: 1,
    productId: 1,
    quantity: 2,
    date: new Date()
  },
  {
    orderId: 2,
    customerId: 2,
    productId: 3,
    quantity: 1,
    date: new Date()
  },
  {
    orderId: 3,
    customerId: 1,
    productId: 1,
    quantity: 3,
    date: new Date()
  }
];

//const cartItems = [];

function App() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [cartList, setCartList] = useState([]);

  const addOrder = (order) => {
    console.log("addOrder called", order);
    const arr = orderList;
    arr.push(order);
    setOrderList(arr);
    console.log(orderList);
  };


  const addCartItem = (product) => {
    const arr = cartList;
    arr.push(product);
    setCartList(arr);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList products={products} addCartItem={addCartItem} cartList={cartList} />} />
          <Route
            path='/create-order'
            element={<CreateOrder addOrder={addOrder} />}
          />

          <Route
            path='/order-history'
            element={
              <OrderHistory orders={initialOrders} products={products} />
            }
          />

          <Route
            path='/cart'
            element={
              <Cart cartList={cartList} products={products} />
            }
          />

          <Route
            path='/product-list-item'
            element={
              <ProductListItem />
            }
          />
        </Routes>
      </BrowserRouter></>
  );
}

export default App;
