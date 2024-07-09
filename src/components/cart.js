import React, { useEffect, useState } from "react";
import { myAxios } from "../services/helper";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import CartItem from "./cartItem";
import "../css/cart.css";

const Cart = ({ cartList }) => {
    const [products, setProducts] = useState([]);
    const [listOfCart, setListOfCart] = useState(cartList);

    useEffect(() => {
        myAxios.get('/api/v1/target/allProducts').then((response) => setProducts(response.data));
    }, []);

    const productsInCart = products.filter(product =>
        listOfCart.some(cartItem => cartItem.id === product.productID)
    );

    const newList = productsInCart.map(product => {
        const cartItem = listOfCart.find(item => item.id === product.productID);
        return {
            ...product,
            quantity: cartItem ? cartItem.quantity : 0
        };
    });

    function deleteButtonHandler(id) {
        const newCartList = listOfCart.filter(c => c.id !== id);
        setListOfCart(newCartList);
    };

    const navigate = useNavigate();
    function submitHandler() {
        navigate('/create-order', { state: { orderList: newList }, replace: false });
    }

    const cartJsx = newList.map((p) => (
        <CartItem key={p.productID} product={p} deleteButtonHandler={deleteButtonHandler} />
    ));

    return (
        <>
            <Header />
            <div className="cart-container">
                <button className="buy-button" onClick={submitHandler}>
                    Buy {listOfCart.length} items
                </button>
                <ul className='cart-list'>{cartJsx}</ul>
            </div>
        </>
    );
}

export default Cart;
