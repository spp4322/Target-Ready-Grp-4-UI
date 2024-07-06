import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { myAxios } from "../services/helper";
import "../css/createOrder.css"; // Assuming you have a CSS file for custom styles

const CreateOrder = ({ emptyCart }) => {
  const { state } = useLocation();
  const { orderList } = state;

  const newList = orderList.map((order) => ({
    productID: order.productID,
    productQuantity: order.quantity,
  }));

  const customerUsername = localStorage.getItem("username");

  const [data, setData] = useState({
    customerUsername: customerUsername,
    productList: newList,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      customerUsername: customerUsername,
    }));
  }, [customerUsername]);

  const navigate = useNavigate();

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (data.customerUsername.trim().length === 0) return;

    myAxios
      .post("/api/v1/target/order", data)
      .then((response) => {
        emptyCart();
        navigate("/home", { replace: true });
        setData({
          customerUsername: customerUsername,
          productList: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelButtonHandler = () => {
    setData({
      customerUsername: customerUsername,
      productList: newList,
    });
  };

  return (
    <form onSubmit={submitHandler} className="container mb-3 form-red-theme">
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-danger me-2">
          Buy Now
        </button>
        <button
          onClick={cancelButtonHandler}
          type="button"
          className="btn btn-link text-danger"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
