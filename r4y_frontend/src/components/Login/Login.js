import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './Login.module.css';

import logo from '../../img/logo.png';

const mockData = [
    {
        "key": 1,
        "username": "user1",
        "password": "123456",
    },
    {
        "key": 1,
        "username": "user2",
        "password": "123456",
    }, {
        "key": 1,
        "username": "user3",
        "password": "123456",
    }
]

const Login = () => {
    const [userData, setUserData] = useState("");
    const [check, setCheck] = useState(null);

    const onFinish = async (values) => {
        console.log('form login: ', values);
        try {
            const response = await axios.post('http://localhost:3001/login', { ...values });
            console.log("res", response);
            setUserData(response.data);
        } catch (error) {
            console.error("err", error.response.data);
        }
    }
    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.topTitle}>Đăng nhập</div>
                    <img src={logo} alt="log-room-for-you" width={120} />
                </div>
                <div className={styles.form}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                                <span style={{ float: 'right' }}><Link to="/">Bạn quên mật khẩu?</Link></span>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button htmlType="submit" className="login-form-button" className={styles.button}>
                                Đăng nhập
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.another}>

                </div>
                <div style={{ textAlign: 'center' }}>
                    Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;