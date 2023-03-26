/* eslint-disable multiline-ternary */

import styles from "./common.module.scss";

import PropTypes from "prop-types";

const TextArea = ({
  label,
  rows,
  cols,
  maxlength,
  disabled,
  placeholder,
  required,
  name,
  value,
  onChange,
  error,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label className={styles.textfield}>
        <span className={styles.field__label} htmlFor={name}>
          {" "}
          {label}
        </span>
        <div className={styles.textfield__container}>
          <textarea
            className={`
              ${styles.textfield__container__input}
              `}
            rows={rows}
            cols={cols}
            maxLength={maxlength}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            autoComplete={"off"}
          />
        </div>
        {error && <div className={styles.alert}>{error}</div>}
      </label>
    </div>
  );
};
TextArea.defaultProps = {
  type: "textarea",
  rows: 4,
  cols: 50,
  maxlength: 255,
  disabled: false,
  required: false,
  placeholder: "Текст ...",
};
TextArea.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  maxlength: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextArea;
