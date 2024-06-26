import React, { useState, useEffect } from "react";
import { myAxios } from "../services/helper";
import OrderItem from "./orderItem";

const OrderHistory = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUsername(username);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!submittedUsername) return;

      setLoading(true);
      setError(null);

      try {
        const response = await myAxios.get(
          `api/v1/target/${submittedUsername}/getAllOrder`
        );
        setOrderList(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [submittedUsername]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-inline my-4">
        <label className="mr-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            className="form-control ml-2"
          />
        </label>
        <button type="submit" className="btn btn-primary ml-2">
          Get Order History
        </button>
      </form>

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
      {!loading && !error && orderList.length === 0 && submittedUsername && (
        <div>No orders found for username: {submittedUsername}</div>
      )}
    </div>
  );
};

export default OrderHistory;
