import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import styles from '../Admin.module.css';

import { Input, Button, Table, Radio, message, Breadcrumb } from 'antd';
import { SearchOutlined, HomeOutlined, DoubleRightOutlined } from '@ant-design/icons';
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
    const [idDelete, setIdDelete] = useState();

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
                <Button className={styles.button1} onClick={() => handleDelete(id)}>Xóa</Button>
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

    const handleDelete = async (id) => {
        setVisible(true);
        setIdDelete(id);
    }

    const deleteUser = async () => {
        try {
            const res = await axios.delete(`http://localhost:3001/deleteProfile/${idDelete}`);
            if (res.status == 200) {
                console.log("deleta", res);
                message.success("Đã xóa!");
                setVisible(false);
                getUserData();
            }

        } catch (err) {
            console.log(err);
        }
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
            const res = await axios.post(`http://localhost:3001/searchUser`, {
                query: keySearch,
            });
            if (res.status == 200) {
                console.log("search res", res);
                setUserData(res.data);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            // if (err.response.data.status == 0) {
            //     setUserData([]);
            // }
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
                    <div style={{ marginBottom: '20px' }}>
                        <Breadcrumb separator={<DoubleRightOutlined style={{ fontSize: '12px' }} />}>
                            <Breadcrumb.Item href="/admin">
                                <HomeOutlined />
                                <span>Trang Admin</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <span>Danh sách</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={styles.pageTitle}>
                            {param.id == 1 ? "Danh sách người dùng" : "Danh sách chủ nhà"}
                            <span style={{ fontSize: '20px', color: '#52c41a' }}> ({userData.length} users)</span>
                        </div>
                        <div style={{ fontWeight: '600' }}>
                            <Radio.Group onChange={(e) => handleChangeType(e)} value={valueType} >
                                <Radio value={0}>Chủ nhà</Radio>
                                <Radio value={1}>Người dùng</Radio>
                            </Radio.Group>
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
                        <Table
                            rowKey={record => record.uid}
                            dataSource={userData}
                            columns={columns}
                            pagination={false}
                            onRow={(record, index) => {
                                return {
                                    onClick: e => history.push(`/admin/user-detail/${record.userid}`),
                                }
                            }}
                        />
                        <Modal
                            centered={window.innerWidth > 600}
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            onOk={deleteUser}
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