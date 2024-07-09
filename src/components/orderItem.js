import React from "react";

const OrderItem = ({ order, quantity, date }) => {
  return (
    <li className="list-group-item">
      <p>Product ID: {order}</p>
      <p>Quantity: {quantity}</p>
    </li>
  );
};

export default OrderItem;
