import React from 'react';

import Slider from "react-slick";

import styles from './cpn.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style.css';

import banner1 from '../../../img/banner1.jpg';
import banner2 from '../../../img/banner2.jpg';

class CarouselTop extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className={styles.carousel}>
                <div>
                    <Slider {...settings}>
                        <div className={styles.banner}>
                            <img src={banner1} alt="banner1" width="100%"/>
                        </div>
                        <div>
                            <img src={banner2} alt="banner2" width="100%"/>
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }
};

export default CarouselTop;