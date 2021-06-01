import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { Form, Input, Button, Checkbox, notification, message } from 'antd';
import { UserOutlined, LockOutlined, PicCenterOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

import styles from './Login.module.css';

import logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../actions/auth';
// import { saveState } from '../../localStorage';
import { useStore } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import Loading from '../loading';

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
    const [sendOtp, setSendOtp] = useState(); // chứa mã OTP và tokenOTP server res
    const [otpInput, setOtpInput] = useState(); // mã OTP người dùng nhập
    const [visibleModalOTP, setVisibleModalOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visibleModalNewPass, setVisibleModalNewPass] = useState(false);
    const [newPass, setNewPass] = useState();

    // store.subscribe(() => {
    //     saveState(store.getState.auth);
    //   });

    const onFinish = async (values) => {
        console.log('form login: ', values);
        try {
            const response = await axios.post('http://localhost:3001/login', { ...values });
            console.log("res admin", response);

            if (response.status == 200) {
                setUserData(response.data);
                await window.localStorage.setItem('userData', JSON.stringify(response.data));
                setTimeout(() => window.localStorage.removeItem('userData'), 1200000);
                await dispatch(loginSuccess(response.data));
                notification.success({
                    message: 'Login Success',
                });
                let userType = await response.data.userData.usertype;
                if (userType == 2) {
                    history.push("/admin");
                } else {
                    history.push("/");
                }
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
        setVisibleForgotPassModal(true);
    }

    const sendRequest = async () => {
        setLoading(true);
        console.log("sent", inputForgot);
        if (!inputForgot) {
            notification.error("Vui lòng nhập username hoặc email!");
        } else {
            try {
                const res = await axios.post("http://localhost:3001/sendotp", {
                    username: inputForgot,
                    email: inputForgot,
                });
                if (res.status == 200) {
                    console.log("forgot", res.data);
                    let data = res.data;
                    setSendOtp(data);
                    setLoading(false);
                    setVisibleModalOTP(true);
                }

            } catch (err) {
                console.log(err.response.data.message);
                message.error(err.response.data.message);
                setLoading(false);
            }
        }
    }

    const handleInputForgotPass = (e) => {
        setInputForgot(e.target.value);
    }

    const checkOTP = async () => {
        if (otpInput == sendOtp.otp) {
            try {
                const res = await axios.post("http://localhost:3001/checkotp", { otpToken: sendOtp.otpToken });
                if (res.status == 200) {
                    console.log("check OTP", res);
                    if (res.data.status == 1) {
                        setVisibleModalOTP(false);
                        setVisibleForgotPassModal(false);
                        setVisibleModalNewPass(true);
                    } else {
                        message.error("ERROR!");
                    }
                }
            } catch (err) {
                console.log(err);
                message.error("ERROR!");
            }
        } else {
            message.error("Mã OTP không chính xác!");
        }
    }

    const sendNewPass = async () => {
        try {
            const res = await axios.post("http://localhost:3001/forgetpassword", {
                otpToken: sendOtp.otpToken,
                newPassword: newPass,
            })
            if (res.status == 200) {
                message.success("Success!");
                setVisibleModalNewPass(false);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            message.error("ERROR!");
        }
    }

    return (
        loading ? <Loading />
            : <div className={styles.login}>
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
                    <Modal
                        visible={visibleModalOTP}
                        onCancel={() => setVisibleModalOTP(false)}
                        footer={null}
                    >
                        <div style={{ marginBottom: '20px' }}>Nhập mã OTP được gửi trong email của bạn :
                            <div style={{ fontSize: '12px' }}>(Mã OTP có hiệu lực trong 180s)</div>
                        </div>
                        <Input
                            placeholder="Mã OTP"
                            size="large"
                            width="30%"
                            onChange={(e) => setOtpInput(e.target.value)}
                        />
                        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                            <Button
                                className="login-form-button"
                                className={styles.button}
                                onClick={checkOTP}
                            >
                                GỬI
                            </Button>
                        </div>
                    </Modal>

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

                <Modal
                    visible={visibleModalNewPass}
                    onCancel={() => setVisibleModalNewPass(false)}
                    footer={null}
                    title={<div
                        style={{
                            fontSize: '20px',
                            textAlign: 'center',
                            color: '#faad14',
                            marginTop: '20px'
                        }}
                    >NHẬP MẬT KHẨU MỚI</div>}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu mới"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                        <Button
                            className="login-form-button"
                            className={styles.button}
                            onClick={sendNewPass}
                        >
                            GỬI
                    </Button>
                    </div>
                </Modal>
            </div>
    )
};

export default Login;