import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => { 
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <Link className="nav-link" to="/">Main</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
            </li>
        </ul>
    );    
};

export default NavBar;

/*
    <nav className="navbar" style="background-color: #e3f2fd;">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01"> 
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Main</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/users">Users</Link>
                </div>
            </div>
        </div>
    </nav>
*/