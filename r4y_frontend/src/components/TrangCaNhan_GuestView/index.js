import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
    Breadcrumb,
    Rate,
    Button,
    Row,
    Col,
    Avatar,
    Pagination,
    Image,
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

import { Link, useParams } from "react-router-dom";

import Item from '../Homepage/components/Item';

import styles from './index.module.css';

import item1 from "../../img/item1.jpg";
import item2 from "../../img/item2.jpg";
import img from "../../img/img.jpg";
import img1 from "../../img/img1.jpg";
import img2 from "../../img/img2.jpg";
import img3 from "../../img/img3.jpg";
import axios from 'axios';
import Loading from '../loading';
import { estateLink, estate } from "../../constants/ActionType";

const GuestView = () => {
    const params = useParams();
    const [userData, setUserData] = useState();
    const [userPost, setUserPost] = useState();
    const [loading, setLoading] = useState(true);
    const count_post = window.localStorage.getItem("userPostLength");
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1);
    const [rating, setRating] = useState();

    useEffect(async () => {
        getRating(params.id);
        try {
            const res = await axios.get(`http://localhost:3001/user/${params.id}`);
            if (res.status == 200) {
                console.log("get data user", res);
                await setUserData(res.data);
            }
        } catch (err) {
            console.log(err);
        }

        try {
            const res = await axios.get(`http://localhost:3001/home/${params.id}`);
            if (res.status == 200) {
                console.log("g", res);
                await setUserPost(res.data.posts);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

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

    const handleChangePage = (page) => {
        console.log(page);
        setStart(page - 1);
        setEnd(page);
    }

    return (
        loading ? <Loading />
            : <div className={styles.container}>
                <div className={styles.guestView}>
                    <Breadcrumb separator={<DoubleRightOutlined style={{ fontSize: '12px' }} />}>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                            <span>Trang chủ</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <span>Trang cá nhân của {`${userData.userData.fullname}`}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.top}>
                        <div className={styles.topLeft}>
                            <Avatar 
                            size={72} 
                            icon={userData.userData.avatar ? "": <UserOutlined />} 
                            src={<Image src={userData.userData.avatar ? userData.userData.avatar : ""}/>}
                            />
                            <div style={{ marginLeft: '20px' }}>
                                <div className={styles.fullname}>
                                    {userData.userData.fullname}
                                </div>
                                <div className={styles.username}>
                                    {userData.userData.username}
                                </div>
                            </div>
                        </div>
                        <div className={styles.topRight}>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}><EnvironmentOutlined style={{ marginRight: '5px' }} />Địa chỉ:</div>
                                <div className={styles.itemValue}>{userData.userData.address}</div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}><PhoneOutlined style={{ marginRight: '5px' }} />Số điện thoại:</div>
                                <div className={styles.itemValue}>
                                    {userData.userData.phone ? (userData.userData.phone.slice(0, 3)
                                        + "***" +
                                        userData.userData.phone.slice(userData.userData.phone.length - 3, userData.userData.phone.length)
                                    ) : ""}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}><FieldTimeOutlined style={{ marginRight: '5px' }} />Ngày tham gia:</div>
                                <div className={styles.itemValue}>{moment(userData.userData.created).format("MMMM Do YYYY")}</div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />Số tin đã đăng:</div>
                                <div className={styles.itemValue}>{userPost.length}</div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}><FormOutlined style={{ marginRight: '5px' }} />Đánh giá:</div>
                                <div className={styles.itemValue}>
                                    <Rate
                                        allowHalf
                                        disabled
                                        value={rating ? rating.averageRating : 0}
                                        style={{
                                            fontSize: '14px',
                                            color: '#faad14',
                                        }}
                                    />
                                </div>
                                <div style={{ fontSize: '12px' }}>({rating ? rating.nRatings : 0} người đánh giá)</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.bodyTitle}>
                            TIN ĐÃ ĐĂNG
                        <span style={{ fontSize: '20px', color: '#fafafa' }}> {userPost.length ? userPost.length : 0} tin </span>
                        </div>
                        {!userPost.length ? <div>Chưa có bài đăng nào!</div>
                            : <Row gutter={[32, 32]}>
                                {userPost.slice(start * 6, end * 6).map((item, idx) => (
                                    <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                        <Link to={`/${estateLink[item.data.estatetype]}/${item.data.postid}`}>
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
                                                estatetype={item.data.estatetype}
                                                district={item.data.district}
                                                address={item.data.address}
                                                electricity={item.data.electricity}
                                                water={item.data.water}
                                                wifi={item.data.wifi}
                                                ultility={item.data.ultility}
                                                images={item.images}
                                            />
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        }
                        <br />
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={6}
                            total={userPost.length}
                            responsive={true}
                            style={{ textAlign: 'right' }}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </div>
    )
}

export default GuestView;