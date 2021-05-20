import React, { useEffect } from "react";
import axios from "axios";

import Item from "../Homepage/components/Item";
import styles from "../Homepage/Home.module.css";
import '../Homepage/style.css';

import {
    Input,
    Checkbox,
    Radio,
    InputNumber,
    Button,
    Row,
    Col,
    Breadcrumb,
} from "antd";
import { HomeOutlined, DoubleRightOutlined, SearchOutlined } from '@ant-design/icons';

import filter from "../../img/filter.png";
import item1 from "../../img/item1.jpg";
import item2 from "../../img/item2.jpg";
import img from "../../img/img.jpg";
import img1 from "../../img/img1.jpg";
import img2 from "../../img/img2.jpg";
import img3 from "../../img/img3.jpg";

import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getData, getSearchResult } from '../../actions/homepage';
import { estate } from "../../constants/ActionType";

import Loading from "../loading";


const SearchResult = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const searchResult = useSelector(state => state.homepage.searchResult);

    const [estateType, setEstateType] = React.useState();
    const [district, setDistrict] = React.useState();
    const [area, setArea] = React.useState();
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState("");
    const [disData, setDisData] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    // const [dataSearch, setDataSearch] = React.useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:3001/getDistricts");
                console.log("res", res);
                if (res.status == 200) {
                    const temp = await res.data.filter((item, ind) => item.type == "Quận");
                    setDisData(temp);
                    setLoading(false);
                }

            } catch (err) {
                console.log(err);
            }
        })();
    }, [])




    const chooseDistrict = (checkedValues) => {
        console.log("select checked = ", checkedValues);
        setDistrict(checkedValues);
    };

    const chooseArea = (e) => {
        console.log("radio checked", e.target.value);
        setArea(e.target.value);
    };

    const onChangeMinPrice = (value) => {
        console.log("minPrice", value);
        setMinPrice(value);
    };

    const onChangeMaxPrice = (value) => {
        console.log("maxPrice", value);
        setMaxPrice(value);
    };

    const onFilter = async () => {
        const values = {
            district: district,
            area: area,
            minPrice: minPrice,
            maxPrice: maxPrice,
        };

        console.log(values);
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3001/search", {
                district: district,
                area: area,
                minPrice: minPrice,
                maxPrice: maxPrice,
            });
            if (response.status == 200) {
                console.log("res search", response);
                await dispatch(getSearchResult(response.data.posts));
                setLoading(false);
                history.push(`/search?district=${district}&area=${area}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            }
        } catch (error) {
            console.error("err", error);
        }

    };

    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div style={{ marginBottom: '20px' }}>
                    <Breadcrumb separator={<DoubleRightOutlined style={{ fontSize: '12px' }} />}>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                            <span>Trang chủ</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <span>Tìm kiếm</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {loading && <Loading />}
                {!loading && <div className={styles.body}>
                    <div className={styles.leftCard}>
                        <div className={styles.leftTitle}>
                            <img
                                src={filter}
                                alt="filter"
                                width={24}
                                style={{ marginRight: "10px" }}
                            />
              BỘ LỌC TÌM KIẾM
            </div>
                        <div className={styles.leftSubtitle}>Khu vực</div>
                        <div>
                            <Checkbox.Group
                                onChange={chooseDistrict}
                                className={styles.checkedboxGroup}
                            >
                                {
                                    disData && disData.map((item, ind) => (
                                        <div key={ind}>
                                            <Checkbox className={styles.checkedboxStyle} value={item.districtid} >
                                                {item.name}
                                            </Checkbox>
                                        </div>
                                    ))
                                }
                            </Checkbox.Group>
                        </div>
                        <div className={styles.borderFilter}></div>
                        <div className={styles.leftSubtitle}>Diện tích</div>
                        <div className={styles.radioGroup}>
                            <Radio.Group onChange={chooseArea} value={area}>
                                <Radio className={styles.radioStyle} value={1}>
                                    {"< 20m"}
                                    <sup>2</sup>
                                </Radio>
                                <Radio className={styles.radioStyle} value={2}>
                                    20m<sup>2</sup> - 50m<sup>2</sup>
                                </Radio>
                                <Radio className={styles.radioStyle} value={3}>
                                    50m<sup>2</sup> - 100m<sup>2</sup>
                                </Radio>
                                <Radio className={styles.radioStyle} value={4}>
                                    100m<sup>2</sup> - 200m<sup>2</sup>
                                </Radio>
                                <Radio className={styles.radioStyle} value={5}>
                                    {"> 200m"}
                                    <sup>2</sup>
                                </Radio>
                            </Radio.Group>
                        </div>
                        <div className={styles.borderFilter}></div>
                        <div className={styles.leftSubtitle}>Khoảng giá</div>
                        <div className={styles.price}>
                            <InputNumber
                                size="large"
                                defaultValue={0}
                                onChange={onChangeMinPrice}
                                style={{ marginRight: "10px" }}
                            />
                            {" - "}
                            <InputNumber
                                size="large"
                                defaultValue={0}
                                onChange={onChangeMaxPrice}
                                style={{ marginLeft: "10px" }}
                            />
                        </div>
                        <div className={styles.btnApply}>
                            <Button className={styles.button} onClick={onFilter}>
                                ÁP DỤNG
              </Button>
                        </div>
                    </div>

                    <div className={styles.rightCard}>
                        <div className={styles.subGroup}>
                            <div className={styles.rightTitle}>
                                <SearchOutlined style={{ marginRight: '10px' }} />
                                KẾT QUẢ TÌM KIẾM
                                {``}
                            </div>
                            <Row gutter={[32, 32]}>
                                {!searchResult.length && <div>Không tìm thấy kết quả nào!</div>}
                                {searchResult && searchResult.map((item, idx) => (
                                    <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                        <Link to={`/phong-tro-sv/${item.data.postid}-${item.data.title}`}>
                                            <Item
                                                img={item.images[0]}
                                                type={estate[item.data.estatetype]}
                                                title={item.data.title}
                                                location={`${item.data.address} - ${item.data.ward} - ${item.data.city}`}
                                                rating={4.5}
                                                price={item.data.price}
                                                square={item.data.area}
                                                count_room={item.data.room_num}
                                            />
                                        </Link>
                                    </Col>
                                ))}
                            </Row>

                            {/* <Row gutter={[32, 32]}>
                                {mockData.slice(0, 3).map((item, idx) => (
                                    <Col xs={24} sm={24} md={8} lg={8} key={idx}>
                                        <Link to={`chung-cu/${item.id}-${item.name}`}>
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
                                ))}
                            </Row> */}
                            {/* <div className={styles.seeMore}>
                                <i>
                                    <Link to="/phong-tro-sv">Xem thêm</Link>
                                </i>
                            </div> */}
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default SearchResult;
