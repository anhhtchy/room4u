import React from 'react';
import { Rate, Button } from 'antd';
import img1 from '../../../img/item1.jpg';
import styles from '../Home.module.css';

const Item = (props) => {
    const sq = "2";
    return (
        <div className={styles.item}>
            <div className={styles.imgItem} style={{ backgroundImage: `url(${props.img})` }}></div>
            <div className={styles.itemContent}>
                <div className={styles.itemType}>{props.type}</div>
                <div className={styles.itemTitle}>{props.title.slice(0,50)}...</div>
                <div className={styles.addressPost}>{props.location.slice(0,40)}...</div>
                <div className={styles.itemRating}>
                    <Rate
                        allowHalf
                        disabled
                        defaultValue={props.rating}
                        style={{
                            fontSize: '14px',
                            color: '#faad14',
                        }}
                    />
                </div>
                <div className={styles.itemPrice}>{new Intl.NumberFormat().format(props.price)}{" đ/tháng"}</div>
                <div className={styles.square}>{props.square}m<sup>2</sup>{" - "}{props.count_room}{" phòng"}</div>
                <br />
                <Button className={styles.button}>Xem chi tiết</Button>
            </div>
        </div>
    )
}

export default Item;