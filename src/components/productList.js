import { useEffect, useState } from "react";
import { myAxios } from "../services/helper";
import Form from "react-bootstrap/Form";
import Header from "./header";
import ProductListItem from "./productListItem";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, addCartItem, cartList }) => {
  // const response = myAxios.get('/api/v1/target/allProducts').then((response) => response.data);
  // console.log(response);

  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    myAxios
      .get("/api/v1/target/allProducts")
      .then((response) => setProductList(response.data));
  }, []);

  //console.log(productList);

  const listOfProduct = products;

  const navigate = useNavigate();
  function addToCart(id, quantity) {
    //console.log(id);

    const order = { id: id, quantity: quantity };
    //const prod = productList.map((p) => p.productID === id);
    const prod = productList.find((product) => product.productID === id);

    //console.log(prod);

    if (quantity > prod.stockLevel) {
      navigate("/quant-alert", { replace: true });
    }
    //console.log(prod.stockLevel);

    addCartItem(order);
    //console.log(cartList);
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
    return <>Loading Data</>;
  } else {
    return (
      <>
        <div>
          <Header className="col-md-12" />
          <Form className="container">
            {/* <InputGroup className='my-3'>
                        <Form.Control placeholder='Search Contacts' />
                    </InputGroup> */}
            <Form.Control
              className="my-3"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
            />
          </Form>
          <ul className="list-group col-md-12 container">{productJsx}</ul>
        </div>
      </>
    );
  }
};

export default ProductList;
