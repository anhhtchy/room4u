import React from 'react';
import CarouselTop from './components/CarouselTop';
import styles from './Home.module.css';
import { Input } from 'antd';

const Home = () => {
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.search}>
                    <Input.Search
                        placeholder="Tìm kiếm phòng bạn muốn..."
                        allowClear
                        // onSearch={onSearch}
                        className={styles.inputSearch}
                        size="large"
                    />
                </div>
                <CarouselTop />
                <div>
                    
                </div>
            </div>
        </div>
    )
};

export default Home;