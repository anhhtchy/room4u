import React from 'react';
import { Avatar, Button, Row, Col, Rate } from 'antd';
import {
    PhoneOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    HeartOutlined,
    TagsOutlined,
    WhatsAppOutlined,

} from '@ant-design/icons';

import Slider from "react-slick";

import styles from './PageDetail.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../components/Homepage/style.css';

import item1 from '../../img/item1.jpg';
import item2 from '../../img/item2.jpg';
import img from '../../img/img.jpg';
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';
import avatar from '../../img/hello.jpg';
import location_icon from '../../img/location_icon.png';

const mockData = {
    id: 1,
    name: 'name1',
    img: [img3, item1, img, img1, img2, item2],
    type: 'CHUNG CƯ MINI',
    title: 'Số 80, ngõ 317 Tây Sơn',
    location: 'Ngã Tư Sở, Đống Đa, Hà Nội',
    rating: 4.5,
    count_rating: '10',
    price: 4500000,
    square: '40',
    count_rat_room: '8',
    elect_price: 3200,
    water_price: 20000,
    wifi_price: 80000,
    packing_price: 'free',
    description: `Tòa nhà mã số CG014 thiết kế cao 7 tầng. Tầng 1 là khu để xe, từ tầng 1 - 7 được chia thành 17 phòng ngủ khép kín, tầng thượng có khu phơi đồ và máy giặt chung miễn phí cho các hộ dân.
    Các căn phòng thiết kế sang trọng với đầy đủ nội thất, trang trí tranh phong cảnh, phòng có cửa chính, cửa sổ thoáng mát.

    ✶ Diện tích căn phòng: Phòng 1 ngủ từ 15 - 25m2.
    ✶ Nội thất cơ bản gồm: Điều hòa, nóng lạnh, giường ngủ, bàn ghế ngồi, tủ quần áo, bàn bếp, chậu rửa, rèm cửa.
    ✶ Chi phí điện nước: Áp dụng tính giá nhà nước (tiêu chuẩn nhà nước).
    ✶ An ninh tòa nhà: Camera theo dõi 24h; Khóa vân tay bảo mật.
    ✶ Tiện ích tòa nhà: Khu để xe miễn phí; Mát giặt chung miễn phí; Khu phơi đồ chung miễn phí; Tự do đi lại 24h, không chung chủ.
    ✶ Thủ tục - giấy tờ: Hợp đồng thuê nhà, hợp đồng đặt cọc, thủ tục đăng ký tạm trú tạm vắng,... Đội ngũ Bản Đôn sẽ hỗ trợ khách hàng hoàn thành tất cả.
    
    Phòng trọ phù hợp dành cho sinh viên, các hộ gia đình, người đi làm.`,
}


const PageDetail = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className={styles.pageDetail}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.imgSlider}>
                            <Slider {...settings}>
                                {
                                    mockData.img.map((item, ind) => (
                                        <div key={ind} className={styles.img}>
                                            <img src={item} alt="item-detail" width="100%" />
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                        <div className={styles.description}>
                            <Row>
                                <Col span={12}>
                                    <h2 className={styles.title}>{mockData.title}</h2>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        style={{ float: 'right' }}
                                        icon={<HeartOutlined />}
                                        className={styles.btnHeard}
                                    >LƯU TIN</Button>
                                </Col>

                            </Row>
                            <Row className={styles.topDes}>
                                <Col sx={24} sm={24} md={12} lg={12}>
                                    <div className={styles.topDesLeft}>
                                        <div className={styles.locate}>
                                            <EnvironmentOutlined style={{ marginRight: '10px' }} />
                                            {mockData.location}
                                        </div>
                                        <div >
                                            <DollarOutlined style={{ marginRight: '10px' }} />
                                            <span className={styles.price}>{new Intl.NumberFormat().format(mockData.price)}</span>
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
                                            <div>{mockData.elect_price}{" đ/số"}</div>
                                        </div>
                                        <div className={styles.subPrice}>
                                            <div>{"+ Giá nước"}</div>
                                            <div>{mockData.water_price}{" đ/số"}</div>
                                        </div>
                                        <div className={styles.subPrice}>
                                            <div>{"+ Giá wifi"}</div>
                                            <div>{mockData.wifi_price}{" đ/phòng"}</div>
                                        </div>
                                        <div className={styles.subPrice}>
                                            <div>{"+ Giá gửi xe"}</div>
                                            <div>{mockData.packing_price}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col sx={24} sm={24} md={12} lg={12}>
                                    <div className={styles.topDesRight}>
                                        <div></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div>Đánh giá</div>
                                            <Rate
                                                allowHalf
                                                disabled
                                                defaultValue={mockData.rating}
                                            />
                                            <div>
                                                {`${mockData.rating}/5 của ${mockData.count_rat_room} đánh giá`}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className={styles.detailDes}>
                                <h3>MÔ TẢ CHI TIẾT</h3>
                                <div>{mockData.description}</div>
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
                                    <Avatar size="large" src={avatar} />
                                    <div className={styles.username}>User Name</div>
                                </div>
                                <Button className={styles.btnOutline}>Xem trang</Button>
                            </div>
                            <div className={styles.btn}>
                                <Button className={styles.button1} icon={<PhoneOutlined />}>LIÊN HỆ</Button>
                            </div>
                            <div className={styles.btn}>
                                <Button className={styles.button2}>ĐẶT LỊCH XEM PHÒNG</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageDetail;