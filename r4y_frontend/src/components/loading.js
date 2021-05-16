import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <div style={{ textAlign: 'center', height: '100vh' }}>
            <Spin size="large" />
        </div>
    )
}

export default Loading;