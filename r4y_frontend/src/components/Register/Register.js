import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import {
    Form,
    Input,
    Checkbox,
    Button,
    Radio,
    Upload,
    notification,
    Modal,
} from 'antd';

import {
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import styles from '../Login/Login.module.css';

import logo from '../../img/logo.png';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Register = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [visibleImg, setVisibleImg] = useState(false);
    const [srcPre, setSrcPre] = useState();
    
    const onFinish = async (values, images) => {
        console.log('Received values of form: ', values);
        console.log('Received values of form img: ', images);
        try {
            const res = await axios.post('http://localhost:3001/register', {
                ...values,
                images,
            });
            if (res.status == 200) {
                console.log("success");
                console.log("res", res);
                notification.success({
                    message: 'Register Success',
                });
                history.push("/login");
            }
        } catch (error) {
            console.log(error.response.data);
            notification.error({
                message: 'Register Error',
                description: error.response.data.message,
            });
        }
    };

    const onPreview = (src) => {
        setVisibleImg(true);
        setSrcPre(src);
    }

    const handleOkImg = async () => {
        let list = await fileList.filter((item, ind) => item.url !== srcPre);
        setFileList(list);
        setVisibleImg(false);
    }

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.topTitle}>????ng k??</div>
                    <img src={logo} alt="logo-room-for-you" width={120} />
                </div>
                <div className={styles.form}>
                    <Form
                        form={form}
                        name="register"
                        onFinish={(values) =>
                            onFinish(
                                values,
                                fileList.map((file) => file.originFileObj.url),
                            )
                        }
                    >
                        <div style={{ marginBottom: '6px' }}>T??n ng?????i d??ng: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p t??n ng?????i d??ng!',
                                },
                                {
                                    type: 'string',
                                    message: 'T??n ng?????i d??ng ch??? ch???a k?? t??? ch???!',
                                },
                                {
                                    max: 30,
                                    message: 'T??n ng?????i d??ng kh??ng d??i qu?? 30 k?? t???',
                                }
                            ]}
                        >
                            <Input placeholder="Ho??ng Th??? Anh" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>T??n ????ng nh???p: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p t??n ????ng nh???p!',
                                },
                                {
                                    max: 20,
                                    message: 'T??n ????ng nh???p kh??ng d??i qu?? 20 k?? t???',
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
                                    message: 'Email kh??ng h???p l???!',
                                },
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p email c???a b???n!',
                                },
                            ]}
                        >
                            <Input placeholder="abc@gmail/com" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>Vai tr??: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="roles"
                            rules={[{ required: true, message: 'Vui l??ng ch???n vai tr?? ng?????i d??ng!' }]}
                        >
                            <Radio.Group>
                                <Radio value="0">Ng?????i cho thu?? tr???</Radio>
                                <Radio value="1">Ng?????i thu?? tr???</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>S??T: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p s??? ??i???n tho???i c???a b???n!',
                                },
                                {
                                    pattern: '([0-9])',
                                    message: 'Vui l??ng nh???p s???!'
                                },
                                {
                                    max: 10,
                                    message: 'S??T kh??ng d??i qu?? 10 k?? t???!', 
                                }
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="0961274312" />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>M???t kh???u: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p m???t kh???u c???a b???n!',
                                },
                                {
                                    min: 6,
                                    message: '????? d??i m???t kh???u t???i thi???u l?? 6 k?? t???',
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <div style={{ marginBottom: '6px' }}>X??c nh???n l???i m???t kh???u: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng x??c nh???n l???i m???t kh???u!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('M???t kh???u kh??ng kh???p!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div>?????a ch???: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????a ch??? c???a b???n!',
                                },
                                {
                                    max: 200,
                                    message: '?????a ch??? kh??ng d??i qu?? 200 k?? t???',
                                }
                            ]}
                        >
                            <Input placeholder="S??? 1, ???????ng ?????i C??? Vi???t, Hai B?? Tr??ng, H?? N???i " />
                        </Form.Item>

                        <div>Ch???n ???nh ?????i di???n: </div>
                        <br />
                        {/* <Form.Item
                            name="upload"
                        > */}
                        {/* <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Ch???n ???nh</Button>
                            </Upload> */}
                        <div className={styles.uploads}>
                            {fileList
                                // .filter((file) => file.originFileObj.url)
                                .map((file, idx) => {
                                    return (
                                        <div
                                            className={styles.card} key={idx}
                                            onClick={() => onPreview(file.originFileObj.url)}
                                        >
                                            <img src={file.originFileObj.url} className={styles.img} />
                                        </div>
                                    );
                                })
                            }
                            {console.log("file list", fileList)}
                            <Upload
                                style={{ marginTop: '10px' }}
                                beforeUpload={(file) => {
                                    console.log("file before", file);
                                    if (!file.type.includes('image/')) {
                                        notification.error({
                                            message: `${file.name} is not a image file`,
                                        });
                                    }
                                    return file.type.includes('image/');
                                }}
                                onChange={async (info) => {
                                    console.log("onchange info", info.file)
                                    if (info.file.status === 'uploading') {
                                        console.log("onchange", info.file.status);
                                        setUploading(true);
                                    } else {
                                        console.log("onchange", info.file.status);
                                        setUploading(false);
                                    }
                                    if (info.file.status === 'done') {
                                        console.log(" if done", info.fileList);
                                        setFileList([...fileList, info.file]);
                                    } else if (info.file.status === 'error') {
                                        console.log(" if error", info.file.error);
                                        notification.error({
                                            message: info.file.error.status
                                                ? info.file.error.status
                                                : 'An error occurred',
                                        });
                                    }
                                }}
                                accept="image/*"
                                multiple={true}
                                showUploadList={false}
                                customRequest={async ({ onSuccess, onError, file }) => {
                                    const form = new FormData();
                                    form.append('files', file);
                                    try {
                                        const res = await axios.post(
                                            "http://localhost:3001/upload",
                                            form,
                                        );
                                        if (res.status === 200) {
                                            let url = "http://" + res.data.data[0].replace(/\\/g, "/")
                                            file.url = url;
                                            console.log("200", url);
                                            onSuccess(null, file);
                                        } else {
                                            console.log("not 200", res)
                                            onError(res);
                                        }
                                    } catch (error) {
                                        console.log("axios err", error);
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
                        </div>

                        <Modal
                            centered={window.innerWidth > 600}
                            style={{ top: -10 }}
                            visible={visibleImg}
                            onCancel={() => setVisibleImg(false)}
                            onOk={handleOkImg}
                            okText="Delete"
                            // footer={null}
                            width={500}
                        >
                            <img
                                src={srcPre}
                                style={{
                                    width: 450,
                                    height: 450,
                                }}
                            />
                        </Modal>
                        {/* </Form.Item> */}

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Vui l??ng ?????ng ?? v???i ??i???u kho???n c???a ch??ng t??i!')),
                                },
                            ]}
                        >
                            <Checkbox>
                                T??i ???? ?????c v?? ?????ng ?? v???i c??c <a href="">??i???u kho???n</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button
                                htmlType="submit"
                                className={styles.button}
                            >
                                {/* <Link to="/login">????ng k??</Link> */}
                                ????ng k??
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