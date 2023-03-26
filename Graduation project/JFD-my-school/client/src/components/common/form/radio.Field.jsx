// import React from "react";
import PropTypes from "prop-types";
import styles from "./common.module.scss";

const RadioField = ({ options, name, onChange, value, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <fieldset className="block">
        <legend className={styles.field__label}>{label}</legend>
        <div className="mt-2">
          {options.map((option) => (
            <label
              key={option.name + "_" + option.value}
              className={styles.radio__container}
            >
              <input
                className={styles.radio__input}
                type="radio"
                name={name}
                id={option.name + "_" + option.value}
                checked={option.value === value}
                value={option.value}
                onChange={handleChange}
              />
              <label
                className="ml-2"
                htmlFor={option.name + "_" + option.value}
              >
                {option.name}
              </label>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioField;
