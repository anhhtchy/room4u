import React, { useEffect, useState } from 'react';
import { Avatar, Button, Row, Col, Rate, message } from 'antd';
import {
    PhoneOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    HeartOutlined,
    TagsOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import Slider from "react-slick";

import styles from './PageDetail.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../components/Homepage/style.css';

import item1 from '../../img/item1.jpg';
import item2 from '../../img/item2.jpg';
import img from '../../img/img.jpg';
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';
import avatar from '../../img/hello.jpg';
import axios from 'axios';
import Loading from '../loading';
import banner_quangcao1 from '../../img/banner_quangcao2.jpg';

const PageDetail = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [postData, setPostData] = useState();
    const [userPost, setUserPost] = useState();
    const [loading, setLoading] = useState(true);
    const [postReview, setPostReview] = useState();
    const userLogin = JSON.parse((window.localStorage.getItem('userData')));

    const params = useParams();

    useEffect(async () => {
        console.log("params", params);
        try {
            const post = await axios.get(`http://localhost:3001/reviews/${params.id}`);
            if (post.status == 200) {
                console.log("post review", post);
                await setPostReview(post.data.reviews);
            }
        } catch (err) {
            console.log(err);
        }
        try {
            const res = await axios.get(`http://localhost:3001/getPost/${params.id}`);
            if (res.status == 200) {
                console.log("get post data", res.data);
                await setPostData(res.data);
                const userId = postData ? postData.data.userid : 1;
                try {
                    const response = await axios.get(`http://localhost:3001/user/${userId}`);
                    if (response.status == 200) {
                        console.log("get data user", response.data);
                        await setUserPost(response.data);
                        setLoading(false);
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleSave = async () => {
        try {
            const res = await axios.post("http://localhost:3001/save", {
                userid: userLogin.userData.userid,
                postid: postData.data.postid,
            });
            if (res.status == 200) {
                console.log(res);
                message.success(res.data.message ? res.data.message : "Đã lưu!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        loading ? <Loading />
            : <div className={styles.pageDetail}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <div className={styles.imgSlider}>
                                <Slider {...settings}>
                                    {
                                        postData.images.map((item, ind) => (
                                            <div key={ind} className={styles.img}>
                                                {/* {console.log("item", item.url)} */}
                                                <img src={item.url.replace(/'/g, "")} alt="item-detail" width="100%" height="100%" />
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                            <div className={styles.description}>
                                <Row>
                                    <Col span={12}>
                                        <h2 className={styles.title}>{postData.data.title}</h2>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            style={{ float: 'right' }}
                                            icon={<HeartOutlined />}
                                            className={styles.btnHeard}
                                            onClick={handleSave}
                                        >LƯU TIN</Button>
                                    </Col>

                                </Row>
                                <Row className={styles.topDes}>
                                    <Col sx={24} sm={24} md={12} lg={12}>
                                        <div className={styles.topDesLeft}>
                                            <div className={styles.locate}>
                                                <EnvironmentOutlined style={{ marginRight: '10px' }} />
                                                {postData.data.address + ", " + postData.data.ward + ", " + postData.data.city}
                                            </div>
                                            <div >
                                                <DollarOutlined style={{ marginRight: '10px' }} />
                                                <span className={styles.price}>{new Intl.NumberFormat().format(postData.data.price)}</span>
                                                {"  đ/tháng"}
                                            </div>
                                            <div>
                                                <TagsOutlined style={{ marginRight: '10px' }} />
                                                {"Giá dịch vụ"}
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            <div className={styles.subPrice}>
                                                <div>{"+ Giá điện"}</div>
                                                <div>{postData.data.electricity}{" đ/số"}</div>
                                            </div>
                                            <div className={styles.subPrice}>
                                                <div>{"+ Giá nước"}</div>
                                                <div>{postData.data.water}{" đ/số"}</div>
                                            </div>
                                            <div className={styles.subPrice}>
                                                <div>{"+ Giá wifi"}</div>
                                                <div>{postData.data.wifi}{" đ/phòng"}</div>
                                            </div>
                                            <div className={styles.subPrice}>
                                                <div>{"+ Giá gửi xe"}</div>
                                                <div>{postData.data.ultility}</div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sx={24} sm={24} md={12} lg={12}>
                                        <div className={styles.topDesRight}>
                                            <div></div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div>Đánh giá</div>
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    defaultValue={4.5}
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#faad14',
                                                    }}
                                                />
                                                <div>
                                                    {`${4.5}/5 của ${5} đánh giá`}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={styles.detailDes}>
                                    <h3>MÔ TẢ CHI TIẾT</h3>
                                    <div>Trạng thái: {postData.data.rented ? " Đã cho thuê" : " Chưa có người thuê"}</div>
                                    <br />
                                    <div>{postData.data.description}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <h2
                                style={{
                                    margin: '20px',
                                    color: '#f5a70a',
                                    borderBottom: '1px solid #d9d9d9'
                                }}
                            >
                                <WhatsAppOutlined style={{ marginRight: '10px' }} />
                                <span>{"THÔNG TIN CHỦ NHÀ"}</span>
                            </h2>
                            <div className={styles.rightCard}>
                                <div className={styles.user}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar size="large" src={userPost.userData.avatar} />
                                        <div className={styles.username}>{userPost.userData.username}</div>
                                    </div>
                                    <Link to={`/xem-trang-ca-nhan/${userPost.userData.userid}`}>
                                        <Button className={styles.btnOutline}>Xem trang</Button>
                                    </Link>
                                </div>
                                <div className={styles.btn}>
                                    <Button className={styles.button1} icon={<PhoneOutlined />}>LIÊN HỆ</Button>
                                </div>
                                <div className={styles.btn}>
                                    <Button className={styles.button2}>ĐẶT LỊCH XEM PHÒNG</Button>
                                </div>
                                <br /><br />
                                <div>
                                    <img src={banner_quangcao1} alt="quang-cao" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default PageDetail;