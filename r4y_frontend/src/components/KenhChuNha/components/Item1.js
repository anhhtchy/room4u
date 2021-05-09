import React, { useState } from 'react';
import { Button, Rate, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import img1 from '../../../img/item1.jpg';

import styles from '../../Homepage/Home.module.css';
import styles1 from './tab.module.css';

const Item1 = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDelVisible, setIsModalDelVisible] = useState(false);

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
    };

    const handleCancelDel = () => {
        setIsModalDelVisible(false);
    };


    return (
        <div className={styles.item}>
            <div className={styles.imgItem} style={{ backgroundImage: `url(${props.img})` }}></div>
            <div className={styles.itemContent}>
                <div className={styles.itemType}>{props.type}</div>
                <div className={styles.itemTitle}>{props.title}{", "}{props.location}</div>
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
                title="Sửa bài đăng"
                width={800}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
            </Modal>
            <Modal title="Xóa bài đăng" visible={isModalDelVisible} onOk={handleOkDel} onCancel={handleCancelDel}>
                <p>Xác nhận xóa bài đăng</p>
                <p>Chưa xong.....</p>
            </Modal>

        </div>
    )
}

export default Item1;