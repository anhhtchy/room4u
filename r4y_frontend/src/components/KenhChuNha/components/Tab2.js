import React, { useState } from 'react';
import axios from "axios";

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

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const mockData = [
    {
        id: 1,
        name: "name1",
        img: [item1, img, img1, img2, img3],
        type: "CHUNG CƯ MINI",
        title: "Số 80, ngõ 317 Tây Sơn",
        location: "Ngã Tư Sở, Đống Đa, Hà Nội",
        rating: 4.5,
        count_rating: "10",
        price: 4500000,
        square: "40",
        count_room: "2",
    },
    {
        id: 2,
        name: "name2",
        img: [img, item2, img1, img2, img3],
        type: "CHUNG CƯ MINI",
        title: "Số 80, ngõ 317 Tây Sơn",
        location: "Ngã Tư Sở, Đống Đa, Hà Nội",
        rating: 2.5,
        count_rating: "10",
        price: 6500000,
        square: "40",
        count_room: "2",
    },
    {
        id: 3,
        name: "name3",
        img: [img1, item1, img, img2, img3],
        type: "CHUNG CƯ MINI",
        title: "Số 80, ngõ 317 Tây Sơn",
        location: "Ngã Tư Sở, Đống Đa, Hà Nội",
        rating: 4.0,
        count_rating: "10",
        price: 4000000,
        square: "40",
        count_room: "2",
    },
    {
        id: 4,
        name: "name4",
        img: [img2, item1, img, img1, img3],
        type: "CHUNG CƯ MINI",
        title: "Số 80, ngõ 317 Tây Sơn",
        location: "Ngã Tư Sở, Đống Đa, Hà Nội",
        rating: 3.0,
        count_rating: "10",
        price: 4500000,
        square: "40",
        count_room: "2",
    },
    {
        id: 5,
        name: "name5",
        img: [img3, item2, img, img1, img2],
        type: "CHUNG CƯ MINI",
        title: "Số 80, ngõ 317 Tây Sơn",
        location: "Ngã Tư Sở, Đống Đa, Hà Nội",
        rating: 5.0,
        count_rating: "10",
        price: 5500000,
        square: "40",
        count_room: "2",
    },
];

const Tab2 = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

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

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Quản lý phòng trọ <span style={{ fontSize: '20px', color: '#52c41a' }}>8 tin đã đăng</span></div>
                <Button
                    className={styles.button}
                    icon={<PlusCircleOutlined />}
                    onClick={showModal}
                >Đăng tin mới</Button>
            </div>
            <div className={styles.content}>
                <Row gutter={[32, 32]}>
                    {mockData.slice(0, 3).map((item, idx) => (
                        <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                            {/* <Link to={`/phong-tro-sv/${item.id}-${item.name}`}> */}
                            <Item
                                img={item.img[0]}
                                type={item.type}
                                title={item.title}
                                location={item.location}
                                rating={item.rating}
                                price={item.price}
                                square={item.square}
                                count_room={item.count_room}
                            />
                            {/* </Link> */}
                        </Col>
                    ))}
                </Row>
            </div>

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