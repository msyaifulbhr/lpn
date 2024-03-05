import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () =>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/admin/login");
    };

    return (
        <div>
            <nav className="navbar is-fixed-top has-background-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink to="/admin/dashboard" className="navbar-item">
                <img 
                    src={logo}
                    width="160"
                    height="80"
                    alt="logo"
                />
                </NavLink>
            
                {/* <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span> has-shadow
                <span aria-hidden="true"></span>
                </a> */}
            </div>
            
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                    <button onClick={logout} className="button is-light">
                        Log out
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </nav>
        </div>
    );
};

export default Navbar;