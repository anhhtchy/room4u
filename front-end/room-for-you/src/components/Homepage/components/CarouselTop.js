import React from 'react';

import { Carousel } from 'antd';

import styles from '../Home.module.css';

const CarouselTop = () => {
    return (
        <div className={styles.carousel}>
            <Carousel>
                <div>
                    <h3 >~~~~~~</h3>
                </div>
                <div>
                    <h3 >2</h3>
                </div>
                <div>
                    <h3 >3</h3>
                </div>
                <div>
                    <h3 >4</h3>
                </div>
            </Carousel>
        </div>
    )
};

export default CarouselTop;