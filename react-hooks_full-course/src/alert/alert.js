/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useAlert } from './alertContext';

function Alert() {
  const alert = useAlert();
  // if (!alert) return null;
  if (!alert.visible) return null;

  return (
    <div className="alert alert-danger" onClick={alert.toggle}>
      Это очень и очень важное сообщение
    </div>
  );
}

export default Alert;
