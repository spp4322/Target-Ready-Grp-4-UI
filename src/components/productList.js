import React, { useEffect, useState } from "react";
import { myAxios } from "../services/helper";
import Form from "react-bootstrap/Form";
import Header from "./header";
import ProductListItem from "./productListItem";
import { useNavigate } from "react-router-dom";
import "../css/productList.css";

const ProductList = ({ products, addCartItem, cartList }) => {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    myAxios
      .get("/api/v1/target/allProducts")
      .then((response) => setProductList(response.data));
  }, []);

  const navigate = useNavigate();
  function addToCart(id, quantity) {
    const order = { id: id, quantity: quantity };
    const prod = productList.find((product) => product.productID === id);

    if (quantity > prod.stockLevel) {
      navigate("/quant-alert", { replace: true });
    }

    addCartItem(order);
  }

  const productJsx = productList
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.productName.toLowerCase().includes(search);
    })
    .map((p) => (
      <ProductListItem key={p.productID} product={p} addToCart={addToCart} />
    ));

  if (productList.length === 0) {
    return <>Loading Data...</>;
  } else {
    return (
      <>
        <Header />
        <div className="product-list-container">
          <Form className="search-form container">
            <Form.Control
              className="my-3 search-input"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
            />
          </Form>
          <div className="product-list grid-container">{productJsx}</div>
        </div>
      </>
    );
  }
};

export default ProductList;
