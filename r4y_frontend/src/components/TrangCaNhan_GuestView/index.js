import React from 'react';

import {
    Breadcrumb,
    Rate,
    Button,
    Row,
    Col,
    Avatar,
} from "antd";

import {
    HomeOutlined,
    DoubleRightOutlined,
    UserOutlined,
    FormOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons';

import { Link } from "react-router-dom";

import Item from '../Homepage/components/Item';

import styles from './index.module.css';

import item1 from "../../img/item1.jpg";
import item2 from "../../img/item2.jpg";
import img from "../../img/img.jpg";
import img1 from "../../img/img1.jpg";
import img2 from "../../img/img2.jpg";
import img3 from "../../img/img3.jpg";

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

const GuestView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.guestView}>
                <Breadcrumb separator={<DoubleRightOutlined style={{ fontSize: '12px' }} />}>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                        <span>Trang chủ</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <span>Trang cá nhân của {`${""}`}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <Avatar size={72} icon={<UserOutlined />} />
                        <div style={{ marginLeft: '20px' }}>
                            <div className={styles.fullname}>
                                Nguyễn Văn A
                            </div>
                            <div className={styles.username}>
                                nguyenvanabcd2021
                            </div>
                        </div>
                    </div>
                    <div className={styles.topRight}>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><EnvironmentOutlined style={{ marginRight: '5px' }} />Địa chỉ:</div>
                            <div className={styles.itemValue}>BĐS 68 trần hưng đạo</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><PhoneOutlined style={{ marginRight: '5px' }} />Số điện thoại:</div>
                            <div className={styles.itemValue}>098****321</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><FieldTimeOutlined style={{ marginRight: '5px' }} />Ngày tham gia:</div>
                            <div className={styles.itemValue}>31/03/2021</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />Số tin đã đăng:</div>
                            <div className={styles.itemValue}>5</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />Đánh giá:</div>
                            <div className={styles.itemValue}>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={3.5}
                                    style={{
                                        fontSize: '14px',
                                        color: '#faad14',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.bodyTitle}>
                        TIN ĐÃ ĐĂNG
                        <span style={{ fontSize: '20px', color: '#fafafa' }}> 5 tin </span>
                    </div>
                    <Row gutter={[32, 32]}>
                        {mockData.map((item, idx) => (
                            <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                <Link to={`/phong-tro-sv/${item.id}-${item.name}`}>
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
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default GuestView;