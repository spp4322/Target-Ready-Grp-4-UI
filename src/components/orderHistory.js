import OrderItem from "./orderItem";

const OrderHistory = ({orders, products}) => {
    const orderList = orders;

    //const productList = orders.map((obj) => products.map((p) => p.id === obj.productId && p));

    const orderItemJsx = orderList.map((o) => (<OrderItem key={o.orderId} order={o} products={products} />));

    return (<>
        <ul className='list-group'>{orderItemJsx}</ul>
    </>)
}

export default OrderHistory;