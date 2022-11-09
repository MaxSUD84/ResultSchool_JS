import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue, styles }) => {
    // const optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.keys(options).map((optionName) => ({
    //               value: options[optionName]._id,
    //               label: options[optionName].name
    //           }))
    //         : options;
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={styles}
                // onChange={onChange}
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.defaultProps = {
    styles: {}
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    styles: PropTypes.object,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
