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
    PlusOutlined,
    LoadingOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import img1 from '../../../img/item1.jpg';

import styles from '../../Homepage/Home.module.css';
import styles1 from './tab.module.css';

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Item1 = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDelVisible, setIsModalDelVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [visibleImg, setVisibleImg] = useState(false);
    const [srcPre, setSrcPre] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModalDel = () => {
        setIsModalDelVisible(true);
    };

    const handleOkDel = () => {
        setIsModalDelVisible(false);
        message.success('Đã xóa!');
    };

    const handleCancelDel = () => {
        setIsModalDelVisible(false);
    };

    const onFinish = (values) => {
        console.log("edit", values);
        setIsModalVisible(false);
        message.success('Đã lưu!');
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

    return (
        <div className={styles.item}>
            <div className={styles.imgItem} style={{ backgroundImage: `url(${props.img})` }}></div>
            <div className={styles.itemContent}>
                <div className={styles.itemType}>{props.type}</div>
                <div className={styles.itemTitle}>{props.title.slice(0,50)}...</div>
                <div className={styles.addressPost}>{props.location.slice(0,40)}...</div>
                {/* <div className={styles.itemRating}>
                    <Rate
                        allowHalf
                        disabled
                        defaultValue={props.rating}
                    />
                </div> */}
                <div className={styles.itemPrice}>{new Intl.NumberFormat().format(props.price)}{" đ/tháng"}</div>
                <div className={styles.square}>{props.square}m<sup>2</sup>{" - "}{props.count_room}{" phòng"}</div>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={showModalDel}
            >
                <Button className={styles.button}
                    style={{
                        marginLeft: '20px',
                        marginRight: '20px',
                        marginBottom: '20px',
                        borderRadius: '8px',
                    }}><DeleteOutlined /> Xóa tin</Button>
            </div>
            {/* <div className={styles1.bottomItem}>
    
                <div style={{ display: 'flex', alignItems: 'center' }} onClick={showModalDel}>
                    <Button className={styles.button}><DeleteOutlined /> Xóa tin</Button>
                </div>
            </div> */}
            <Modal
                title={<div
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        color: '#faad14',
                    }}
                >SỬA BÀI VIẾT</div>}
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
                    // rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Tiêu đề: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input
                            placeholder="Nhập tiêu đề bài viết"
                            size="large"
                            value={props.title}
                        />
                    </Form.Item>

                    <Form.Item
                        name="type"
                    // rules={[{ required: true, message: 'Vui lòng chọn loại bất động sản!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Loại bất động sản: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Select
                            placeholder="Chọn loại BĐS"
                            allowClear
                            size="large"
                            style={{ width: 'calc(50% - 8px)' }}
                            value={1}
                        >
                            <Option value={1}>Phòng trọ sinh viên</Option>
                            <Option value={2}>Chung cư</Option>
                            <Option value={3}>Chung cư mini</Option>
                            <Option value={4}>Nhà nguyên căn</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price"
                    // rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Giá phòng: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input
                            placeholder="Nhập giá phòng"
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '10px' }}
                            value={props.price}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>

                    <Form.Item
                        name="address"
                    // rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Địa chỉ: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input
                            placeholder="Nhập địa chỉ BĐS"
                            size="large"
                            value={props.location}
                        />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Giá dịch vụ: <span style={{ color: '#f5222d' }}>*</span></div>
                    <Form.Item
                        label="Giá điện"
                        name="elecPrice"
                        // rules={[{ required: true, message: 'Vui lòng nhập giá điện!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                            value={props.price}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>
                    <Form.Item
                        label="Giá nước"
                        name="waterPrice"
                        // rules={[{ required: true, message: 'Vui lòng nhập giá nước!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                            value={props.price}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>
                    <Form.Item
                        label="Giá wifi"
                        name="wifiPrice"
                        // rules={[{ required: true, message: 'Vui lòng nhập giá wifi!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                            value={props.price}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>
                    <Form.Item
                        label="Giá gửi xe"
                        name="packingPrice"
                        // rules={[{ required: true, message: 'Vui lòng nhập giá gửi xe!' }]}
                        labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                    >
                        <Input
                            size="large"
                            type="number"
                            style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}
                            value={props.price}
                        />
                        <span>(đồng/tháng)</span>
                    </Form.Item>

                    <Form.Item
                        name="description"
                    // rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <div style={{ marginBottom: '6px', fontWeight: '500' }}>Mô tả: <span style={{ color: '#f5222d' }}>*</span></div>
                        <Input.TextArea rows={8} value={'Moo ta thosdkf'} />
                    </Form.Item>

                    <div style={{ marginBottom: '6px', fontWeight: '500' }}>Thêm ảnh: <span style={{ color: '#f5222d' }}>*</span></div>
                    <div className={styles.uploads}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {fileList
                            // .filter((file) => file.originFileObj.url)
                            .map((file, idx) => {
                                return (
                                    <div
                                        className={styles.card} key={idx}
                                        onClick={() => onPreview(file.originFileObj.url)}
                                    >
                                        <img
                                            src={file.originFileObj.url}
                                            className={styles.img}
                                            style={{
                                                borderRadius: '6px',
                                                width: '80px',
                                                height: '80px',
                                                marginRight: '10px',
                                            }}
                                        />
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

                    <Form.Item style={{ marginTop: '30px', textAlign: 'center' }}>
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

            <Modal
                visible={isModalDelVisible}
                onOk={handleOkDel}
                onCancel={handleCancelDel}
                okText="Xóa"
                cancelText="Hủy"
                width={300}
            >
                <p style={{ textAlign: 'center' }}>Xác nhận xóa bài viết ?</p>
            </Modal>

        </div >
    )
}

export default Item1;