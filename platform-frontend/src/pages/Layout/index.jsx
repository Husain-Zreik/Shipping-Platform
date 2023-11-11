import React from "react";
import { Outlet} from "react-router-dom";
import SideMenu from "../../componenets/SideMenu";
import "./style.css";

function Layout() {

    return (
        <div className="layout">
            <SideMenu />

            <div className="outlet">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout
