import { createUsersAPI } from "@/services/api";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd/lib";
import { useState } from "react";


interface IProps {
    openModelCreate: boolean;
    setOpenModelCreate: (v: boolean) => void;
    refreshTable: () => void;
}


type FieldType = {
    fullName: string;
    password: string;
    email: string;
    phone: string
}
const CreateUser = (props: IProps) => {
    const { openModelCreate, setOpenModelCreate, refreshTable } = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const { message, notification } = App.useApp();

    // 
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, password, email, phone } = values;
        setIsSubmit(true);
        const res = await createUsersAPI(fullName, email, password, phone);
        if (res && res.data) {
            message.success("Tạo mới user thành công");
            form.resetFields();
            setOpenModelCreate(false);
            refreshTable();
        }
        else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openModelCreate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModelCreate(false);
                    form.resetFields();
                }}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"

                >
                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="fullName"
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
                        label="Phone"
                        name="phone" labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateUser;