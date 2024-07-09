import React from "react";
import PropTypes from "prop-types";

const OrderItem = ({ name, quantity }) => {
  return (
    <div className="order-item">
      <div className="order-item-details">
        <p className="order-item-name">{name}</p>
        <p className="order-item-quantity">Quantity: {quantity}</p>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrderItem;
