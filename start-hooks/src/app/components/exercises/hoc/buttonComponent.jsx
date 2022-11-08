import React from "react";
import PropTypes from "prop-types";

const ButtonComponent = ({ isAuth, label, onClick }) => {
    return (
        <>
            <button 
                className={"btn mx-1 btn-" + (isAuth ? "secondary" : "primary")}
                onClick={onClick}
            >
                {label}
            </button>
        </>
    );
};

ButtonComponent.propTypes = {
    isAuth: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default ButtonComponent