import CartItem from "./cartItem";
import { myAxios } from "../services/helper";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Cart = ({ cartList }) => {
    //console.log(cartList);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        myAxios.get('/api/v1/target/allProducts').then((response) => setProducts(response.data));

    }, []);

    const [listOfCart, setListOfCart] = useState(cartList);

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
        //console.log(id);
        console.log(listOfCart);
        const newCartList = listOfCart.filter(c => c.id !== id);
        console.log(newCartList);
        setListOfCart(newCartList);
    };

    const navigate = useNavigate()
    function submitHandler() {
        console.log("submit called");
        navigate('/create-order', { state: { orderList: listOfCart }, replace: false });
    }

    const cartJsx = newList.map((p) => <CartItem key={p.productID} product={p} deleteButtonHandler={deleteButtonHandler} />);

    //console.log(cartJsx);

    return (<>
        <div className="container">
            <button className="mt-3" onClick={() => submitHandler()}>Buy {listOfCart.length} items</button>
            <ul className='list-group'>{cartJsx}</ul>
        </div>

    </>);
}

export default Cart;