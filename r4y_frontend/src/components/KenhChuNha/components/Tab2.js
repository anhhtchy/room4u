import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { estate } from "../../../constants/ActionType";
import { estateLink } from "../../../constants/ActionType";

import {
    Button,
    Row,
    Col,
    Modal,
    message,
    Form,
    Input,
    Select,
    notification,
    Upload,
    Pagination,
} from 'antd';

import {
    EditOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import Item from './Item1';
import styles from './tab.module.css';

import item1 from "../../../img/item1.jpg";
import item2 from "../../../img/item2.jpg";
import img from "../../../img/img.jpg";
import img1 from "../../../img/img1.jpg";
import img2 from "../../../img/img2.jpg";
import img3 from "../../../img/img3.jpg";
import Loading from '../../loading';

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Tab2 = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [visibleImg, setVisibleImg] = useState(false);
    const [srcPre, setSrcPre] = useState();
    const [userData, setUserData] = useState(JSON.parse((window.localStorage.getItem('userData'))));
    const [userPost, setUserPost] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await setUserData(JSON.parse(window.localStorage.getItem('userData')));
            console.log("user id", userData.userData.userid);
            if (userData) {
                try {
                    const res = await axios.get(`http://localhost:3001/home/${userData.userData.userid}`, {
                        headers: {
                            // 'content-type': 'application/x-www-form-urlencoded',
                            'x-access-token': userData.accessToken,
                        }
                    });
                    if (res.status == 200) {
                        console.log("post", res);
                        setUserPost(res.data.posts);
                        setLoading(false);
                    } else {
                        console.log("post", res);
                        setLoading(false);
                    }

                } catch (err) {
                    console.log("err mes:", err);
                    setLoading(false);
                }
            } else {
                setLoading(false);
                console.log("userData null", userData);
            }

        })();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        message.success('Đăng bài thành công!');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log("edit", values);
        setIsModalVisible(false);
        message.success('Đăng bài thành công!');
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
        setFileList(list);
        setVisibleImg(false);
    }

    const handleChangePage = (page) => {
        console.log(page);
        setStart(page - 1);
        setEnd(page);
    }

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Quản lý phòng trọ <span style={{ fontSize: '20px', color: '#52c41a' }}>{`${userPost.length}`} tin đã đăng</span></div>
                <Button
                    className={styles.button}
                    icon={<PlusCircleOutlined />}
                    onClick={showModal}
                >Đăng tin mới</Button>
            </div>
            {loading ? <Loading /> :
                <div className={styles.content}>
                    <Row gutter={[32, 32]}>
                        {userPost && userPost.slice(start * 3, end * 3).map((item, idx) => (
                            <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                {/* <Link to={`/${estateLink[item.data.estatetype]}/${item.data.postid}-${item.data.title}`}> */}
                                    <Item
                                        img={item.images[0]}
                                        type={estate[item.data.estatetype]}
                                        title={`${item.data.title}`}
                                        location={`${item.data.address} - ${item.data.ward} - ${item.data.city}`}
                                        rating={4.5}
                                        price={item.data.price}
                                        square={item.data.area}
                                        count_room={item.data.roomnum}
                                    />
                                {/* </Link> */}
                            </Col>
                        ))}
                    </Row>
                </div>
            }
            <Pagination
                defaultCurrent={1}
                defaultPageSize={3}
                total={userPost.length}
                responsive={true}
                style={{ textAlign: 'right' }}
                onChange={handleChangePage}
            />

            <Modal
                title={<div
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        color: '#faad14',
                    }}
                >ĐĂNG TIN MỚI</div>}
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
                >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Tiêu đề: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input
                            placeholder="Nhập tiêu đề bài viết"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Vui lòng chọn loại bất động sản!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Loại bất động sản: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Select
                            placeholder="Chọn loại BĐS"
                            allowClear
                            size="large"
                            style={{ width: 'calc(50% - 8px)' }}
                        >
                            <Option value="Phòng trọ sinh viên">Phòng trọ sinh viên</Option>
                            <Option value="Chung cư">Chung cư</Option>
                            <Option value="Chung cư mini">Chung cư mini</Option>
                            <Option value="Nhà nguyên căn">Nhà nguyên căn</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Giá phòng: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input
                            placeholder="Nhập giá phòng"
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '10px' }}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Địa chỉ: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input
                            placeholder="Nhập địa chỉ BĐS"
                            size="large"
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Giá dịch vụ: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        label="Giá điện"
                        name="elecPrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá điện!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>
                    <Form.Item
                        label="Giá nước"
                        name="waterPrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá nước!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>
                    <Form.Item
                        label="Giá wifi"
                        name="wifiPrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá wifi!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>
                    <Form.Item
                        label="Giá gửi xe"
                        name="packingPrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá gửi xe!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Mô tả: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input.TextArea rows={8} />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Thêm ảnh: <span style={{ color: '#f5222d' }}>*</span></div>
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
                                    let lastItem = await fileList[fileList.length - 1]
                                    setFileList(info.fileList);
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

                    <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit" className={styles.button}>
                            ĐĂNG
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Tab2;