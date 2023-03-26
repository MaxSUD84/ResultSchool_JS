/* eslint-disable multiline-ternary */
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./common.module.scss";

import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label className={styles.textfield}>
        <span className={styles.field__label} htmlFor={name}>
          {" "}
          {label}
        </span>
        <div className={styles.textfield__container}>
          <input
            className={`
              ${styles.textfield__container__input}
              `}
            // ${error ? "border-red-500" : ""}
            // ${type === "password" ? "rounded-l-md" : "rounded-md"}
            placeholder=""
            type={showPassword ? "text" : type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
          />
          {type === "password" && (
            <button
              className={styles.textfield__container__showhidebutton}
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FiEyeOff className="w-full h-full" />
              ) : (
                <FiEye className="w-full h-full" />
              )}
            </button>
          )}
        </div>
        {error && <div className={styles.alert}>{error}</div>}
      </label>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
