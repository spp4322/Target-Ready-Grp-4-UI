import { Card } from 'antd';

const CartItem = ({ product }) => {
    return <>
        <Card
            className='container'
            title={product.productName}
            bordered={false}
            style={{
                width: 300,
                margin: 30,
            }}
        >
            <p>Amount: {product.productPrice}</p>
        </Card>
    </>
};

export default CartItem;