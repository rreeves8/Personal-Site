import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserView>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </BrowserView>
        <MobileView>
            <div>No mobile version use laptop</div>
        </MobileView>
    </React.StrictMode>
);
