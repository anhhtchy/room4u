import React from 'react';
import { Rate } from 'antd';
import styles from '../Home.module.css';

class Item extends React.Component {
    render() {
        return (
            <div className={styles.item}>
                <div className={styles.imgItem}></div>
                <div className={styles.itemContent}>
                    <div className={styles.itemType}>TRUNG CƯ MINI</div>
                    <div className={styles.itemTitle}>Số 80, ngõ 317 Tây Sơn, Ngã Tư Sở, Đống Đa, Hà Nội</div>
                    <div className={styles.itemRating}>
                        <Rate
                            allowHalf
                            disabled
                            defaultValue={4.5}
                        />
                    </div>
                    <div className={styles.itemPrice}>5,000,000đ/tháng</div>
                    <div className={styles.square}>40m2 - 2 phòng</div>
                </div>
            </div>
        )
    }
}

export default Item;