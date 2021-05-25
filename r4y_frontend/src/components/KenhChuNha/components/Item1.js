import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

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
import { estateLink } from "../../../constants/ActionType";

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Item1 = (props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDelVisible, setIsModalDelVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [visibleImg, setVisibleImg] = useState(false);
    const [srcPre, setSrcPre] = useState();
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    const [district, setDisData] = useState([]);
    const [listImg, setListImg] = useState([]);

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

    const showModal = async () => {
        await setListImg(props.images);
        console.log("list img", listImg);
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

    const handleOkDel = async () => {
        const url = `http://localhost:3001/${userData.userData.userid}/deletePost/${props.postid}`
        try {
            const res = await axios.delete(url);
            if (res == 200) {
                message.success("Đã xóa!");
                setIsModalDelVisible(false);
            }
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
        setIsModalDelVisible(false);
    };

    const handleCancelDel = () => {
        setIsModalDelVisible(false);
    };

    const onFinish = async (values, images) => {
        console.log("edit", values);
        console.log("edit", images);
        try {
            const res = await axios.put(`http://localhost:3001/${userData.userData.userid}/updatePost/${props.postid}`, {
                ...values,
                images,
                ward: '',
                city: "Hà Nội",
                restroom: '',
                rented: 0,
                expired: Date.now(),

            });
            if (res.status == 200) {
                console.log("Post update", res);
                notification.success({
                    message: 'Update success!',
                });
            }
            setIsModalVisible(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Update post Error!',
                description: error,
            });
        }
        setIsModalVisible(false);
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

    return (
        <div className={styles.item}>
            <div className={styles.imgItem} style={{ backgroundImage: `url(${props.img})` }}></div>
            <div className={styles.itemContent}>
                <div className={styles.itemType}>{props.type}</div>
                <Link to={`/${estateLink[props.estatetype]}/${props.postid}`}>
                    <div className={styles.itemTitle}>{props.title.slice(0, 50)}...</div>
                </Link>
                <div className={styles.addressPost}>{props.location.slice(0, 40)}...</div>
                <div className={styles.itemPrice}>{new Intl.NumberFormat().format(props.price)}{" đ/tháng"}</div>
                <div className={styles.square}>{props.square}m<sup>2</sup>{" - "}{props.count_room}{" phòng"}</div>
            </div>
            <div className={styles1.bottomItem}>
                <div
                    className={styles1.oneItem}
                    style={{ borderRight: '1px solid #dfdfdf' }}
                    onClick={showModal}
                >
                    <EditOutlined />
                </div>
                <div className={styles1.oneItem} onClick={showModalDel}><DeleteOutlined /></div>
            </div>
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
                    form={form}
                    initialValues={{
                        title: props.title,
                        estatetype: props.estatetype,
                        district: props.district,
                        address: props.address,
                        area: props.square,
                        price: props.price,
                        description: props.description,
                        roomnum: props.count_room,
                        electricity: props.electricity,
                        water: props.water,
                        wifi: props.wifi,
                        ultility: props.ultility,
                    }}
                    onFinish={(values) =>
                        onFinish(
                            values,
                            listImg.map((url) => url),
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
                    <div className={styles.uploads}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {listImg
                            .map((url, idx) => {
                                return (
                                    <div
                                        className={styles.card} key={idx}
                                        onClick={() => onPreview(url)}
                                    >
                                        <img
                                            src={url}
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