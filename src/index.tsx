import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Home from './Home'
import { BrowserView, MobileView } from 'react-device-detect';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserView>
            <Home />
        </BrowserView>
        <MobileView>
            <h1>Please use desktop, working on mobile</h1>
        </MobileView>
    </React.StrictMode>
)

