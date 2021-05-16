import React, { useState } from 'react';
import axios from "axios";

import {
    Avatar,
    Button,
    Modal,
    message,
    Form,
    Input,
    Select,
    notification,
    Upload,
    Rate,
} from 'antd';

import {
    SendOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    FormOutlined,
    FieldTimeOutlined,
    HeartOutlined,
    EditOutlined,
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import styles from './tab.module.css';

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Tab1 = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log("edit", values);
        setIsModalVisible(false);
        message.success('Đã lưu!');
    }

    const onFinishFailed = (errInfo) => {
        console.log("edit err", errInfo);
    }

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Thông tin cá nhân</div>
                <Button className={styles.button} icon={<EditOutlined />} onClick={showModal}>Sửa thông tin</Button>
            </div>
            <Modal
                title={<div
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        color: '#faad14',
                    }}
                >CHỈNH SỬA THÔNG TIN CÁ NHÂN</div>}
                width={700}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Đăng"
                cancelText="Hủy"
                footer={null}
            >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
                >
                    {/* <div style={{ marginBottom: '6px' }}>Tên người dùng: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="Tên người dùng"
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
                        <Input value="Hoàng Thế Anh" />
                    </Form.Item>

                    {/* <div style={{ marginBottom: '6px' }}>Tên đăng nhập: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="Tên đăng nhập"
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
                        <Input value="abc20202" />
                    </Form.Item>

                    {/* <div style={{ marginBottom: '6px' }}>Email: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="email"
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
                        <Input value="abc@gmail/com" />
                    </Form.Item>

                    {/* <div style={{ marginBottom: '6px' }}>SĐT: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="SĐT"
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
                        <Input style={{ width: '100%' }} value="0961274321" />
                    </Form.Item>

                    {/* <div style={{ marginBottom: '6px' }}>Thay đổi mật khẩu: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="Thay đổi mật khẩu"
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

                    {/* <div style={{ marginBottom: '6px' }}>Xác nhận lại mật khẩu: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="Xác nhận mật khẩu"
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

                    {/* <div>Địa chỉ: <span style={{ color: '#f5222d' }}>*</span></div> */}
                    <Form.Item
                        label="Địa chỉ"
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
                        <Input value="Số 1, đường Đại Cồ Việt, Hai Bà Trưng, Hà Nội " />
                    </Form.Item>



                    <span style={{ marginRight: '40px' }}> <span style={{ color: '#f5222d' }}>*</span>Chọn ảnh đại diện:</span>
                    <Upload
                        style={{ marginTop: '10px' }}
                        beforeUpload={(file) => {
                            console.log(file);
                            if (!file.type.includes('image/')) {
                                notification.error({
                                    message: `${file.name} is not a image file`,
                                });
                            }
                            return file.type.includes('image/');
                        }}
                        onChange={async (info) => {
                            if (info.file.status === 'uploading') {
                                console.log(info.file.status);
                                setUploading(true);
                            } else {
                                console.log(info.file.status);
                                setUploading(false);
                            }
                            if (info.file.status === 'done') {
                                console.log(info.fileList);
                                // setFileList(info.fileList);
                            } else if (info.file.status === 'error') {
                                console.log(info.file);
                                notification.error({
                                    message: info.file.error?.response?.data?.error?.message
                                        ? info.file.error.response.data.error.message
                                        : 'An error occurred',
                                });
                            }
                        }}
                        accept="image/*"
                        multiple={true}
                        showUploadList={false}
                        customRequest={async ({ onSuccess, onError, file }) => {
                            const form = new FormData();
                            form.append('image', file);
                            try {
                                const res = await axios.post(
                                    "http://localhost:3001/upload",
                                    form,
                                );
                                if (res.data.status === 200) {
                                    file.url = res.data.data.url;
                                    onSuccess(null, file);
                                } else {
                                    onError(res.data.error.message);
                                }
                            } catch (error) {
                                onError(error);
                            }
                        }}
                    >
                        <div className={styles.upload}>
                            {uploading ? (
                                loadingIcon
                            ) : (
                                <>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>
                                        Upload
                                    </div>
                                </>
                            )}
                        </div>
                    </Upload>

                    <Form.Item style={{ marginTop: '30px', textAlign: 'right' }}>
                        <Button className={styles.buttonOutline}
                            onClick={handleCancel}
                            style={{
                                width: '20%',
                                marginRight: '20px',
                                border: '1px solid #141414',
                                color: '#141414',
                                height: '48px',
                                padding: '6px 30px',
                                fontWeight: '500',
                                fontSize: '16px',
                                borderRadius: '8px',
                            }}>
                            HỦY
                        </Button>
                        <Button type="primary" htmlType="submit" className={styles.button}
                            style={{
                                width: '20%',
                                marginRight: '20px',
                                border: '1px solid #faad14',
                                height: '48px',
                                padding: '6px 30px',
                                fontWeight: '500',
                                fontSize: '16px',
                                borderRadius: '8px',
                                background: '#faad14',
                                color: 'white',
                            }}
                        >
                            LƯU
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <div className={styles.item}>
                        <Avatar />
                        <div className={styles.value}>Tên đăng nhập</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><SendOutlined style={{ marginRight: '5px' }} />Tên người dùng:</div>
                        <div className={styles.itemValue}>Nguyễn Văn A</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><SendOutlined style={{ marginRight: '5px' }} />Tên đăng nhập:</div>
                        <div className={styles.itemValue}>nguyenabc123</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><EnvironmentOutlined style={{ marginRight: '5px' }} />Địa chỉ:</div>
                        <div className={styles.itemValue}>BĐS 68 trần hưng đạo</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><PhoneOutlined style={{ marginRight: '5px' }} />Số điện thoại:</div>
                        <div className={styles.itemValue}>0987654321</div>
                    </div>
                </div>
                <div className={styles.rightContent}>
                    <br /><br />
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><MailOutlined style={{ marginRight: '5px' }} />Email:</div>
                        <div className={styles.itemValue}>abc@gmail.com</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />Số tin đã lưu:</div>
                        <div className={styles.itemValue}>5</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><FieldTimeOutlined style={{ marginRight: '5px' }} />Ngày tham gia:</div>
                        <div className={styles.itemValue}>31/03/2021</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><HeartOutlined style={{ marginRight: '5px' }} />Đánh giá:</div>
                        <div className={styles.itemValue}>
                            <div className={styles.itemRating}>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={4}
                                    style={{ fontSize: '14px', color: '#faad14' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tab1;