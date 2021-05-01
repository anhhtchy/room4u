import React from 'react';
import axios from 'axios';
import CarouselTop from './components/CarouselTop';
import Item from './components/Item';
import styles from './Home.module.css';
import {
    Input,
    Checkbox,
    Radio,
    InputNumber,
    Button,
    Row,
    Col
} from 'antd';
import filter from '../../img/filter.png';
import item1 from '../../img/item1.jpg';
import item2 from '../../img/item2.jpg';
import img from '../../img/img.jpg';
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';
import { Link } from 'react-router-dom';

const mockData = [
    {
        id: 1,
        name: 'name1',
        img: [item1, img, img1, img2, img3],
        type: 'CHUNG CƯ MINI',
        title: 'Số 80, ngõ 317 Tây Sơn',
        location: 'Ngã Tư Sở, Đống Đa, Hà Nội',
        rating: 4.5,
        count_rating: '10',
        price: 4500000,
        square: '40',
        count_room: '2',
    },
    {
        id: 2,
        name: 'name2',
        img: [img, item2, img1, img2, img3],
        type: 'CHUNG CƯ MINI',
        title: 'Số 80, ngõ 317 Tây Sơn',
        location: 'Ngã Tư Sở, Đống Đa, Hà Nội',
        rating: 2.5,
        count_rating: '10',
        price: 6500000,
        square: '40',
        count_room: '2',
    },
    {
        id: 3,
        name: 'name3',
        img: [img1, item1, img, img2, img3],
        type: 'CHUNG CƯ MINI',
        title: 'Số 80, ngõ 317 Tây Sơn',
        location: 'Ngã Tư Sở, Đống Đa, Hà Nội',
        rating: 4.0,
        count_rating: '10',
        price: 4000000,
        square: '40',
        count_room: '2',
    },
    {
        id: 4,
        name: 'name4',
        img: [img2, item1, img, img1, img3],
        type: 'CHUNG CƯ MINI',
        title: 'Số 80, ngõ 317 Tây Sơn',
        location: 'Ngã Tư Sở, Đống Đa, Hà Nội',
        rating: 3.0,
        count_rating: '10',
        price: 4500000,
        square: '40',
        count_room: '2',
    },
    {
        id: 5,
        name: 'name5',
        img: [img3, item2, img, img1, img2],
        type: 'CHUNG CƯ MINI',
        title: 'Số 80, ngõ 317 Tây Sơn',
        location: 'Ngã Tư Sở, Đống Đa, Hà Nội',
        rating: 5.0,
        count_rating: '10',
        price: 5500000,
        square: '40',
        count_room: '2',
    },
]

