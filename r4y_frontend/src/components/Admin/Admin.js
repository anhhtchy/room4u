import React from 'react';
import styles from './Admin.module.css';
import { Input } from 'antd';

const Admin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.admin}>
                <div className={styles.pageHeader}>
                    <div className={styles.title}>ADMIN PAGE</div>
                    <div className={styles.search}>
                        <Input.Search placeholder="Search by username ...">
                        
                        </Input.Search>
                    </div>
                </div>
                <div className={styles.top}>
                    Top
                </div>
                <div className={styles.body}>
                    <div className={styles.left}>left</div>
                    <div className={styles.right}>Right</div>
                </div>
            </div>
        </div>
    )
}

export default Admin;