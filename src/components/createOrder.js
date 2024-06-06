import { useLocation } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { myAxios } from "../services/helper";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Select, Space } from 'antd';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const CreateOrder = ({ emptyCart }) => {
    const { state } = useLocation();
    const { orderList } = state;

    //console.log(orderList);

    const newList = orderList.map(order => ({
        productID: order.productID,
        productQuantity: order.quantity
    }));

    const [data, setData] = useState({
        CustomerID: 0,
        ProductList: newList,
    });

    const changeHandler = ({ target: { name, value } }) => {
        //console.log(value);

        setData({ ...data, [name]: (value) });


    };

    const cancelButtonHandler = () => {
        setData({
            CustomerID: 0,
        });
    };

    const navigate = useNavigate();
    const submitHandler = (evt) => {
        evt.preventDefault(); // prevent submission of form to the server (action attribute)


        if (data.CustomerID.trim().length === 0) return;

        data.CustomerID = parseInt(data.CustomerID);

        myAxios.post('/api/v1/target/order', data).then((response) => console.log(response.data)).catch((error) => {
            console.log(error);
        });;

        emptyCart();
        navigate('/', {replace: true});

        //addOrder(data);

        //console.log(data);

        setData({
            CustomerID: 0,
        });
    };

    return <>
        <form onSubmit={submitHandler} className='container mb-3'>
            <div className='mb-3'>
                <label htmlFor='descriptionInput' className='form-label'>
                    Enter Customer ID
                </label>
                <input
                    type='number'
                    className='form-control'
                    id='descriptionInput'
                    value={data.CustomerID}
                    onChange={changeHandler}
                    name='CustomerID'
                />
            </div>
            <button type='submit' className='btn btn-primary' >
                Buy Now
            </button>
            <button
                onClick={cancelButtonHandler}
                type='button'
                className='btn btn-link text-danger'
            >
                Cancel
            </button>
        </form>
    </>
};

export default CreateOrder;