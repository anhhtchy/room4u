import React from 'react';
import { Rate } from 'antd';
import img1 from '../../../img/item1.jpg';
import styles from '../Home.module.css';

const Item = (props) => {
    const sq = "2";
    return (
        <div className={styles.item}>
            <div className={styles.imgItem} style={{ backgroundImage: `url(${props.img})` }}></div>
            <div className={styles.itemContent}>
                <div className={styles.itemType}>{props.type}</div>
                <div className={styles.itemTitle}>{props.title}{", "}{props.location}</div>
                <div className={styles.itemRating}>
                    <Rate
                        allowHalf
                        disabled
                        defaultValue={props.rating}
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