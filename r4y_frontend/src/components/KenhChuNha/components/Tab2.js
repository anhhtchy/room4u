import React, { useState } from 'react';

import { Button, Row, Col, Modal } from 'antd';
import {
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';

import Item from './Item1';
import styles from './tab.module.css';

import item1 from "../../../img/item1.jpg";
import item2 from "../../../img/item2.jpg";
import img from "../../../img/img.jpg";
import img1 from "../../../img/img1.jpg";
import img2 from "../../../img/img2.jpg";
import img3 from "../../../img/img3.jpg";

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
                title="Đăng tin mới"
                width={800}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default Tab2;