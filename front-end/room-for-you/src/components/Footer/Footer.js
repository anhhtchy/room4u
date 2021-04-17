import React from 'react';
import { Row, Col } from 'antd';

import styles from './Footer.module.css';

import ic_fb from '../../img/facebook.svg';
import ic_tw from '../../img/twitter.svg';
import ic_yt from '../../img/youtube.svg';
import ic_in from '../../img/linkedin.svg';

class Footer extends React.Component {
    render() {
        return (
            <div className={styles.footer}>
                <div className={styles.topFooter}>
                    <div className={styles.containerFooter}>
                        <Row gutter={[32, 32]}>
                            <Col xs={24} sm={24} md={8} lg={8} >
                                <div className={styles.footerContent}>
                                    <div><b>Liên hệ</b></div>
                                    <div>Email: nhom16@chuyende.com</div>
                                    <div>SĐT: 18001009</div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <div className={styles.footerContent}>
                                    <div>Địa chỉ:</div>
                                    <div>Tòa nhà B1 - Đại học Bách Khoa Hà Nội</div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <div className={styles.footerContent} >
                                    <img src={ic_fb} alt="logo-facebook" width={40} />
                                    <img src={ic_tw} alt="logo-twitter" width={40} />
                                    <img src={ic_yt} alt="log0-youtube" width={40} />
                                    <img src={ic_in} alt="logo-linkedin" width={40} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={styles.bottomFooter}>
                    <div className={styles.containerFooter}>
                        <div style={{ textAlign: 'center' }}>Bản quyền thuộc về nhóm 16 - Chuyên đề 20202</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;