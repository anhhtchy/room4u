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
                    
                                <img src={logo} alt="logo-room-for-you" width={80} />
                         
                            {/* <div className="logo-title">RFY</div> */}
                        </div>
                        <div >
                            <Menu
                                className="menu"
                                mode="horizontal"
                                overflowedIndicator={<MenuOutlined />}
                            >
                                <Menu.Item key="1">
                                 
                                        TRANG CHỦ
                        
                                </Menu.Item>
                                <Menu.Item key="2">
                                 
                                        PHÒNG TRỌ SINH VIÊN
                        
                                </Menu.Item>
                                <Menu.Item key="3">
                               
                                        TRUNG CƯ MINI
                        
                                </Menu.Item>
                                <Menu.Item key="4">
                                
                                        KÊNH NGƯỜI BÁN
                 
                                </Menu.Item>
                                <Menu.SubMenu key="sub1" title={<img src={user} alt="avatar" width={32} />}>
                                    <Menu.Item key="5">
                            
                                            <b>Đăng nhập</b>
                              
                                    </Menu.Item>
                                    <Menu.Item key="6">
                               
                                            <b>Đăng ký</b>
                           
                                    </Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className="search">
                    <Input.Search
                        placeholder="Tìm kiếm phòng bạn muốn..."
                        allowClear
                        // onSearch={onSearch}
                        style={{ maxWidth: 320 }}
                        size="large"
                    />
                </div>

            </div>
        )
    }
}

export default Header;