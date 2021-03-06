import React, { useEffect, useState } from 'react';
import {
    Link, useHistory,
} from 'react-router-dom';

import { Menu, Input } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

import './Header.css';

import logo from '../../img/logo.png';
import user from '../../img/user.png';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import Avatar from 'antd/lib/avatar/avatar';

const Header = () => {
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [userData, setUserData] = useState(JSON.parse((window.localStorage.getItem('userData'))));

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        history.push("/register");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // const handleOk1 = () => {
    //     setIsModalVisible1(false);
    //     history.push("/login");
    // };

    // const handleCancel1 = () => {
    //     setIsModalVisible1(false);
    // };

    const handleLogout = () => {
        window.localStorage.removeItem('userData');
        history.push("/");
        window.location.reload();
    }

    const handleUserType1 = () => {
        if (userData) {
            history.push("/trang-ca-nhan");
        } else {
            history.push("/login");
        }
    }

    const handleUserType = () => {
        if (userData) {
            userData.userData.usertype ? setIsModalVisible(true) : history.push("/kenh-chu-nha");
        } else {
            setIsModalVisible(true);
        }
    }

    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo-room-for-you" width={60} />
                        </Link>
                        <div className="logo-title">Room For You</div>
                    </div>
                    <div >
                        <Menu
                            className="menu"
                            mode="horizontal"
                            overflowedIndicator={<MenuOutlined />}
                        >
                            <Menu.Item key="1">
                                <Link to="/">
                                    TRANG CH???
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu key="sub1" title={<span>{`TH??? LO???I PH??NG `} <b><DownOutlined /></b></span>}>
                                <Menu.Item key="2">
                                    <Link to="/phong-tro-sv">
                                        <b>Ph??ng tr??? sinh vi??n</b>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/chung-cu">
                                        <b>Chung c??</b>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/chung-cu-mini">
                                        <b>V??n ph??ng - M???t b???ng kinh doanh</b>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/nha-nguyen-can">
                                        <b>Nh?? nguy??n c??n</b>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            {/* <Menu.Item key="2">
                                    <Link to="/phong-tro-sv">
                                        PH??NG TR??? SINH VI??N
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/chung-cu-mini">
                                        CHUNG C?? MINI
                                </Link>
                                </Menu.Item> */}
                            <Menu.Item key="6" onClick={handleUserType}>
                                <Link>
                                    K??NH CH??? NH??
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="20" >
                                <Link to="/admin">
                                    {userData ? userData.userData.usertype == 2 ? "TRANG ADMIN" : '' : ''}
                                </Link>
                            </Menu.Item>

                            <Modal title="B???n kh??ng ph???i ch??? nh??" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <p>????ng k?? t??i kho???n v???i vai tr?? ch??? nh???</p>
                            </Modal>
                            <Menu.SubMenu
                                key="sub2"
                                title={
                                    <>
                                        <Avatar src={user} style={{ marginRight: '8px' }} />
                                        {/* <img src={userData ? userData.userData.avatar : user} alt="avatar" width={32} style={{ marginRight: '8px' }} /> */}
                                        <span style={{ color: '#fafafa' }}>{userData && userData.userData.username}</span>
                                    </>
                                }>
                                {userData && <Menu.Item key="14">
                                    <div onClick={handleLogout}>
                                        <Link>
                                            <b>????ng xu???t</b>
                                        </Link>
                                    </div>
                                </Menu.Item>
                                }
                                {
                                    !userData && <>
                                        <Menu.Item key="7">
                                            <Link to="/login">
                                                <b>????ng nh???p</b>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="8">
                                            <Link to="/register">
                                                <b>????ng k??</b>
                                            </Link>
                                        </Menu.Item>
                                    </>
                                }
                                <Menu.Item key="9" onClick={handleUserType1}>
                                    <Link>
                                        <b>Trang c?? nh??n</b>
                                    </Link>
                                </Menu.Item>
                                {/* <Modal title="B???n ch??a ????ng nh???p" visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1}>
                                    <p>????ng nh???p ngay</p>
                                </Modal> */}
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="search">
                {/* <Input.Search
                        placeholder="T??m ki???m ph??ng b???n mu???n..."
                        allowClear
                        // onSearch={onSearch}
                        style={{ maxWidth: 320 }}
                        size="large"
                    /> */}
                {/* L??u ??: ch???y backend tr?????c khi ch???y frontend */}
            </div>

        </div>
    )
}

export default Header;