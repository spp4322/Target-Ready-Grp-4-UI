import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from "./components/productList";
import CreateOrder from "./components/createOrder";
import OrderHistory from "./components/orderHistory";
import ProductListItem from './components/productListItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList />} />
          <Route
            path='/create-order'
            element={<CreateOrder />}
          />

          <Route
            path='/order-historu'
            element={
              <OrderHistory />
            }
          />

          <Route
            path='/product-list-item'
            element={
              <ProductListItem />
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
