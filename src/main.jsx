import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App.jsx';
import './index.css';

const colorPrimary = '#03508c';
const colorWhite = '#FFFFFF';

const theme = {
    token: {
        colorPrimary,

        // Custom Colors
        colorWhite,
    },
    components: {
        Menu: {
            itemHeight: 59,
            // itemSelectedColor: colorWhite,
            // itemSelectedBg: colorPrimary,
            fontSize: 15,
        },
    },
};


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
    </React.StrictMode>,
);
