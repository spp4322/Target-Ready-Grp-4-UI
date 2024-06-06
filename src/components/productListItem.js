import { Card } from 'antd';
import { useState } from 'react';

const ProductListItem = ({ product, addToCart }) => {
    //console.log(product);

    const [data, setData] = useState({
        quantity: 0
    });

    const changeHandler = ({ target: { name, value } }) => {
        //console.log(value);

        setData({ ...data, [name]: (value) });
        //console.log(data.quantity);
    };

    const submitHandler = (evt) => {
        //console.log(data.quantity);
        evt.preventDefault(); // prevent submission of form to the server (action attribute)

        if (data.quantity.trim().length === 0) return;

        data.quantity = parseInt(data.quantity);

        const quantity = data.quantity;
        console.log(quantity);

        addToCart(product.productID, quantity);

        //console.log(data);

        setData({
            quantity: 0,
        });
    };

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
            <form onSubmit={submitHandler} className='mb-3'>
                <div className='mb-3'>
                    <label htmlFor='descriptionInput' className='form-label'>
                        Enter Quantity
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='descriptionInput'
                        value={data.quantity}
                        onChange={changeHandler}
                        name='quantity'
                    />
                </div>
                <button type='submit' className='btn btn-primary' >
                    Add To Cart
                </button>
            </form>
            {/* <button onClick={() => addToCart(product.productID)}>Add to Cart</button> */}
        </Card>
    </>)
}

export default ProductListItem;

