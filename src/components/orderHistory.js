import OrderItem from "./orderItem";

const OrderHistory = () => {
    const orders = [
        {
            orderId: 1,
            productId: 1,
            productName: 'Shampoo',
            productPrice: 448,
            quantity: 2,
            date: new Date()
        },
        {
            orderId: 2,
            productId: 3,
            productName: 'Perfume',
            productPrice: 880,
            quantity: 1,
            date: new Date()
        },
        {
            orderId: 3,
            productId: 1,
            productName: 'Shampoo',
            productPrice: 448,
            quantity: 3,
            date: new Date()
        }
    ];

    const orderItemJsx = orders.map((o) => (<OrderItem key={o.orderId} order={o} />));

    return (<>
        <ul className='list-group'>{orderItemJsx}</ul>
    </>)
}

export default OrderHistory;