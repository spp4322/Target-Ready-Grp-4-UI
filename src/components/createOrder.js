import { useLocation } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { myAxios } from "../services/helper";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Select, Space } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateOrder = ({ emptyCart }) => {
  const { state } = useLocation();
  const { orderList } = state;

  //console.log(orderList);

  const newList = orderList.map((order) => ({
    productID: order.productID,
    productQuantity: order.quantity,
  }));

  const [data, setData] = useState({
    customerUsername: "",
    ProductList: newList,
  });

  const changeHandler = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const cancelButtonHandler = () => {
    setData({
      customerUsername: "",
    });
  };

  const navigate = useNavigate();
  const submitHandler = (evt) => {
    evt.preventDefault();

    if (data.customerUsername.trim().length === 0) return;

    myAxios
      .post("/api/v1/target/order", data)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
      });

    emptyCart();
    navigate("/home", { replace: true });
    setData({
      customerUsername: "",
    });
  };

  return (
    <>
      <form onSubmit={submitHandler} className="container mb-3">
        <div className="mb-3">
          <label htmlFor="customerUsername" className="form-label">
            Enter Customer Username
          </label>
          <input
            type="text"
            className="form-control"
            id="customerUsername"
            value={data.customerUsername}
            onChange={changeHandler}
            name="customerUsername"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Buy Now
        </button>
        <button
          onClick={cancelButtonHandler}
          type="button"
          className="btn btn-link text-danger"
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default CreateOrder;
