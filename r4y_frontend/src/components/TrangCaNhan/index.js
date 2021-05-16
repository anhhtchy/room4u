import React, { useState } from 'react';
import styles from './index.module.css';
import { Menu, Row, Col, Breadcrumb } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    ProfileOutlined,
    DownOutlined,
    DoubleRightOutlined,
} from '@ant-design/icons';

import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';
import Tab3 from './components/Tab3';

const { SubMenu } = Menu;

const TrangCaNhan = () => {
    const [tab1, setTab1] = useState(false);
    const [tab2, setTab2] = useState(true);
    const [tab3, setTab3] = useState(false);

    const chooseTab = (value) => {
        if (value === 1) {
            setTab1(true);
            setTab2(false);
            setTab3(false)
        } else if (value === 2) {
            setTab2(true);
            setTab3(false);
            setTab1(false);
        } else {
            setTab3(true);
            setTab1(false);
            setTab2(false);
        }
    }

    return (
        <div className={styles.container}>
            <Breadcrumb separator={<DoubleRightOutlined style={{ fontSize: '12px' }} />}>
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Trang chủ</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <span>Trang cá nhân</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.top}>
                <HomeOutlined />
                <div className={styles.topTitle}>TRANG CÁ NHÂN</div>
            </div>
            <div className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.leftItem} onClick={() => chooseTab(1)}>
                        <UserOutlined />
                        <div className={styles.leftTitle}>Thông tin cá nhân</div>
                    </div>
                    <div className={styles.leftItem} onClick={() => chooseTab(2)}>
                        <ProfileOutlined />
                        <div className={styles.leftTitle}>Phòng trọ đã lưu</div>
                    </div>
                    <div className={styles.leftItem} onClick={() => chooseTab(3)}>
                        <SettingOutlined />
                        <div className={styles.leftTitle}>Cài đặt</div>
                    </div>
                </div>


                <div className={styles.right}>
                    {
                        tab1 ? <Tab1 /> : tab2 ? <Tab2 /> : <Tab3 />
                    }
                </div>
            </div>
        </div>
    )
}

export default TrangCaNhan;