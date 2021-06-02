import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './Admin.module.css';

import { Input, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/charts';

import logo from '../../img/logo.png';
import axios from 'axios';
import Loading from '../loading';

const data = [
    {
        "Date": "2010-01",
        "scales": 1998
    },
    {
        "Date": "2010-02",
        "scales": 1850
    },
    {
        "Date": "2010-03",
        "scales": 1720
    },
    {
        "Date": "2010-04",
        "scales": 1818
    },
    {
        "Date": "2010-05",
        "scales": 1920
    },
    {
        "Date": "2010-06",
        "scales": 1802
    },
    {
        "Date": "2010-07",
        "scales": 1945
    },
    {
        "Date": "2010-08",
        "scales": 1856
    },
    {
        "Date": "2010-09",
        "scales": 2107
    },
    {
        "Date": "2010-10",
        "scales": 2140
    },
    {
        "Date": "2010-11",
        "scales": 2311
    },
    {
        "Date": "2010-12",
        "scales": 1972
    },
    {
        "Date": "2011-01",
        "scales": 1760
    },
    {
        "Date": "2011-02",
        "scales": 1824
    },
    {
        "Date": "2011-03",
        "scales": 1801
    },
    {
        "Date": "2011-04",
        "scales": 2001
    },
    {
        "Date": "2011-05",
        "scales": 1640
    },
    {
        "Date": "2011-06",
        "scales": 1502
    },
    {
        "Date": "2011-07",
        "scales": 1621
    },
    {
        "Date": "2011-08",
        "scales": 1480
    },
    {
        "Date": "2011-09",
        "scales": 1549
    },
    {
        "Date": "2011-10",
        "scales": 1390
    },
    {
        "Date": "2011-11",
        "scales": 1325
    },
    {
        "Date": "2011-12",
        "scales": 1250
    },
    {
        "Date": "2012-01",
        "scales": 1394
    },
    {
        "Date": "2012-02",
        "scales": 1406
    },
    {
        "Date": "2012-03",
        "scales": 1578
    },
    {
        "Date": "2012-04",
        "scales": 1465
    },
    {
        "Date": "2012-05",
        "scales": 1689
    },
    {
        "Date": "2012-06",
        "scales": 1755
    },
    {
        "Date": "2012-07",
        "scales": 1495
    },
    {
        "Date": "2012-08",
        "scales": 1508
    },
    {
        "Date": "2012-09",
        "scales": 1433
    },
    {
        "Date": "2012-10",
        "scales": 1344
    },
    {
        "Date": "2012-11",
        "scales": 1201
    },
    {
        "Date": "2012-12",
        "scales": 1065
    },
    {
        "Date": "2013-01",
        "scales": 1255
    },
    {
        "Date": "2013-02",
        "scales": 1429
    },
    {
        "Date": "2013-03",
        "scales": 1398
    },
    {
        "Date": "2013-04",
        "scales": 1678
    },
    {
        "Date": "2013-05",
        "scales": 1524
    },
    {
        "Date": "2013-06",
        "scales": 1688
    },
    {
        "Date": "2013-07",
        "scales": 1500
    },
    {
        "Date": "2013-08",
        "scales": 1670
    },
    {
        "Date": "2013-09",
        "scales": 1734
    },
    {
        "Date": "2013-10",
        "scales": 1699
    },
    {
        "Date": "2013-11",
        "scales": 1508
    },
    {
        "Date": "2013-12",
        "scales": 1680
    },
    {
        "Date": "2014-01",
        "scales": 1750
    },
    {
        "Date": "2014-02",
        "scales": 1602
    },
    {
        "Date": "2014-03",
        "scales": 1834
    },
    {
        "Date": "2014-04",
        "scales": 1722
    },
    {
        "Date": "2014-05",
        "scales": 1430
    },
    {
        "Date": "2014-06",
        "scales": 1280
    },
    {
        "Date": "2014-07",
        "scales": 1367
    },
    {
        "Date": "2014-08",
        "scales": 1155
    },
    {
        "Date": "2014-09",
        "scales": 1289
    },
    {
        "Date": "2014-10",
        "scales": 1104
    },
    {
        "Date": "2014-11",
        "scales": 1246
    },
    {
        "Date": "2014-12",
        "scales": 1098
    },
    {
        "Date": "2015-01",
        "scales": 1189
    },
    {
        "Date": "2015-02",
        "scales": 1276
    },
    {
        "Date": "2015-03",
        "scales": 1033
    },
    {
        "Date": "2015-04",
        "scales": 956
    },
    {
        "Date": "2015-05",
        "scales": 845
    },
    {
        "Date": "2015-06",
        "scales": 1089
    },
    {
        "Date": "2015-07",
        "scales": 944
    },
    {
        "Date": "2015-08",
        "scales": 1043
    },
    {
        "Date": "2015-09",
        "scales": 893
    },
    {
        "Date": "2015-10",
        "scales": 840
    },
    {
        "Date": "2015-11",
        "scales": 934
    },
    {
        "Date": "2015-12",
        "scales": 810
    },
    {
        "Date": "2016-01",
        "scales": 782
    },
    {
        "Date": "2016-02",
        "scales": 1089
    },
    {
        "Date": "2016-03",
        "scales": 745
    },
    {
        "Date": "2016-04",
        "scales": 680
    },
    {
        "Date": "2016-05",
        "scales": 802
    },
    {
        "Date": "2016-06",
        "scales": 697
    },
    {
        "Date": "2016-07",
        "scales": 583
    },
    {
        "Date": "2016-08",
        "scales": 456
    },
    {
        "Date": "2016-09",
        "scales": 524
    },
    {
        "Date": "2016-10",
        "scales": 398
    },
    {
        "Date": "2016-11",
        "scales": 278
    },
    {
        "Date": "2016-12",
        "scales": 195
    },
    {
        "Date": "2017-01",
        "scales": 145
    },
    {
        "Date": "2017-02",
        "scales": 207
    }
]

const Admin = () => {
    const [statistic, setStatistic] = useState();
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [userData, setUserData] = useState();

    useEffect(async () => {
        setLoading(true);
        getStatistic();
        getChartData();
        getUserData();
    }, []);

    const config = {
        data: chartData,
        xField: 'Date',
        yField: 'scales',
        xAxis: { tickCount: 6 },
        height: 300,
        line: {
            color: "#faad14",
        },
        areaStyle: function areaStyle() {
            return {
                fill: 'l(270) 0:#ffffff 1:#faad14',
            };
        },
    };

    const columns = [
        {
            title: 'UserID',
            dataIndex: 'userid',
            key: 'userid',
            align: 'center',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số bài đăng',
            dataIndex: 'nPosts',
            key: 'nPosts',
            align: 'center',
        },
    ];


    const getStatistic = async () => {
        try {
            const res = await axios.get("http://localhost:3001/adminStatistic");
            if (res.status == 200) {
                setStatistic(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getChartData = async () => {
        try {
            const res = await axios.get("http://localhost:3001/postStatistic");
            if (res.status == 200) {
                console.log("statistic", res);
                setChartData(res.data.data.reverse());
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getUserData = async () => {
        const res1 = await axios.get("http://localhost:3001/usertype?type=0");
        const res2 = await axios.get("http://localhost:3001/usertype?type=1");

        Promise.all([res1, res2]).then((values) => {
            console.log("pro all", values);
            setUserData(values);
            setLoading(false);
        });
    }


    return (
        <div className={styles.container}>
            {loading ? <Loading />
                : <div className={styles.admin}>
                    <div className={styles.pageHeader}>
                        <div className={styles.title}>Trang Admin</div>
                        <div className={styles.search}>
                            <Input
                                className={styles.input}
                                placeholder="Tìm kiếm theo username..."
                            />
                            <Button className={styles.button}>
                                <SearchOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className={styles.top}>
                        <div className={styles.topLeft}>
                            <div className={styles.topTitle}>
                                <img src={logo} alt="logo-r4u" width={32} />
                                <div style={{ marginLeft: '10px' }}>ROOM FOR YOU</div>
                            </div>
                            <div className={styles.total}>
                                <div className={styles.row}>
                                    <div className={styles.oneCard}>
                                        <div className={styles.cardTitle}>Tổng số người dùng</div>
                                        <div className={styles.cardValue}>{statistic.nUsers}</div>
                                    </div>
                                    <div className={styles.oneCard}>
                                        <div className={styles.cardTitle}>Tổng số chủ nhà</div>
                                        <div className={styles.cardValue}>{statistic.nOwners}</div>
                                    </div>
                                </div>
                                <br />
                                <div className={styles.row}>
                                    <div className={styles.oneCard}>
                                        <div className={styles.cardTitle}>Tổng số bài đã đăng</div>
                                        <div className={styles.cardValue}>{statistic.nPosts}</div>
                                    </div>
                                    <div className={styles.oneCard}>
                                        <div className={styles.cardTitle}>Số bài đăng mới trong ngày</div>
                                        <div className={styles.cardValue}>{statistic.nPostsToday}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.topRight}>
                            <div className={styles.topRightTitle}>
                                Biểu đồ số lượng bài viết mới trong 30 ngày gần đây
                        </div>
                            <div>
                                <Area {...config} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.left}>
                            <div className={styles.tableTitle}>
                                <div>Danh sách chủ nhà</div>
                                <Link to="/admin/list-user/0">
                                    <Button className={styles.button1}>Xem thêm</Button>
                                </Link>
                            </div>
                            <br />
                            {console.log("userData", userData)}
                            <div>
                                <Table dataSource={userData[0].data.users.slice(0, 10)} columns={columns} pagination={false} />
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.tableTitle}>
                                <div>Danh sách người dùng</div>
                                <Link to="/admin/list-user/1">
                                    <Button className={styles.button1}>Xem thêm</Button>
                                </Link>
                            </div>
                            <br />
                            <div>
                                <Table dataSource={userData[1].data.users.slice(0, 10)} columns={columns} pagination={false} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin;