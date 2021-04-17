import React from 'react';
import {
    Link,
} from 'react-router-dom';

import { Menu, Input } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import './Header.css';

import logo from '../../img/logo.png';
import user from '../../img/user.png';

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <div className="logo">
                            <Link to="/">
                                <img src={logo} alt="logo-room-for-you" width={80} />
                            </Link>
                            {/* <div className="logo-title">RFY</div> */}
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
                                <Menu.Item key="2">
                                    <Link to="/">
                                        PHÒNG TRỌ SINH VIÊN
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/">
                                        TRUNG CƯ MINI
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/">
                                        KÊNH NGƯỜI BÁN
                                </Link>
                                </Menu.Item>
                                <Menu.SubMenu key="sub1" title={<img src={user} alt="avatar" width={32} />}>
                                    <Menu.Item key="5">
                                        <Link to="/login">
                                            <b>Đăng nhập</b>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to="/register">
                                            <b>Đăng ký</b>
                                        </Link>
                                    </Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;