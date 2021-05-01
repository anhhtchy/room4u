import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
    Form,
    Input,
    Checkbox,
    Button,
    Radio,
    Upload,
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import styles from '../Login/Login.module.css';

import logo from '../../img/logo.png';

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const res = await axios.post('http://localhost:3001/register', {...values});
            console.log("success");
            console.log("res", res);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.topTitle}>Đăng ký</div>
                    <img src={logo} alt="logo-room-for-you" width={120} />
                </div>
                <div className={styles.form}>
                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                    >
                        <div style={{ marginBottom: '6px' }}>Tên người dùng: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên người dùng!',
                                },
                                {
                                    type: 'string',
                                    message: 'Tên người dùng chỉ chứa kí tự chữ!',
                                },
                                {
                                    max: 30,
                                    message: 'Tên người dùng không dài quá 30 kí tự',
                                }
                            ]}
                        >
                            <Input placeholder="Hoàng Thế Anh" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>Tên đăng nhập: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên đăng nhập!',
                                },
                                {
                                    max: 20,
                                    message: 'Tên đăng nhập không dài quá 20 kí tự',
                                }
                            ]}
                        >
                            <Input placeholder="abc20202" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>Email: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email của bạn!',
                                },
                            ]}
                        >
                            <Input placeholder="abc@gmail/com" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>Vai trò: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="roles"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò người dùng!' }]}
                        >
                            <Radio.Group>
                                <Radio value="0">Người cho thuê trọ</Radio>
                                <Radio value="1">Người thuê trọ</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>SĐT: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại của bạn!',
                                },
                                {
                                    pattern: '([0-9])',
                                    message: 'Vui lòng nhập số!'
                                },
                                {
                                    max: 10,
                                    message: 'SĐT không dài quá 10 kí tự!',
                                }
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="0961274312" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>Mật khẩu: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu của bạn!',
                                },
                                {
                                    min: 6,
                                    message: 'Độ dài mật khẩu tối thiểu là 6 kí tự',
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>Xác nhận lại mật khẩu: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div>Địa chỉ: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ của bạn!',
                                },
                                {
                                    max: 200,
                                    message: 'Địa chỉ không dài quá 200 kí tự',
                                }
                            ]}
                        >
                            <Input placeholder="Số 1, đường Đại Cồ Việt, Hai Bà Trưng, Hà Nội " />
                        </Form.Item>

                        <div>Chọn ảnh đại diện: </div>
                        <Form.Item
                            name="upload"
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản của chúng tôi!')),
                                },
                            ]}
                        >
                            <Checkbox>
                                Tôi đã đọc và đồng ý với các <a href="">điều khoản</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button
                                htmlType="submit"
                                className={styles.button}
                            >
                                {/* <Link to="/login">Đăng ký</Link> */}
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.another}>

                </div>
            </div>
        </div>
    )
};

export default Register;