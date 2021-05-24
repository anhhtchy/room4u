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
import Loading from '../../loading';

const { Option } = Select;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await setUserData(JSON.parse(window.localStorage.getItem('userData')));
            console.log("user id", userData.userData.userid);
            const userId = userData.userData.userid.toString();
            if (userData) {
                try {
                    const res = await axios.get(`http://localhost:3001/save/${userId}`);
                    if (res.status == 200) {
                        console.log("save", res.data);
                        setUserSave(res.data.posts);
                        setLoading(false);
                    } else {
                        console.log("save", res);
                        setLoading(false);
                    }

                } catch (err) {
                    console.log("err mes:", err);
                    setLoading(false);
                }
            }
        })();
    }, []);

    const handleChangePage = (page) => {
        console.log(page);
        setStart(page - 1);
        setEnd(page);
    }

    return (
        <div className={styles.tab}>
            <div className={styles.tabTitle}>
                <div>Phòng trọ đã lưu <span style={{ fontSize: '20px', color: '#52c41a' }}>{`${userSave.length ? userSave.length : 0}`} tin đã lưu</span></div>
            </div>
            {loading ? <Loading /> :
                <div className={styles.content}>
                    {userSave.length ? (userSave.length > 2 ? (
                        <Row gutter={[32, 32]}>
                            {userSave.slice(start * 6, end * 6).map((item, idx) => (
                                <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                    <Item
                                        postid={item.post.postid}
                                        img={item.images[0]}
                                        type={estate[item.post.estatetype]}
                                        title={`${item.post.title}`}
                                        location={`${item.post.address} - ${item.post.ward} - ${item.post.city}`}
                                        rating={4.5}
                                        price={item.post.price}
                                        square={item.post.area}
                                        count_room={item.post.roomnum}
                                        description={item.post.description}
                                        estatetype={item.post.estatetype}
                                        district={item.post.district}
                                        address={item.post.address}
                                        electricity={item.post.electricity}
                                        water={item.post.water}
                                        wifi={item.post.wifi}
                                        ultility={item.post.ultility}
                                        images={item.images}
                                    />
                                </Col>))}
                        </Row>
                    ) : userSave.map((item, idx) => (
                        <div style={{ width: '32%', marginRight: '3%' }}>
                            <Item
                                postid={item.post.postid}
                                img={item.images[0]}
                                type={estate[item.post.estatetype]}
                                title={`${item.post.title}`}
                                location={`${item.post.address} - ${item.post.ward} - ${item.post.city}`}
                                rating={4.5}
                                price={item.post.price}
                                square={item.post.area}
                                count_room={item.post.roomnum}
                                description={item.post.description}
                                estatetype={item.post.estatetype}
                                district={item.post.district}
                                address={item.post.address}
                                electricity={item.post.electricity}
                                water={item.post.water}
                                wifi={item.post.wifi}
                                ultility={item.post.ultility}
                                images={item.images}
                            />
                        </div>
                    ))
                    ) : <div>Bạn chưa lưu bài viết nào.</div>
                    }
                </div>
            }
            
            <Pagination
                defaultCurrent={1}
                defaultPageSize={6}
                total={userSave.length}
                responsive={true}
                style={{ textAlign: 'right' }}
                onChange={handleChangePage}
            />
        </div>
    )
}

export default Tab2;