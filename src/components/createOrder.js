import { useLocation } from "react-router-dom";
import React from "react";
import { useState } from "react";

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

// const CreateOrder = () => {
//     //console.log(props.match.params.id);
//     const { state } = useLocation();
//     const { id } = state;
//     //const { addOrder } = addOrder;
//     console.log(id);
//     const [form] = Form.useForm();
//     const onFinish = (values) => {
//         values.productId = id;
//         values.date = new Date();
//         values.orderId = Math.random();
//         values.quantity = parseInt(values.quantity);
//         values.customerId = parseInt(values.customerId);
//         //console.log(values);
//         //addOrder();
//     };
//     const onReset = () => {
//         form.resetFields();
//     };
//     return (
//         <Form
//             {...layout}
//             form={form}
//             name="control-hooks"
//             onFinish={onFinish}
//             style={{
//                 maxWidth: 600,
//             }}
//         >
//             <Form.Item
//                 name="customerId"
//                 label="Customer ID"
//                 rules={[
//                     {
//                         required: true,
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 name="quantity"
//                 label="Enter Quantity"
//                 rules={[
//                     {
//                         required: true,
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item {...tailLayout}>
//                 <Space>
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                     </Button>
//                     <Button htmlType="button" onClick={onReset}>
//                         Reset
//                     </Button>
//                 </Space>
//             </Form.Item>
//         </Form>
//     );
// }

const CreateOrder = ({ addOrder }) => {
    const { state } = useLocation();
    const { id } = state;

    const [data, setData] = useState({
        customerId: 0,
        quantity: 0,
        productId: id,
        date: new Date(),
        orderId: Math.random,
    });

    const changeHandler = ({ target: { name, value } }) => {
        //console.log(value);

        setData({ ...data, [name]: (value) });


    };

    const cancelButtonHandler = () => {
        setData({
            customerId: 0,
            quantity: 0,
        });
    };

    const submitHandler = (evt) => {
        evt.preventDefault(); // prevent submission of form to the server (action attribute)

        if (data.customerId.trim().length === 0) return;

        data.customerId = parseInt(data.customerId);
        data.quantity = parseInt(data.quantity);

        addOrder(data);

        //console.log(data);

        setData({
            customerId: 0,
            quantity: 0,
        });
    };

    return (
        <>
            <h3>Expense details</h3>

            <form onSubmit={submitHandler} className='mb-3'>
                <div className='mb-3'>
                    <label htmlFor='descriptionInput' className='form-label'>
                        Enter Customer ID
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='descriptionInput'
                        value={data.customerId}
                        onChange={changeHandler}
                        name='customerId'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='amountInput' className='form-label'>
                        Quantity
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='quantity'
                        value={data.quantity}
                        onChange={changeHandler}
                        name='quantity'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
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
    );
}

export default CreateOrder;