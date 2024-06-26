import React from "react";

const OrderItem = ({ order, quantity, date }) => {
  return (
    <li className="list-group-item">
      <div>Order ID: {order}</div>
      <div>Quantity: {quantity}</div>
      <div>Date: {date}</div>
    </li>
  );
};

export default OrderItem;
