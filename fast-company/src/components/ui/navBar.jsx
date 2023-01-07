import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";

// import { useAuth } from "../../hooks/useAuth";
import { getIsLoggedIn } from "../../store/users";

const NavBar = () => {
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());
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
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
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
