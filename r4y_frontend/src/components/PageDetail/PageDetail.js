import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Avatar, Button, Row, Col, Rate, message, notification } from 'antd';
import {
    PhoneOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    HeartOutlined,
    TagsOutlined,
    WhatsAppOutlined,
    YahooFilled,
} from '@ant-design/icons';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Slider from "react-slick";

import styles from './PageDetail.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../components/Homepage/style.css';

import axios from 'axios';
import Loading from '../loading';
import banner_quangcao1 from '../../img/banner_quangcao2.jpg';
import Modal from 'antd/lib/modal/Modal';

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
    const [ratingValue, setRatingValue] = useState();
    const [visibleModalRating, setVisibleModalRating] = useState(false);
    const [ratingAve, setRatingAve] = useState();
    const [textBtn, setTextBtn] = useState(true);
    const [visibleCancelRating, setVisibleCancelRating] = useState(false);
    const [isRating, setIsRating] = useState();
    const [commentText, setCommentText] = useState();
    const [listComment, setListComment] = useState();
    const [visibleModalUpdateComment, setVisibleModalUpdateComment] = useState(false);

    const userLogin = JSON.parse((window.localStorage.getItem('userData')));

    const params = useParams();
    const history = useHistory();

    useEffect(async () => {
        console.log("params", params);
        getPostData();
        getAverageRatings();
        getListComment();
        checkRating();
    }, []);

    const getListComment = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/comments/${params.id}`);
            if (res.status == 200) {
                console.log(res);
                setListComment(res.data.comments);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const checkRating = async () => {
        if (userLogin) {
            try {
                const res = await axios.get(`http://localhost:3001/rating/${userLogin.userData.userid}&${params.id}`);
                if (res.status == 200) {
                    console.log(res);
                    setIsRating(res.data);
                    setTextBtn(res.data.rating);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setTextBtn(false);
        }
    }

    const getAverageRatings = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/ratings/average/${params.id}`);
            if (res.status == 200) {
                console.log(res);
                setRatingAve(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getPostData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/getPost/${params.id}`);
            if (res.status == 200) {
                console.log("get post data", res.data.data.userid);
                await setPostData(res.data);
                try {
                    const userId = await res.data.data.userid;
                    const response = await axios.get(`http://localhost:3001/user/${userId}`);
                    if (response.status == 200) {
                        console.log("get data user", response);
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
    };

    const handleSave = async () => {
        if (!window.localStorage.getItem('userData')) {
            message.error("Bạn chưa đăng nhập!")
            history.push("/login");
        }

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

    const handleRating = async () => {
        try {
            const res = await axios.post("http://localhost:3001/ratings/create", {
                userid: userLogin.userData.userid,
                postid: postData.data.postid,
                rating: ratingValue,
            });
            if (res.status == 200) {
                message.success("Cảm ơn bạn đã gửi đánh giá!");
                setVisibleModalRating(false);
                setTextBtn(false);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            message.error("ERROR!");
        }
    }

    const handleDeleteRating = async () => {
        try {
            const res = await axios.delete(`http://localhost:3001/ratings/delete/${isRating.ratingid}`);
            if (res.status == 200) {
                message.success("Đánh giá của bạn đã được xóa!");
                setVisibleCancelRating(false);
                setTextBtn(true);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            message.error("ERROR!");
        }
    }

    const handleOpenModal = () => {
        if (!textBtn) {
            setVisibleModalRating(true);
        } else {
            setVisibleCancelRating(true);
        }
    }

    const handleSendComment = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/comments/create`, {
                userid: userLogin.userData.userid,
                postid: postData.data.postid,
                comment: commentText,
            });
            if (res.status == 200) {
                console.log(res);
                message.success("Đã gửi bình luận!");
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            message.error("ERROR!");
        }
    }

    const handleDeleteComment = async (commentid, userid) => {
        if (!userLogin) {
            message.error("Bạn không thể xóa bình luận này!");
        } else if (userLogin.userData.userid != userid) {
            message.error("Bạn không thể xóa bình luận này!");
        } else {
            try {
                const res = await axios.delete(`http://localhost:3001/comments/delete/${commentid}`);
                if (res.status == 200) {
                    message.success("Bình luận đã được xóa!");
                    window.location.reload();
                }
            } catch (err) {
                console.log(err);
                message.error("ERROR!");
            }
        }
    }

    const handleUpdateComment = async (commentid, userid) => {
        try {
            const res = await axios.put(`http://localhost:3001/comments/update/`, {
                commentid: commentid,
                comment: commentText,
            });
            if (res.status == 200) {
                console.log("update comment", res);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            notification.error("ERROR!");
        }

    }

    const openModalUpdateComment = async (userid) => {
        if (!userLogin) {
            message.error("Bạn không thể xóa bình luận này!");
        } else if (userLogin.userData.userid != userid) {
            message.error("Bạn không thể xóa bình luận này!");
        } else {
            setVisibleModalUpdateComment(true);
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
                                            <br />
                                            <div style={{ textAlign: 'center' }}>
                                                <div>Đánh giá</div>
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    defaultValue={ratingAve.averageRating}
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#faad14',
                                                    }}
                                                />
                                                <div>
                                                    {`${ratingAve.averageRating}/5 của ${ratingAve.nRatings} người đánh giá`}
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}

                                            onClick={handleOpenModal}
                                        >
                                            <Button
                                                className={styles.button2}
                                                style={{ width: '55%' }}
                                            >
                                                {!textBtn ? "Đánh giá ngay" : "Xóa đánh giá"}
                                            </Button>
                                        </div>

                                        <Modal
                                            visible={visibleModalRating}
                                            onCancel={() => setVisibleModalRating(false)}
                                            footer={null}
                                            width={360}
                                        >
                                            <div className={styles.ratingModal}>
                                                <Rate
                                                    allowHalf
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#faad14',
                                                    }}
                                                    value={ratingValue}
                                                    onChange={(value) => setRatingValue(value)}
                                                />
                                                <br />
                                                <Button
                                                    className={styles.button2}
                                                    style={{ width: '50%', marginTop: '50px' }}
                                                    onClick={handleRating}
                                                >XONG</Button>
                                            </div>
                                        </Modal>

                                        <Modal
                                            visible={visibleCancelRating}
                                            onCancel={() => setVisibleCancelRating(false)}
                                            footer={null}
                                            width={360}
                                        >
                                            <div className={styles.ratingModal}>
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#faad14',
                                                    }}
                                                    defaultValue={isRating ? isRating.rating : 0}
                                                />
                                                <br />
                                                <Button
                                                    className={styles.button2}
                                                    style={{ width: '50%', marginTop: '50px' }}
                                                    onClick={handleDeleteRating}
                                                >XÓA</Button>
                                            </div>
                                        </Modal>
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

                    <div className={styles.comment}>
                        <div className={styles.title}>BÌNH LUẬN</div>
                        <br />
                        <div className={styles.commentBody}>
                            {!userLogin ?
                                <div style={{ textAlign: 'center', color: "#bfbfbf" }}>
                                    Đăng nhập để bình luận bài viết
                            </div>
                                :
                                <div className={styles.inputComment}>
                                    <input
                                        type="text"
                                        placeholder="Nhập bình luận ..."
                                        className={styles.input}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <Button
                                        className={styles.button2}
                                        style={{ width: "100px" }}
                                        onClick={handleSendComment}
                                    >GỬI</Button>
                                </div>
                            }
                            <br />
                            <div className={styles.listComment}>
                                {!listComment ? <div className={styles.oneComment}>Chưa có bình luận nào</div>
                                    : listComment.map((item, ind) => (
                                        <div className={styles.oneComment} key={ind}>
                                            <div className={styles.oneCommentLeft}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar size="large" src={item.avatar} />
                                                    <Link to={`/xem-trang-ca-nhan/${item.userid}`} style={{ color: '#000000' }}>
                                                        <div className={styles.username}>{item.username}</div>
                                                    </Link>
                                                </div>
                                                <div className={styles.textComment}>
                                                    {item.comment}
                                                </div>
                                                <div style={{ textAlign: 'left', fontSize: '12px', color: "#bfbfbf" }}>
                                                    {moment(item.updated).format('LLLL')}
                                                </div>
                                            </div>
                                            <div className={styles.oneCommentRight}>
                                                <Button
                                                    className={styles.btnOutline}
                                                    onClick={() => handleDeleteComment(item.commentid, item.userid)}
                                                >Xóa</Button>
                                                <Button
                                                    className={styles.btnOutline}
                                                    style={{ marginLeft: '20px' }}
                                                    onClick={() => openModalUpdateComment(item.userid)}
                                                >Chỉnh sửa</Button>
                                            </div>
                                            <Modal
                                                visible={visibleModalUpdateComment}
                                                onCancel={() => setVisibleModalUpdateComment(false)}
                                                footer={null}
                                                width={600}
                                            >
                                                <div className={styles.inputComment} style={{ display: 'flex', flexDirection: "column" }}>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập bình luận ..."
                                                        className={styles.input}
                                                        style={{ width: '95%' }}
                                                        onChange={(e) => setCommentText(e.target.value)}
                                                    />
                                                    <br />
                                                    <Button
                                                        className={styles.button2}
                                                        style={{ width: "100px" }}
                                                        onClick={() => handleUpdateComment(item.commentid, item.userid)}
                                                    >GỬI</Button>
                                                </div>
                                            </Modal>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default PageDetail;