import { Card } from 'antd';

const OrderItem = ({order, products}) => {
    //const amount = order.productPrice * order.quantity;
    //console.log(productList);

    const productList = products.filter((p) => order.productId.includes(p.id));
    //console.log(productList);

    //const amount = product[0].productPrice * order.quantity;
    const amount = productList.reduce((accumulator, currentValue) => accumulator + currentValue.productPrice, 0);
    //console.log(amount);

    return (<>
        {/* <Card
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
        </Card> */}
        OrderHistory
    </>)
}

export default OrderItem;