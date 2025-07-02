import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import './register.scss'

type FieldType = {
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};


const RegisterPage = () => {

    const [isSubmit, setIsSubmit] = useState(true)



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
                                name="username"
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
                                <Input.Password />
                            </Form.Item>

                            <Form.Item<FieldType> name="phone" valuePropName="checked" label={null}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

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