import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Home from './Home'
import { Peice } from './games/chess/Board';

declare global {
    interface Event { detail: any; }
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

window.onload= () => {
    root.render(
        <React.StrictMode>
            <Home />
        </React.StrictMode>
    );
}


