import CartItem from "./cartItem";
import { useState } from 'react';

const Cart = ({ cartList, products }) => {
    //console.log(cartList);

    const [listOfCart, setListOfCart] = useState(cartList);

    const productsInCart = products.filter(product => listOfCart.includes(product.id));

    function deleteButtonHandler(id) {
        //console.log(id);
        console.log(listOfCart);
        const newCartList = listOfCart.filter(c => c !== id);
        console.log(newCartList);
        setListOfCart(newCartList);
    };

    const cartJsx = productsInCart.map((p) => <CartItem key={p.id} product={p} deleteButtonHandler={deleteButtonHandler} />);

    //console.log(cartJsx);

    return (<>
        <div className="container">
            <ul className='list-group'>{cartJsx}</ul></div>
        
    </>);
}

export default Cart;