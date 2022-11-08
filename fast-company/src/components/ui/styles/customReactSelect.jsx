import React, { useState } from "react"; // , { type ElementConfig }
import Select, { components } from "react-select";
import { colourOptions } from "./data";
import PropTypes from "prop-types";

// https://blog.logrocket.com/getting-started-with-react-select/
// npm install --save @emotion/react

const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>{children}</components.SingleValue>
);
SingleValue.propTypes = {
    children: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.node), PropTypes.node)
};

const CustomReactSelect = () => {
    const [state, setState] = useState({ selectedOption: null });
    const handleChange = (selectedOption) => {
        setState({ selectedOption });
    };
    return (
        <Select
            className="mt-4 col-md-6 col-offset-4"
            onChange={handleChange}
            styles={{
                singleValue: (base) => ({
                    ...base,
                    padding: 5,
                    borderRadius: 5,
                    background: this.state.selectedOption.value,
                    color: "white",
                    display: "flex"
                })
            }}
            components={{ SingleValue }}
            options={colourOptions}
        />
    );
};
export default CustomReactSelect;
