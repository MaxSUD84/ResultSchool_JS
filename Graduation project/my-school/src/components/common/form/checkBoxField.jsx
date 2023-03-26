// import React from "react";
import PropTypes from "prop-types";
import styles from "./common.module.scss";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className={styles.checkbox}
          value=""
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <span className="ml-2" htmlFor={name}>
          {children}
        </span>
      </label>
      {error && <div className={styles.alert}>{error}</div>}
    </div>
  );
};
CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  error: PropTypes.string,
};

export default CheckBoxField;
