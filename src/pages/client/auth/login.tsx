import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Divider, Form, Input, App } from 'antd';
import './register.scss'
import { loginAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useCurrentApp } from '@/components/context/app.context';

type FieldType = {
    userName: string;
    password: string;
};


const LoginPage = () => {

    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();
    const { setUser, setIsAuthenticated } = useCurrentApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { userName, password } = values
        const res = await loginAPI(userName, password);

        if (res.data) {
            setIsAuthenticated(true);
            setUser(res.data.user);
            localStorage.setItem('access_token', res.data.access_token)
            message.success("Đăng nhập thành công");
            navigate("/")
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
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
                            <h2 className='text text-large'> Đăng nhập</h2>
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
                                name="userName"
                                rules={[{ required: true, message: 'Please input your username!' }]}
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


                            <Form.Item >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Submit
                                </Button>
                            </Form.Item>

                            <Divider>Or</Divider>
                            <p className='text text-normal' style={{ textAlign: "center" }}>
                                Chưa có tài khoản ? <a href="/register">Đăng kí</a>
                            </p>
                        </Form>

                    </section>
                </div>

            </main>

        </div>
    )
}

export default LoginPage