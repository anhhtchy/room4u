import React from 'react';
import {
    Link,
} from 'react-router-dom';

import { Menu, Input } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

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
                                <Menu.Item key="6">
                                    <Link to="/kenh-chu-nha">
                                        KÊNH CHỦ NHÀ
                                </Link>
                                </Menu.Item>
                                <Menu.SubMenu key="sub2" title={<img src={user} alt="avatar" width={32} />}>
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
                                    <Menu.Item key="9">
                                        <Link to="/trang-ca-nhan">
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
}

export default Header;