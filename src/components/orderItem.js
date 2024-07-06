import React from "react";

const OrderItem = ({ order, quantity, date }) => {
  return (
    <li className="list-group-item">
      <p>Product ID: {order}</p>
      <p>Quantity: {quantity}</p>
      <p>Date: {new Date(date).toLocaleString()}</p>
    </li>
  );
};

export default OrderItem;
