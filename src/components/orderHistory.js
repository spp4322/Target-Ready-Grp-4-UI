import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myAxios } from "../services/helper";
import OrderItem from "./orderItem";

const OrderHistory = () => {
  const username = useSelector((state) => state.username);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <div className="container">
      <h2>Order History for {username}</h2>

      {loading && <div>Loading...</div>}
      {error && <div>Error loading orders: {error.message}</div>}
      {!loading && !error && orderList.length > 0 && (
        <ul className="list-group">
          {orderList.map((order) => (
            <OrderItem
              key={order.id} // Assuming 'id' is a unique identifier for each order
              order={order.productList.productID}
              quantity={order.productList.quantity}
              date={order.date}
            />
          ))}
        </ul>
      )}
      {!loading && !error && orderList.length === 0 && username && (
        <div>No orders found for username: {username}</div>
      )}
    </div>
  );
};

export default OrderHistory;
