import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined, PicCenterOutlined } from '@ant-design/icons';

import styles from './Login.module.css';

import logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../actions/auth';
// import { saveState } from '../../localStorage';
import { useStore } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useStore();

    const user = useSelector(state => state.auth);
    console.log("user", user);
    console.log("user storage", window.localStorage.getItem('userData'));

    const [userData, setUserData] = useState("");
    const [check, setCheck] = useState(null);
    const [visibleForgotPassModal, setVisibleForgotPassModal] = useState(false);
    const [inputForgot, setInputForgot] = useState();

    // store.subscribe(() => {
    //     saveState(store.getState.auth);
    //   });

    const onFinish = async (values) => {
        console.log('form login: ', values);
        try {
            const response = await axios.post('http://localhost:3001/login', { ...values });
            console.log("res", response);

            if (response.status == 200) {
                setUserData(response.data);
                await window.localStorage.setItem('userData', JSON.stringify(response.data));
                setTimeout(() => window.localStorage.removeItem('userData'), 1200000);
                await dispatch(loginSuccess(response.data));
                notification.success({
                    message: 'Login Success',
                });
                history.push("/");
                window.location.reload();
            };

        } catch (error) {
            console.error("err", error.response.data);
            notification.error({
                message: 'Login error',
                description: error.response.data.message,
            });
        }
    }

    const handleForgotPass = async () => {
        console.log("true");
        setVisibleForgotPassModal(true);
    }

    const sendRequest = async () => {
        console.log("sent", inputForgot);
        // !inputForgot ? notification.error("Vui lòng nhập username hoặc email!") : "";
        // try {
        //     const res = axios.post("http://localhost:3001/forgetpassword", )
        // } catch (err) {
        //     console.log(err);
        // }
    }

    const handleInputForgotPass = (e) => {
        setInputForgot(e.target.value);
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
                                <span
                                    style={{
                                        float: 'right',
                                        color: "#faad14",
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleForgotPass}
                                >Bạn quên mật khẩu?</span>
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
            <Modal
                visible={visibleForgotPassModal}
                onCancel={() => setVisibleForgotPassModal(false)}
                footer={null}
                title={<div
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        color: '#faad14',
                        marginTop: '20px'
                    }}
                >QUÊN MẬT KHẨU</div>}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>Yêu cầu lấy lại mật khẩu:</div>
                <Input
                    placeholder="Nhập username hoặc email"
                    size="large"
                    onChange={handleInputForgotPass}
                />
                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <Button
                        className="login-form-button"
                        className={styles.button}
                        onClick={sendRequest}
                    >
                        GỬI
                    </Button>
                </div>
            </Modal>
        </div>
    )
};

export default Login;