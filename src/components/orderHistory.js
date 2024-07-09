import React, { useState, useEffect } from "react";
import { myAxios } from "../services/helper";
import OrderItem from "./orderItem";
import Header from "./header";
import "../css/orderHistory.css";

const OrderHistory = () => {
  const username = localStorage.getItem("username");
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!username) return;

      setLoading(true);
      setError(null);

      try {
        const response = await myAxios.get(`api/v1/target/${username}/getAllOrder`);
        const orders = response.data;

        // Map through each order and fetch product names asynchronously
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            const updatedProductList = await Promise.all(
              order.productList.map(async (product) => {
                const name = await fetchProductName(product.productID);
                return { ...product, name };
              })
            );
            return { ...order, productList: updatedProductList };
          })
        );

        setOrderList(updatedOrders);
        if (updatedOrders.length > 0) {
          const date = updatedOrders[0].date;
          setDate(date);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  const fetchProductName = async (productId) => {
    try {
      const response = await myAxios.get(`api/v1/target/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product name for productId ${productId}:`, error);
      return 'Product Name Not Found';
    }
  };

  return (
    <>
      <Header />
      <div className="order-history-container">
        <h2 className="order-history-title">Order History</h2>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error loading orders: {error.message}</div>}
        
        {!loading && !error && orderList.length > 0 ? (
          <ul className="order-list">
            {orderList.map((order, index) => (
              <li key={order.orderID} className="order-list-item">
                <div className="order-details">
                  <h3 className="order-number">Order Number: {index + 1}</h3>
                  <div className="order-items">
                    {order.productList.map((product) => (
                      <OrderItem
                        key={product.productID}
                        name={product.name}
                        quantity={product.productQuantity}
                      />
                    ))}
                  </div>
                  <p className="order-date">Order Date: {new Date(order.date).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-orders">No orders found for username: {username}</div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
