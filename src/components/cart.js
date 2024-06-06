import CartItem from "./cartItem";

const Cart = ({ cartList, products }) => {
    //console.log(cartList);

    const productsInCart = products.filter(product => cartList.includes(product.id));

    const cartJsx = productsInCart.map((p) => <CartItem key={p.id} product={p} />);

    //console.log(cartJsx);

    return (<>
        <div className="container"><ul className='list-group'>{cartJsx}</ul></div>
        
    </>);
}

export default Cart;