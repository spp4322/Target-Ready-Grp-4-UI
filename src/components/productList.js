import { useEffect, useState } from "react";
import { myAxios } from "../services/helper";
import Header from "./header";
import ProductListItem from "./productListItem";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, addCartItem, cartList }) => {

    // const response = myAxios.get('/api/v1/target/allProducts').then((response) => response.data);
    // console.log(response);

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        myAxios.get('/api/v1/target/allProducts').then((response) => setProductList(response.data));

    }, []);

    console.log(productList);

    const listOfProduct = products;

    const navigate = useNavigate()
    function addToCart(id, quantity) {
        //console.log(id);
        //navigate('/create-order', {state: {id: id}, replace: false});

        console.log(quantity);

        const order = {id: id, quantity: quantity};
        const prod = productList.map((p) => p.productId === id);

        if(quantity > prod.stockLevel) {
            return ;
        }

        addCartItem(order);
        console.log(cartList);
    }

    const productJsx = productList.map((p) => (<ProductListItem key={p.productId} product={p} addToCart={addToCart} />));

    if (productList.length === 0) {
        return (<>
            Loading Data
        </>);
    }

    else {
        return (<>
            <div >
                <Header className='col-md-12' />
                <ul className='list-group col-md-12 container'>{productJsx}</ul></div>
        </>
        );
    }
}

export default ProductList;