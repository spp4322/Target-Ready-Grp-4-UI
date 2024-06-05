import { Card } from 'antd';

const OrderItem = ({order, products}) => {
    //const amount = order.productPrice * order.quantity;
    //console.log(productList);

    const product = products.filter((p) => {if(p.id === order.orderId) {return p}});
    console.log(product);

    const amount = product[0].productPrice * order.quantity;

    return (<>
        <Card
            className='container'
            title={product[0].productName}
            bordered={false}
            style={{
                width: 300,
                margin: 30,
            }}
        >
            <p>Total Amount: {amount}</p>
            <p>Date of Transaction: {order.date.toString()}</p>
        </Card>
    </>)
}

export default OrderItem;