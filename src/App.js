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
    CustomerID: 1,
    ProductList: [{productID: 1, productQuantity: 2}, {productID: 3, productQuantity: 1}],
    date: new Date()
  },
  {
    orderId: 2,
    CustomerID: 2,
    ProductList: [{productID: 2, productQuantity: 3}, {productID: 3, productQuantity: 2}],
    date: new Date()
  },
  {
    orderId: 3,
    CustomerID: 1,
    ProductList: [{productID: 2, productQuantity: 2}],
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

  const emptyCart = () => {
    const arr = [];
    setCartList(arr);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList products={products} addCartItem={addCartItem} cartList={cartList} />} />
          <Route
            path='/create-order'
            element={<CreateOrder addOrder={addOrder} emptyCart={emptyCart} />}
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
