import React, { useState, useEffect } from 'react';
import axios from "axios";
import { estate } from "../../../constants/ActionType";
import { estateLink } from "../../../constants/ActionType";

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
    Pagination,
} from 'antd';

import {
    EditOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

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
    const [fileList, setFileList] = useState([]);
    const [visibleImg, setVisibleImg] = useState(false);
    const [srcPre, setSrcPre] = useState();
    const [userData, setUserData] = useState(JSON.parse((window.localStorage.getItem('userData'))));
    const [userSave, setUserSave] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1);

    useEffect(() => {
        (async () => {
            await setUserData(JSON.parse(window.localStorage.getItem('userData')));
            console.log("user id", userData.userData.userid);
            if (userData) {
                try {
                    const res = await axios.get(`http://localhost:3001/save/${userData.userData.userid}`, {

                    });
                    if (res.status == 200) {
                        console.log("save", res.data);
                        setUserSave(res.data);
                    } else {
                        console.log("save", res)
                    }

                } catch (err) {
                    console.log("err mes:", err);
                }
            }
        })();
    }, []);

    const handleChangePage = (page) => {
        console.log(page);
        setStart(page-1);
        setEnd(page);
    }

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Phòng trọ đã lưu <span style={{ fontSize: '20px', color: '#52c41a' }}>{`${userSave.length}`} tin đã lưu</span></div>
                {/* <Button
                    className={styles.button}
                    icon={<PlusCircleOutlined />}
                    onClick={showModal}
                >Đăng tin mới</Button> */}
            </div>
            <div className={styles.content}>
                <Row gutter={[32, 32]}>
                    {userSave ? userSave.slice(start*3, end*3).map((item, idx) => (
                        <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                            <Link to={`/${estateLink[item.post.estatetype]}/${item.post.postid}-${item.post.title}`}>
                                <Item
                                    // img={item.images[0]}
                                    img={img}
                                    type={estate[item.post.estatetype]}
                                    title={`${item.post.title}`}
                                    location={`${item.post.address} - ${item.post.ward} - ${item.post.city}`}
                                    rating={4.5}
                                    price={item.post.price}
                                    square={item.post.area}
                                    count_room={item.post.roomnum}
                                />
                            </Link>
                        </Col>
                    )) : <div>Chưa có bài viết nào được lưu</div>}
                </Row>
            </div>

            <Pagination
                defaultCurrent={1}
                defaultPageSize={3}
                total={userSave.length}
                responsive={true}
                style={{ textAlign: 'right' }}
                onChange={handleChangePage}
            />
        </div>
    )
} 

export default Tab2;