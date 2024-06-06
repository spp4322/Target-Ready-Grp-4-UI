import { Card } from 'antd';

const CartItem = ({ product, deleteButtonHandler }) => {
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
            <p>Quantity: {product.quantity}</p>
            <button
                onClick={() => deleteButtonHandler(product.productID)}
                className='btn btn-link bi bi-trash text-danger'
            >Remove from Cart</button>
        </Card>
    </>
};

export default CartItem;