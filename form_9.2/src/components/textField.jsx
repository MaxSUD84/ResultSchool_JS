import React from "react";
import PropTypes from "prop-types";
// import { useState } from "react";


const TextField = ({ nameClass, label, type, name, value, onChange, error }) => {

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    // const getInputClasses = () => {
    //     return "form-control" + (error ? " is-invalid" : "");
    // };

    return (
        <div className="block">
            <label htmlFor={name} className="text-gray-700">{label}</label>
                {/* <span className="text-gray-700"></span> */}
                <input
                    className={nameClass}
                    type={type}
                    id={name}
                    name={name}
                    value={value || ""}
                    onChange={handleChange}
                    placeholder={
                        type === "number" 
                            ? "1980" 
                            : type === "url" 
                                ? "http://example.com" 
                                : ""
                    }
                />
                {error && <div className="text-red-700 text-s">{error}</div>}
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    type: PropTypes.string
};

export default TextField;
