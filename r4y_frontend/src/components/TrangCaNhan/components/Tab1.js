import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import Loading from '../../loading';

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
    Image,
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
    const [userData, setUserData] = useState();
    const [listImg, setListImg] = useState([]);
    const [visibleImg, setVisibleImg] = useState(false);
    const [srcPre, setSrcPre] = useState();
    const [fileList, setFileList] = useState([]);
    const [visibleModalChangePass, setVisibleModalChangePass] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState();

    useEffect(async () => {
        const data = JSON.parse((window.localStorage.getItem('userData')));
        const userId = data.userData.userid;
        console.log("user id", userId);
        getRating(userId);
        try {
            const res = await axios.get(`http://localhost:3001/user/${userId}`);
            if (res.status == 200) {
                console.log("get data user", res);
                await setUserData(res.data);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
        console.log("header user data", userData);
    }, [loading]);

    const getRating = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3001/ratings/averageuser/${userId}`);
            if (res.status == 200) {
                setRating(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const showModal = async () => {
        await setListImg([userData.userData.avatar]);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values, images) => {
        console.log("edit profile", values);
        console.log("edit profile", images);
        setLoading(true);
        const url = `http://localhost:3001/${userData.userData.userid}/changeProfile`

        try {
            const res = await axios.put(url, { ...values, images });
            if (res.status == 200) {
                console.log("change Pro", res);
                setIsModalVisible(false);
                setLoading(false);
                message.success('???? l??u!');
                // window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onFinishFailed = (errInfo) => {
        console.log("edit err", errInfo);
    }

    const onPreview = (src) => {
        setVisibleImg(true);
        setSrcPre(src);
    }

    const handleOkImg = async () => {
        let list = await fileList.filter((item, ind) => item.url !== srcPre);
        let newListImg = await listImg.filter((item, ind) => item !== srcPre)
        setFileList(list);
        setListImg(newListImg)
        setVisibleImg(false);
    }

    const onFinishChangePass = async (values) => {
        console.log("change pass", values);
        try {
            const res = await axios.post("http://localhost:3001/changepassword", {
                username: userData.userData.username,
                password: values.old_password,
                newPassword: values.password,
            })
            if (res.status == 200) {
                console.log(res);
                message.success("?????i m???t kh???u th??nh c??ng!");
                setVisibleModalChangePass(false);
            }
        } catch (err) {
            console.log(err.response.data.message);
            message.error(err.response.data.message);
        }
    }

    const onFinishFailedChangePass = (err) => {
        console.log(err);
        notification.error("Change password failed!")
    }

    return (
        loading ? <Loading />
            : < div className={styles.tab} >
                <div className={styles.tabTitle}>
                    <div>Th??ng tin c?? nh??n</div>
                    <Button className={styles.button} icon={<EditOutlined />} onClick={showModal}>S???a th??ng tin</Button>
                </div>
                <Modal
                    title={<div
                        style={{
                            fontSize: '20px',
                            textAlign: 'center',
                            color: '#faad14',
                        }}
                    >CH???NH S???A TH??NG TIN C?? NH??N</div>}
                    width={700}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="????ng"
                    cancelText="H???y"
                    footer={null}
                >
                    <Form
                        initialValues={{
                            fullname: userData.userData.fullname,
                            email: userData.userData.email,
                            phone: userData.userData.phone,
                            address: userData.userData.address,
                        }}
                        onFinish={(values) =>
                            onFinish(
                                values,
                                listImg.map((url) => url),
                            )
                        }
                        onFinishFailed={onFinishFailed}
                        labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
                    >
                        {/* <div style={{ marginBottom: '6px' }}>T??n ng?????i d??ng: <span style={{ color: '#f5222d' }}>*</span></div> */}
                        <Form.Item
                            label="T??n ng?????i d??ng"
                            name="fullname"
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
                            <Input />
                        </Form.Item>

                        {/* <div style={{ marginBottom: '6px' }}>T??n ????ng nh???p: <span style={{ color: '#f5222d' }}>*</span></div> */}
                        {/* <Form.Item
                        label="T??n ????ng nh???p"
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
                        <Input />
                    </Form.Item> */}

                        {/* <div style={{ marginBottom: '6px' }}>Email: <span style={{ color: '#f5222d' }}>*</span></div> */}
                        <Form.Item
                            label="email"
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
                            <Input />
                        </Form.Item>

                        {/* <div style={{ marginBottom: '6px' }}>S??T: <span style={{ color: '#f5222d' }}>*</span></div> */}
                        <Form.Item
                            label="S??T"
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
                            <Input style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            label="?????a ch???"
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
                            <Input value="S??? 1, ???????ng ?????i C??? Vi???t, Hai B?? Tr??ng, H?? N???i " />
                        </Form.Item>

                        <div style={{ marginBottom: '6px', fontWeight: '600', textAlign: 'center' }}>Thay ?????i m???t kh???u
                    <Button className={styles.button} onClick={() => setVisibleModalChangePass(true)}>?????i m???t kh???u</Button>
                        </div>
                        <Modal
                            title={<div
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    color: '#faad14',
                                    marginTop: '20px'
                                }}
                            >CH???NH S???A TH??NG TIN C?? NH??N</div>}
                            visible={visibleModalChangePass}
                            footer={null}
                            onCancel={() => setVisibleModalChangePass(false)}
                        >
                            <Form
                                onFinish={onFinishChangePass}
                                onFinishFailed={onFinishFailedChangePass}
                                labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}
                            >
                                <Form.Item
                                    label="Nh???p m???t kh???u c??"
                                    name="old_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p m???t kh???u c?? c???a b???n!',
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

                                <Form.Item
                                    label="Nh???p m???t kh???u m???i"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p m???t kh???u m???i!',
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

                                <Form.Item
                                    label="X??c nh???n m???t kh???u m???i"
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng x??c nh???n l???i m???t kh???u m???i!',
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

                                <div style={{ textAlign: 'center' }}>
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
                                        L??U
                                 </Button>
                                </div>

                            </Form>
                        </Modal>

                        <span style={{ marginRight: '40px' }}> <span style={{ color: '#f5222d' }}>*</span>Ch???n ???nh ?????i di???n:</span>
                        {listImg
                            .map((url, idx) => {
                                return (
                                    <div
                                        className={styles.card} key={idx}
                                        onClick={() => onPreview(url)}
                                        style={{ width: 'fit-content' }}
                                    >
                                        <img
                                            src={url}
                                            className={styles.img}
                                        // style={{
                                        //     borderRadius: '6px',
                                        //     width: '80px',
                                        //     height: '80px',
                                        //     marginRight: '10px',
                                        // }}
                                        />
                                    </div>
                                );
                            })
                        }

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
                                console.log("onchange info", info)
                                if (info.file.status === 'uploading') {
                                    setUploading(true);
                                } else {
                                    setUploading(false);
                                }
                                if (info.file.status === 'done') {
                                    console.log(" if done", info);
                                    setFileList([...fileList, info.file]);
                                    setListImg([...listImg, info.file.url])
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
                            <div className={styles.upload}
                                style={{
                                    width: '96px',
                                    height: '96px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px dashed #c4d5e5',
                                    boxSizing: 'border-box',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    color: '#181818',
                                }}
                            >
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
                                H???Y
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
                                L??U
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <div className={styles.content}>
                    <div className={styles.leftContent}>
                        <div className={styles.item}>
                            <Avatar src={<Image src={userData.userData.avatar} />} />
                            <div className={styles.value}>{userData.userData.username}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><SendOutlined style={{ marginRight: '5px' }} />H??? v?? t??n:</div>
                            <div className={styles.itemValue}>{userData.userData.fullname}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><SendOutlined style={{ marginRight: '5px' }} />T??n ????ng nh???p:</div>
                            <div className={styles.itemValue}>{userData.userData.username}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><EnvironmentOutlined style={{ marginRight: '5px' }} />?????a ch???:</div>
                            <div className={styles.itemValue}>{userData.userData.address}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><PhoneOutlined style={{ marginRight: '5px' }} />S??? ??i???n tho???i:</div>
                            <div className={styles.itemValue}>{userData.userData.phone}</div>
                        </div>
                    </div>
                    <div className={styles.rightContent}>
                        <br /><br />
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><MailOutlined style={{ marginRight: '5px' }} />Email:</div>
                            <div className={styles.itemValue}>{userData.userData.email}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />S??? tin ???? l??u:</div>
                            <div className={styles.itemValue}>{window.localStorage.getItem("userSavePostLength")}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><FieldTimeOutlined style={{ marginRight: '5px' }} />Ng??y tham gia:</div>
                            <div className={styles.itemValue}>{moment(userData.userData.created).format('L')}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><HeartOutlined style={{ marginRight: '5px' }} />????nh gi??: </div>
                            <div className={styles.itemValue}>
                                <div className={styles.itemRating}>
                                    <Rate
                                        allowHalf
                                        disabled
                                        value={rating ? rating.averageRating : 0}
                                        style={{ fontSize: '14px', color: '#faad14', marginRight: '10px' }}
                                    />
                                </div>
                            </div>
                            <div style={{ fontSize: '12px' }}>({rating ? rating.nRatings : 0} ng?????i ????nh gi??)</div>
                        </div>
                    </div>
                </div>
            </div >
    )
}

export default Tab1;