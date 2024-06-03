import { Card } from 'antd';

const ProductListItem = ({product, placeOrder}) => {
    //console.log(product);
    return (<>
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
            <button onClick={() => placeOrder(product.id)}>Buy Now</button>
        </Card>
    </>)
}

export default ProductListItem;

