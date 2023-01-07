import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { useAuth } from "../../hooks/useAuth";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    // const { currentUser } = useAuth();
    const currentUser = useSelector(getCurrentUserData());

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    if (!currentUser) return "Loading ...";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    height="40px"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profiler
                </Link>
                <Link to={`/Logout`} className="dropdown-item">
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