const Home = () => {
    const [estateType, setEstateType] = React.useState();
    const [district, setDistrict] = React.useState();
    const [area, setArea] = React.useState();
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState("");

    const chooseDistrict = (checkedValues) => {
        console.log('select checked = ', checkedValues);
        setDistrict(checkedValues);
    }

    const chooseArea = e => {
        console.log('radio checked', e.target.value);
        setArea(e.target.value);
    };

    const onChangeMinPrice = (value) => {
        console.log("minPrice", value);
        setMinPrice(value);
    }

    const onChangeMaxPrice = (value) => {
        console.log("maxPrice", value);
        setMaxPrice(value);
    }

    const onFilter = async () => {
        const values = {
            district: district,
            area: area,
            minPrice: minPrice,
            maxPrice: maxPrice,
        }

        console.log(values);

        try {
            const response = await axios.post('http://localhost:3001/search', {
                area: area,
            });
            console.log("res", response);
        } catch (error) {
            console.error("err", error);
        }
    }

    return (
        <div className={styles.home}>
            <div className={styles.container}>
                {/* <div className={styles.search}>
                    <Input.Search
                        placeholder="Tìm kiếm phòng bạn muốn..."
                        allowClear
                        // onSearch={onSearch}
                        className={styles.inputSearch}
                        size="large"
                    />
                </div> */}
                <CarouselTop />
                <div className={styles.body}>
                    <div className={styles.leftCard}>
                        <div className={styles.leftTitle}>
                            <img src={filter} alt="filter" width={24} style={{ marginRight: '10px' }} />
                            BỘ LỌC TÌM KIẾM
                        </div>
                        <div className={styles.leftSubtitle}>
                            Khu vực
                        </div>
                        <div>
                            <Checkbox.Group onChange={chooseDistrict} className={styles.checkedboxGroup}>
                                <Checkbox className={styles.checkedboxStyle} value="001">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="002">Quận Ba Đình</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="003">Quận Hoàng Mai</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="004">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="005">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="006">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="007">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="008">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="009">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="010">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="012">Quận Hai Bà Trưng</Checkbox>
                                <Checkbox className={styles.checkedboxStyle} value="013">Quận Hai Bà Trưng</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div className={styles.borderFilter} ></div>
                        <div className={styles.leftSubtitle}>
                            Diện tích
                        </div>
                        <div className={styles.radioGroup}>
                            <Radio.Group onChange={chooseArea} value={area}>
                                <Radio className={styles.radioStyle} value={1}>{"< 20m"}<sup>2</sup></Radio>
                                <Radio className={styles.radioStyle} value={2}>20m<sup>2</sup> - 50m<sup>2</sup></Radio>
                                <Radio className={styles.radioStyle} value={3}>50m<sup>2</sup> - 100m<sup>2</sup></Radio>
                                <Radio className={styles.radioStyle} value={4}>100m<sup>2</sup> - 200m<sup>2</sup></Radio>
                                <Radio className={styles.radioStyle} value={4}>{"> 200m"}<sup>2</sup></Radio>
                            </Radio.Group>
                        </div>
                        <div className={styles.borderFilter} ></div>
                        <div className={styles.leftSubtitle}>
                            Khoảng giá
                        </div>
                        <div className={styles.price}>
                            <InputNumber
                                size="large"
                                defaultValue={0}
                                onChange={onChangeMinPrice}
                                style={{ marginRight: '10px' }}
                            />
                            {" - "}
                            <InputNumber
                                size="large"
                                defaultValue={0}
                                onChange={onChangeMaxPrice}
                                style={{ marginLeft: '10px' }}
                            />
                        </div>
                        <div className={styles.btnApply}>
                            <Button className={styles.button} onClick={onFilter}>ÁP DỤNG</Button>
                        </div>
                    </div>
                    <div className={styles.rightCard}>
                        <div className={styles.subGroup}>
                            <div className={styles.rightTitle}>
                                <Link to="/phong-tro-sv">PHÒNG TRỌ SINH VIÊN</Link>
                            </div>
                            <Row gutter={[32, 32]}>
                                {
                                    mockData.slice(0, 3).map((item, idx) => (
                                        <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                            <Link to={`/phong-tro-sv/${item.id}-${item.name}`}>
                                                <Item
                                                    img={item.img[0]}
                                                    type={item.type}
                                                    title={item.title}
                                                    location={item.location}
                                                    rating={item.rating}
                                                    price={item.price}
                                                    square={item.square}
                                                    count_room={item.count_room}
                                                />
                                            </Link>
                                        </Col>
                                    ))
                                }
                            </Row>
                            <div className={styles.seeMore}><i><Link to="/phong-tro-sv">Xem thêm</Link></i></div>
                        </div>
                        <div className={styles.borderFilter}></div>
                        <div className={styles.subGroup}>
                            <div className={styles.rightTitle}>
                                <Link to="/chung-cu-mini">CHUNG CƯ MINI</Link>
                            </div>
                            <Row gutter={[32, 32]}>
                                {
                                    mockData.slice(0, 3).map((item, idx) => (
                                        <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                            <Link to={`/chung-cu-mini/${item.id}-${item.name}`}>
                                                <Item
                                                    img={item.img[0]}
                                                    type={item.type}
                                                    title={item.title}
                                                    location={item.location}
                                                    rating={item.rating}
                                                    price={item.price}
                                                    square={item.square}
                                                    count_room={item.count_room}
                                                />
                                            </Link>
                                        </Col>
                                    ))
                                }
                            </Row>
                            <div className={styles.seeMore}><i><Link to="/chung-cu-mini">Xem thêm</Link></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Home;