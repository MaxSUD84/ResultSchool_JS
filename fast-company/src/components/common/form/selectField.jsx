import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };
    // const optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.keys(options).map((optionName) => ({
    //               name: options[optionName].name,
    //               value: options[optionName]._id
    //           }))
    //         : options;
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                value={value}
                // required
                name={name}
                onChange={handleChange}
            >
                {/* <option selected={value === ""} value="" disabled> */}
                <option value="" disabled>
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option
                            // selected={profession._id === data.profession}
                            value={option.value}
                            key={option.value + "_" + option.name}
                        >
                            {/* {option.name} */}
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.defaultProps = {
    name: "select-field"
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    defaultOption: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    error: PropTypes.string
};
export default SelectField;
