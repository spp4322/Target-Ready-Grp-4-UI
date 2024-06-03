import { useLocation } from "react-router-dom";

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

const CreateOrder = () => {
    //console.log(props.match.params.id);
    const { state } = useLocation();
    const { id } = state;
    console.log(id);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        values.productId = id;
        values.date = new Date();
        values.orderId = Math.random();
        values.quantity = parseInt(values.quantity);
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name="customerID"
                label="Customer ID"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Enter Quantity"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default CreateOrder;