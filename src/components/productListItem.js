import { Card } from 'antd';

const ProductListItem = ({product, addToCart}) => {
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
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </Card>
    </>)
}

export default ProductListItem;

