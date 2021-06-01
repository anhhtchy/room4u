import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import styles from '../Admin.module.css';

import { Input, Button, Table, Radio, message, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Loading from '../../loading';
import { useHistory, useParams } from 'react-router';
import Modal from 'antd/lib/modal/Modal';

const ListUser = () => {
    const param = useParams();
    const history = useHistory();

    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [keySearch, setKeySearch] = useState();
    const [valueType, setValueType] = useState(param.id);

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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số bài đăng',
            dataIndex: 'nPosts',
            key: 'nPosts',
            align: 'center',
        },
        {
            title: "Ngày tham gia",
            dataIndex: 'created',
            key: 'created',
            align: 'center',
            render: (date) => (
                <span>{moment(date).format('L')}</span>
            )
        },
        {
            title: 'Xóa',
            dataIndex: 'userid',
            key: 'delete',
            align: 'center',
            render: (id) => (
                <Button className={styles.button1} onClick={handleDelete}>Xóa</Button>
            )
        }
    ];

    useEffect(async () => {
        setLoading(true);
        getUserData();
    }, [param]);

    const getUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/usertype?type=${param.id}`);
            if (res.status == 200) {
                setUserData(res.data.users);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async () => {
        setVisible(true);
    }

    const handleSearch = async () => {
        // const key = e.target.defaultValue;
        console.log(keySearch);
        setLoading(true);
        // await getUserData();
        // const data = await userData.filter((item, id) => item.username == keySearch);
        // console.log(data);
        // setUserData(data);
        // setLoading(false);
        try {
            const res = await axios.get(`http://localhost:3001/username/${keySearch}`);
            if (res.status == 200) {
                console.log("search res", res);
                setUserData([res.data.user]);
                setLoading(false);
            }
        } catch (err) {
            console.log(err.response.data.message);
            if (err.response.data.status == 0) {
                setUserData([]);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleChangeType = async (e) => {
        setValueType(e.target.value);
        history.push(`/admin/list-user/${e.target.value}`)
    }

    return (
        <div className={styles.container}>
            {loading ? <Loading />
                : <div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.pageTitle}>
                            {param.id == 1 ? "Danh sách người dùng" : "Danh sách chủ nhà"}
                            <span style={{ fontSize: '20px', color: '#52c41a' }}> ({userData.length} users)</span>
                            <div>
                                <Radio.Group onChange={(e) => handleChangeType(e)} value={valueType} >
                                    <Radio value={0}>Chủ nhà</Radio>
                                    <Radio value={1}>Người dùng</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className={styles.search}>
                            <Input
                                className={styles.input}
                                placeholder="Tìm kiếm theo username..."
                                onChange={(e) => setKeySearch(e.target.value)}
                                onPressEnter={handleSearch}
                            />
                            <Button className={styles.button} onClick={handleSearch}>
                                <SearchOutlined />
                            </Button>
                        </div>
                    </div>
                    <br />
                    <div>
                        <Table dataSource={userData} columns={columns} pagination={false} />
                        <Modal
                            centered={window.innerWidth > 600}
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            onOk={() => setVisible(false)}
                            okText="Xóa"
                            cancelText="Hủy"
                            width={400}
                        >Xác nhận xóa người dùng?
                     </Modal>
                    </div>
                    <br />
                    <br />
                </div>
            }
        </div>
    )
}

export default ListUser;