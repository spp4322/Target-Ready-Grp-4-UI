import { Card } from 'antd';

const OrderItem = ({order}) => {
    const amount = order.productPrice * order.quantity;

    return (<>
        <Card
            className='container'
            title={order.productName}
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