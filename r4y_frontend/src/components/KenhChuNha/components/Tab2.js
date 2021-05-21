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
    const [form] = Form.useForm();
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
    const [district, setDisData] = useState([]);
    const [visibleModalDeleteAll, setVisibleModalDeleteAll] = useState(false);

    useEffect(() => {
        (async () => {
            await setUserData(JSON.parse(window.localStorage.getItem('userData')));
            console.log("user data", userData.userData);
            if (userData) {
                try {
                    const res = await axios.get(`http://localhost:3001/home/${userData.userData.userid}`, {
                        // headers: {
                        //     // 'content-type': 'application/x-www-form-urlencoded',
                        //     'x-access-token': userData.accessToken,
                        // }
                    });
                    if (res.status == 200) {
                        console.log("get post data", res);
                        setUserPost(res.data.posts);
                        setLoading(false);
                    } else {
                        console.log("get post data", res);
                        setLoading(false);
                    }

                } catch (err) {
                    console.log("err mes:", err);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }

        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:3001/getDistricts");
                if (res.status == 200) {
                    const temp = await res.data.filter((item, ind) => item.type == "Quận");
                    setDisData(temp);
                }

            } catch (err) {
                console.log(err);
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

    const onFinish = async (values, images) => {
        console.log('Form values: ', values);
        console.log('Form images: ', images);
        setIsModalVisible(false);
        message.success('Đăng bài thành công!');
        try {
            const res = await axios.post(`http://localhost:3001/${userData.userData.userid}/createPost`, {
                ...values,
                images,
                ward: '',
                city: "Hà Nội",
                restroom: '',
                rented: 0,
                userid: userData.userData.userid,
                expired: Date.now(),

            });
            if (res.status == 200) {
                console.log("Post created", res);
                notification.success({
                    message: 'Post created!',
                });
            }
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            notification.error({
                message: 'Create post Error!',
                description: error.response.data.message,
            });
        }
    };

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

    const handleDeleteAll = () => {
        console.log("delete all");
        setVisibleModalDeleteAll(false);
    }

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Quản lý phòng trọ <span style={{ fontSize: '20px', color: '#52c41a' }}>{`${userPost.length ? userPost.length : 0}`} tin đã đăng</span></div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        style={{
                            background: '#cf1322',
                        }}
                        className={styles.button}
                        icon={<PlusCircleOutlined />}
                        onClick={() => setVisibleModalDeleteAll(true)}
                    >Xóa tất cả</Button>

                    <Modal
                        centered={window.innerWidth > 600}
                        visible={visibleModalDeleteAll}
                        onCancel={() => setVisibleModalDeleteAll(false)}
                        onOk={handleDeleteAll}
                        okText="Delete All"
                        width={400}
                    >Xác nhận xóa tất cả bài đăng ?
                     </Modal>

                    <Button
                        className={styles.button}
                        icon={<PlusCircleOutlined />}
                        onClick={showModal}
                    >Đăng tin mới</Button>
                </div>
            </div>
            {loading ? <Loading /> :
                <div className={styles.content}>
                    {/* <Row gutter={[32, 32]}> */}
                    {console.log("user post", userPost)}
                    {userPost.length ? (userPost.length > 2 ? (
                        <Row gutter={[32, 32]}>
                            {userPost.slice(start * 6, end * 6).map((item, idx) => (
                                <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                    <Item
                                        postid={item.data.postid}
                                        img={item.images[0]}
                                        type={estate[item.data.estatetype]}
                                        title={`${item.data.title}`}
                                        location={`${item.data.address} - ${item.data.ward} - ${item.data.city}`}
                                        rating={4.5}
                                        price={item.data.price}
                                        square={item.data.area}
                                        count_room={item.data.roomnum}
                                        description={item.data.description}
                                    />
                                </Col>))}
                        </Row>
                    ) : userPost.map((item, idx) => (
                        <div style={{ width: '32%', marginRight: '3%' }}>
                            <Item
                                postid={item.data.postid}
                                img={item.images[0]}
                                type={estate[item.data.estatetype]}
                                title={`${item.data.title}`}
                                location={`${item.data.address} - ${item.data.ward} - ${item.data.city}`}
                                rating={4.5}
                                price={item.data.price}
                                square={item.data.area}
                                count_room={item.data.roomnum}
                                description={item.data.description}
                            />
                        </div>
                    ))
                    ) : <div>Bạn chưa có bài đăng nào.</div>
                    }
                    {/* </Row> */}
                </div>
            }
            <Pagination
                defaultCurrent={1}
                defaultPageSize={6}
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
                // onOk={handleOk}
                onCancel={handleCancel}
                okText="Đăng"
                cancelText="Hủy"
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={(values) =>
                        onFinish(
                            values,
                            fileList.map((file) => file.originFileObj.url),
                        )
                    }
                    onFinishFailed={onFinishFailed}
                >
                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Tiêu đề: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input
                            placeholder="Nhập tiêu đề bài viết"
                            size="large"
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Loại bất động sản: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="estatetype"
                        rules={[{ required: true, message: 'Vui lòng chọn loại bất động sản!' }]}
                    >

                        <Select
                            placeholder="Chọn loại BĐS"
                            allowClear
                            size="large"
                            style={{ width: 'calc(50% - 8px)' }}
                        >
                            <Option value={0}>Phòng trọ sinh viên</Option>
                            <Option value={3}>Chung cư</Option>
                            <Option value={2}>Văn phòng - Mặt bằng kinh doanh</Option>
                            <Option value={1}>Nhà nguyên căn</Option>
                        </Select>
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Quận/ huyện: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="district"
                        rules={[{ required: true, message: 'Vui lòng chọn quận , huyện!' }]}
                    >

                        <Select
                            placeholder="Quận/ huyện"
                            allowClear
                            size="large"
                        >
                            {
                                district.length ? district.map((item, ind) => (
                                    <Option value={item.districtid} key={ind}>{item.name}</Option>
                                )) : <></>
                            }
                        </Select>
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Địa chỉ chi tiết: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >

                        <Input
                            placeholder="Nhập địa chỉ BĐS"
                            size="large"
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Diện tích: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="area"
                        rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
                    >

                        <Input
                            placeholder="Nhập diện tích phòng"
                            size="large"
                            type="number"
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Giá phòng (đồng/tháng): <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
                    >

                        <Input
                            placeholder="Nhập giá phòng"
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '10px' }}
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Số phòng: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="roomnum"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng phòng!' }]}
                    >

                        <Input
                            placeholder="Nhập số lượng phòng"
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '10px' }}
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Giá dịch vụ (đồng/tháng): <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        label="Giá điện"
                        name="electricity"
                        rules={[{ required: true, message: 'Vui lòng nhập giá điện!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá nước"
                        name="water"
                        rules={[{ required: true, message: 'Vui lòng nhập giá nước!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá wifi"
                        name="wifi"
                        rules={[{ required: true, message: 'Vui lòng nhập giá wifi!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá gửi xe"
                        name="ultility"
                        rules={[{ required: true, message: 'Vui lòng nhập giá gửi xe!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Mô tả: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >

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
                        <Upload
                            style={{ marginTop: '10px' }}
                            beforeUpload={(file) => {
                                if (!file.type.includes('image/')) {
                                    notification.error({
                                        message: `${file.name} is not a image file`,
                                    });
                                }
                                return file.type.includes('image/');
                            }}
                            onChange={async (info) => {
                                if (info.file.status === 'uploading') {
                                    setUploading(true);
                                } else {
                                    setUploading(false);
                                }
                                if (info.file.status === 'done') {
                                    console.log(" if done", info.fileList);
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
                                        onError(res);
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
                    </div>

                    <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit" className={styles.button}>
                            ĐĂNG
                        </Button>
                    </Form.Item>
                </Form>
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
            </Modal>
        </div>
    )
}

export default Tab2;