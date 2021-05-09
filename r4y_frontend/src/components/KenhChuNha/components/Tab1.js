import React, { useState } from 'react';

import { Avatar, Button, Modal } from 'antd';
import {
    SendOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    FormOutlined,
    FieldTimeOutlined,
    HeartOutlined,
    EditOutlined,
} from '@ant-design/icons';

import styles from './tab.module.css';

const Tab1 = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Thông tin cá nhân</div>
                <Button className={styles.button} icon={<EditOutlined />} onClick={showModal}>Sửa thông tin</Button>
            </div>
            <Modal
                title="Chỉnh sửa thông tin cá nhân"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
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
                        <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />Số tin đã đăng:</div>
                        <div className={styles.itemValue}>Nguyễn Văn A</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><FieldTimeOutlined style={{ marginRight: '5px' }} />Ngày tham gia:</div>
                        <div className={styles.itemValue}>abc@gmail.com</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemTitle}><HeartOutlined style={{ marginRight: '5px' }} />Đánh giá:</div>
                        <div className={styles.itemValue}>abc@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tab1;