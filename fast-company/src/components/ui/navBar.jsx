import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    // console.log(currentUser);
    return (
        <nav className="navbar bg-warning mb-3">
            <div className="container-fluid">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Main
                        </Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
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
