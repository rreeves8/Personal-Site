import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Home from './Home'
import paragraphs from './Paragraphs.json'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserView>
            <Home />
        </BrowserView>
        <MobileView>
            <div>No mobile version use laptop</div>
        </MobileView>
    </React.StrictMode>
);

