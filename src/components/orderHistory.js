import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myAxios } from "../services/helper";
import OrderItem from "./orderItem";

const OrderHistory = () => {
  const username = localStorage.getItem("username");
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
        console.log(response.data);
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
      <h2>Order History</h2>

      {loading && <div>Loading...</div>}
      {error && <div>Error loading orders: {error.message}</div>}
      {!loading && !error && orderList.length > 0 && (
        <ul className="list-group">
          {orderList.map((order, index) => (
            <React.Fragment key={order.orderID}>
              <h3>Order Number: {index + 1}</h3>
              {order.productList.map((product) => (
                <OrderItem
                  key={product.productID}
                  order={product.productID}
                  quantity={product.productQuantity}
                  date={order.date}
                />
              ))}
            </React.Fragment>
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
