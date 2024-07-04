import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { myAxios } from "../services/helper";

const CreateOrder = ({ emptyCart }) => {
  const { state } = useLocation();
  const { orderList } = state;

  const newList = orderList.map((order) => ({
    productID: order.productID,
    productQuantity: order.quantity,
  }));

  const customerUsername = useSelector((state) => state.username);

  const [data, setData] = useState({
    customerUsername: customerUsername,
    productList: newList,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      customerUsername: customerUsername,
    }));
  }, [customerUsername, newList]);

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

  const cancelButtonHandler = () => {
    setData({
      customerUsername: customerUsername,
      productList: newList,
    });
  };

  return (
    <form onSubmit={submitHandler} className="container mb-3">
      <div className="mb-3">
        <label htmlFor="customerUsername" className="form-label">
          Customer Username
        </label>
        <input
          type="text"
          className="form-control"
          id="customerUsername"
          value={data.customerUsername}
          readOnly
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
