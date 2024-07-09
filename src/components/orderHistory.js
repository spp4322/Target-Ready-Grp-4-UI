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
        const response = await myAxios.get(
          `api/v1/target/${username}/getAllOrder`
        );
        setOrderList(response.data);
        const date = response.data[0].date;
        setDate(date);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <>
      <Header />
      <div className="order-history-container">
        <h2 className="order-history-title">Order History</h2>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error loading orders: {error.message}</div>}
        {!loading && !error && orderList.length > 0 && (
          <ul className="order-list">
            {orderList.map((order, index) => (
              <li key={order.orderID} className="order-item">
                <h3 className="order-number">Order Number: {index + 1}</h3>
                {order.productList.map((product) => (
                  <OrderItem
                    key={product.productID}
                    order={product.productID}
                    quantity={product.productQuantity}
                  />
                ))}
                <i>{new Date(date).toLocaleString()}</i>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && orderList.length === 0 && username && (
          <div className="no-orders">No orders found for username: {username}</div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
