import React, { Link, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { myAxios } from "../services/helper";

const CreateOrder = ({ emptyCart }) => {
  const { state } = useLocation();
  const { orderList } = state;

  const newList = orderList.map((order) => ({
    productID: order.productID,
    productQuantity: order.quantity,
  }));

  const [data, setData] = useState({
    customerUsername: "",
    productList: newList,
  });

  const changeHandler = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const cancelButtonHandler = () => {
    setData({
      customerUsername: "",
      productList: newList,
    });
  };

  const navigate = useNavigate();
  const submitHandler = (evt) => {
    evt.preventDefault();

    if (data.customerUsername.trim().length === 0) return;

    console.log(data);

    myAxios
      .post("/api/v1/target/order", data)
      .then((response) => {
        console.log(response.data);
        emptyCart();
        navigate("/home", { replace: true });
        setData({
          customerUsername: "",
          productList: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
  );
};

export default CreateOrder;
