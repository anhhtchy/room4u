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

const Header = () => {
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userData, setUserData] = useState(JSON.parse((window.localStorage.getItem('userData'))));

    useEffect(() => {
        setUserData(JSON.parse(window.localStorage.getItem('userData')));
        console.log("header user data", userData);
    }, []);

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

    const handleLogout = () => {
        window.localStorage.removeItem('userData');
        window.location.reload();
        history.push("/");
    }

    const handleUserType = () => {
        userData && userData.userData.usertype ? history.push("/kenh-chu-nha") : history.push("/trang-ca-nhan");
    }

    const handleUserType1 = () => {
        userData && userData.userData.usertype ? history.push("/kenh-chu-nha") : setIsModalVisible(true);;
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
                                    TRANG CHỦ
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu key="sub1" title={<span>{`THỂ LOẠI PHÒNG `} <b><DownOutlined /></b></span>}>
                                <Menu.Item key="2">
                                    <Link to="/phong-tro-sv">
                                        <b>Phòng trọ sinh viên</b>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/chung-cu">
                                        <b>Chung cư</b>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/chung-cu-mini">
                                        <b>Văn phòng - Mặt bằng kinh doanh</b>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/nha-nguyen-can">
                                        <b>Nhà nguyên căn</b>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            {/* <Menu.Item key="2">
                                    <Link to="/phong-tro-sv">
                                        PHÒNG TRỌ SINH VIÊN
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/chung-cu-mini">
                                        CHUNG CƯ MINI
                                </Link>
                                </Menu.Item> */}
                            <Menu.Item key="6" onClick={handleUserType1}>
                                <Link>
                                    KÊNH CHỦ NHÀ
                                </Link>
                            </Menu.Item>
                            <Modal title="Bạn không phải chủ nhà" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <p>Đăng ký tài khoản với vai trò chủ nhà?</p>
                            </Modal>
                            <Menu.SubMenu
                                key="sub2"
                                title={
                                    <>
                                        <img src={user} alt="avatar" width={32} style={{ marginRight: '8px' }} />
                                        <span style={{ color: '#fafafa' }}>{userData && userData.userData.username}</span>
                                    </>
                                }>
                                {userData && <Menu.Item key="14">
                                    <Link to="/" onClick={handleLogout}>
                                        <b>Đăng xuất</b>
                                    </Link>
                                </Menu.Item>
                                }
                                {
                                    !userData && <>
                                        <Menu.Item key="7">
                                            <Link to="/login">
                                                <b>Đăng nhập</b>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="8">
                                            <Link to="/register">
                                                <b>Đăng ký</b>
                                            </Link>
                                        </Menu.Item>
                                    </>
                                }
                                <Menu.Item key="9" onClick={handleUserType}>
                                    <Link>
                                        <b>Trang cá nhân</b>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="search">
                {/* <Input.Search
                        placeholder="Tìm kiếm phòng bạn muốn..."
                        allowClear
                        // onSearch={onSearch}
                        style={{ maxWidth: 320 }}
                        size="large"
                    /> */}
                    Lưu ý: chạy backend trước khi chạy frontend
                </div>

        </div>
    )
}

export default Header;