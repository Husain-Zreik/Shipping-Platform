import React from 'react'
import './style.css'
import { NavLink, useNavigate } from 'react-router-dom';

function SideMenu() {
    const navigation = useNavigate();


    const handleLogout = () => {
        localStorage.clear();
        navigation("/");
    }

    const navActive = ({ isActive }) => {
        return {
            color: isActive ? "#f43f5e" : null,
        };
    };

    return (
        <div id="side-menu">

            <div className="insta-title">
                <div className="menu-titles">
                    <i className="fa-solid fa-utensils"></i>
                </div>
                <h4>Foody</h4>
            </div>

            <div className="menu-section">

                <NavLink style={navActive} end to="/user" >
                    <div className="menu-pages">
                        <div className="menu-titles">
                            <i className="fa-solid fa-house menu-icons "></i>
                        </div>
                        <h4>Home</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/calendar" >
                    <div className="menu-pages" >
                        <div className="menu-titles">
                        <i className="fa-regular fa-calendar menu-icons"></i>
                        </div>
                        <h4>Calender</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/favourites" >
                    <div className="menu-pages">
                        <div className="menu-titles">
                        <i className="fa-regular fa-heart menu-icons"></i>
                        </div>
                        <h4>Favoutites</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/create" >
                    <div className="menu-pages" >
                        <div className="menu-titles">
                        <i className="fa-regular fa-square-plus menu-icons"></i>
                        </div>
                        <h4>Create</h4>
                    </div>
                </NavLink>

            </div>

                <div className="menu-pages" onClick={handleLogout}>
                    <div className="menu-titles">
                    <i className="fa-solid fa-right-from-bracket menu-icons"></i>
                    </div>
                    <h4>Logout</h4>
                </div>
        </div>
    )
}

export default SideMenu