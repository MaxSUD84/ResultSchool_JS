import React from 'react';
import { useAlert } from './alert/alertContext';
// import { useAlertToggle } from './alert/alertContext';
// import PropTypes from 'prop-types';

function Main() {
  const { toggle } = useAlert();
  return (
    <>
      <h1>Привет в примере с Context</h1>
      <button
        onClick={() => {
          toggle();
        }}
        type="button"
        className="btn btn-success"
      >
        Показать alert
      </button>
    </>
  );
}
Main.propTypes = {
  // toggle: PropTypes.func.isRequired
};

export default Main;
