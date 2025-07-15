import { updateUserAPI } from "@/services/api";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd/lib";
import { useEffect, useState } from "react";


interface IProps {
    openModelUpdate: boolean;
    setOpenModelUpdate: (v: boolean) => void;
    refreshTable: () => void;
    setDataUpdate: (v: IUserTable | null) => void;
    dataUpdate: IUserTable | null
}

type FieldType = {
    _id: string;
    email: string;
    fullName: string;
    phone: string;
}


const UpdateUser = (props: IProps) => {
    const { openModelUpdate, setOpenModelUpdate, dataUpdate, refreshTable, setDataUpdate } = props
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { message, notification } = App.useApp();
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                _id: dataUpdate._id,
                fullName: dataUpdate.fullName,
                email: dataUpdate.email,
                phone: dataUpdate.phone
            })
        }
    }, [dataUpdate])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { _id, email, fullName, phone } = values
        setIsSubmit(true);
        const res = await updateUserAPI(_id, fullName, phone);
        if (res && res.data) {
            message.success('Cập nhập user thành công');
            form.resetFields();
            setOpenModelUpdate(false);
            setDataUpdate(null);
            refreshTable();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false);
    }

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openModelUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModelUpdate(false);
                    setDataUpdate(null);
                    form.resetFields();
                }}
                okText={"Cập nhập"}
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
                        hidden
                        labelCol={{ span: 24 }}
                        label="_id"
                        name="_id"
                        rules={[{ required: true, message: 'Vui lòng nhập _id' }]}
                    >
                        <Input disabled />
                    </Form.Item>


                    <Form.Item<FieldType>
                        label="Email"
                        name="email" labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Tên hiển thị"
                        name="fullName"
                        labelCol={{ span: 24 }}
                        rules={[
                            { required: true, message: 'Please input your phone!' },
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

export default UpdateUser;