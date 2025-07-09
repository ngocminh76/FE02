import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Divider, Form, Input, App } from 'antd';
import './register.scss'
import { loginAPI, registerAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    email: string;
    fullName: string;
    password: string;
    phone: string;
};



const RegisterPage = () => {

    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp();
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { email, fullName, password, phone } = values
        const res = await registerAPI(fullName, email, password, phone);
        console.log(res.statusCode)
        if (res.data) {
            message.success("Đăng kí user thành công");
            navigate("/login")
        } else {
            message.error(res.message)
        }
        setIsSubmit(false)
    };
    console.log("Check<<>>", import.meta.env.VITE_BACKEND_URL)

    return (
        <div>

            <main className='main'>
                <div className='container'>
                    <section className='wrapper'>
                        <div className='heading'>
                            <h2 className='text text-large'> Đăng kí tài khoản</h2>
                            <Divider />
                        </div>

                        <Form
                            name="form-register"
                            onFinish={onFinish}
                            autoComplete="off"

                        >
                            <Form.Item<FieldType>
                                labelCol={{ span: 24 }}
                                label="Họ tên"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                labelCol={{ span: 24 }}
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: "Email không đúng định dạng !" }
                                ]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item<FieldType>
                                label="Password"
                                name="password" labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Phone"
                                name="phone" labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* <Form.Item<FieldType> name="phone" valuePropName="checked" label={null}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}

                            <Form.Item >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Submit
                                </Button>
                            </Form.Item>

                            <Divider>Or</Divider>
                            <p className='text text-normal' style={{ textAlign: "center" }}>
                                Chưa có tài khoản ? <a href="/login">Đăng nhập</a>
                            </p>
                        </Form>

                    </section>
                </div>

            </main>

        </div>
    )
}

export default RegisterPage