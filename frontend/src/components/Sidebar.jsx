import React from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";


const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {admin} = useSelector((state) => state.auth);

    const logout = () =>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/admin/login");
    };

return (
    <div className="">
    <div className="py-4">
    <aside className="menu has-shadow ">
    <p className="menu-label pl-3 text-light">
        General
    </p>
        <ul className="menu-list pl-2">
            <li >
                <NavLink to={"/admin/dashboard"}className="text-light"><IoHome/>Dashboard</NavLink>
            </li>
            <li >
                <NavLink to={"/admin/heros"}className="text-light"><IoHome/>Hero</NavLink>
            </li>
            <li>
                <NavLink to={"/admin/news"}className="text-light"><IoPricetag/>News</NavLink>
            </li>
            <li>
                <NavLink to={"/admin/abouts"}className="text-light"><IoPricetag/>About</NavLink>
            </li>
            <li>
                <NavLink to={"/admin/services"}className="text-light"><IoPricetag/>Service</NavLink>
            </li>
        </ul>
        {admin && admin.role === "admin" && (
            <div>
                <p className="menu-label pl-3 text-light">Admin</p>
                <ul className="menu-list pl-2">
                <li>
                <NavLink to={"/admin/admins"}className="text-light"><IoPerson/>Admin</NavLink>
                </li>
                </ul>
            </div>
        )}
    
    <p className="menu-label pl-3 text-light">
    Settings
    </p>
        <ul className="menu-list pl-2">
            <li>
                <button onClick={logout} className="button is-white "><IoLogOut/>Logout</button>
            </li>
        </ul>
    </aside>
    </div>
    </div>
);
};

export default Sidebar;